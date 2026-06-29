# -*- coding: utf-8 -*-
import re
import sys
import io
import time
import requests
import openpyxl
import csv
import json
from concurrent.futures import ThreadPoolExecutor
from flask import Flask, request as flask_request, jsonify
from flask_cors import CORS

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

app = Flask(__name__)
CORS(app)

# ==========================================================
#  CONFIG
# ==========================================================
NOCPU_BASE_URL   = "https://nocpu-behind.info"
NOCPU_USERNAME   = "Trust.p"
NOCPU_PASSWORD   = "trustp9168"
# ==========================================================

# ==========================================================
#  nocpu-behind.info -- Session Manager & Cache
# ==========================================================

NOCPU_CACHE = []
NOCPU_CACHE_TIME = 0
CACHE_TTL = 3600
IMAGE_CACHE = {}  # SKU -> Image URL

class NocpuSession:
    def __init__(self):
        self.session = requests.Session()
        self.logged_in = False
        self.csrf_token = ""
        self.group_id = ""
        self.session.headers.update({
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
            "Accept": "application/json, text/html, */*",
        })

    def login(self) -> bool:
        try:
            print(f"[NOCPU] Logging in as '{NOCPU_USERNAME}'...")
            import urllib.parse
            
            self.session.get(f"{NOCPU_BASE_URL}/")
            xsrf = urllib.parse.unquote(self.session.cookies.get("XSRF-TOKEN", ""))
            
            resp = self.session.post(
                f"{NOCPU_BASE_URL}/checkSignin",
                data={"username": NOCPU_USERNAME, "password": NOCPU_PASSWORD},
                headers={"X-Requested-With": "XMLHttpRequest", "X-XSRF-TOKEN": xsrf},
                timeout=10,
            )
            body = resp.json()
            if body.get("res_code") == "00":
                r_home = self.session.get(f"{NOCPU_BASE_URL}/product/index")
                csrf_match = re.search(r'meta name="csrf-token" content="([^"]+)"', r_home.text)
                self.csrf_token = csrf_match.group(1) if csrf_match else ""
                group_match = re.search(r'var\s+group_id\s*=\s*["\']?(\d+)', r_home.text)
                self.group_id = group_match.group(1) if group_match else ""
                self.logged_in = True
                print("[NOCPU] Login successful!")
                return True
            else:
                print(f"[NOCPU] Login failed -- {body.get('res_text', '')}")
                return False
        except Exception as e:
            print(f"[NOCPU] Login exception: {e}")
            return False

    def load_excel_cache(self):
        if not self.logged_in:
            if not self.login(): return []
            
        print("[NOCPU] Downloading Excel export for fast searching...")
        url = f"{NOCPU_BASE_URL}/product/exportProduct?product_active_status=show"
        resp = self.session.get(url, timeout=30)
        
        if "application/vnd" not in resp.headers.get("Content-Type", "") and "excel" not in resp.headers.get("Content-Type", ""):
            print("[NOCPU] Session expired during Excel download, relogging...")
            self.logged_in = False
            if self.login():
                resp = self.session.get(url, timeout=30)
                
        if resp.status_code != 200:
            return []
            
        print("[NOCPU] Parsing Excel...")
        results = []
        try:
            wb = openpyxl.load_workbook(filename=io.BytesIO(resp.content), data_only=True)
            ws = wb.active
            for idx, row in enumerate(ws.iter_rows(values_only=True)):
                if idx == 0: continue
                sku = str(row[1]) if row[1] else ""
                name = str(row[3]) if row[3] else ""
                sell_price = float(row[4]) if row[4] else 0.0
                special_price = float(row[5]) if row[5] else 0.0
                final_price = special_price if special_price > 0 else sell_price
                
                if name:
                    search_str = f"{sku} {name}".lower()
                    results.append({
                        "sku": sku,
                        "name": name.strip(),
                        "price": final_price,
                        "search_str": search_str
                    })
            print(f"[NOCPU] Cached {len(results)} items in memory.")
            return results
        except Exception as e:
            print(f"[NOCPU] Failed to parse Excel: {e}")
            return []

    def fetch_image_for_sku(self, sku):
        if not sku or sku in IMAGE_CACHE:
            return IMAGE_CACHE.get(sku, "")
            
        if not self.logged_in:
            if not self.login(): return ""
            
        import urllib.parse
        
        def get_headers():
            xsrf = urllib.parse.unquote(self.session.cookies.get("XSRF-TOKEN", ""))
            return {
                "X-XSRF-TOKEN": xsrf,
                "X-CSRF-TOKEN": self.csrf_token,
                "USER-GROUP": self.group_id,
                "Referer": f"{NOCPU_BASE_URL}/product/index",
                "X-Requested-With": "XMLHttpRequest"
            }
            
        try:
            r = self.session.post(
                f"{NOCPU_BASE_URL}/product/get", 
                headers=get_headers(), 
                data={"search": sku, "product_active_status": "show", "limit": 1, "offset": 0}, 
                timeout=5
            )
            
            # If the response is HTML (redirect to login) or unauthorized, try relogging once
            if r.status_code != 200 or "text/html" in r.headers.get("Content-Type", ""):
                print(f"[NOCPU] Session expired during image fetch for {sku}. Relogging...")
                self.logged_in = False
                if self.login():
                    r = self.session.post(
                        f"{NOCPU_BASE_URL}/product/get", 
                        headers=get_headers(), 
                        data={"search": sku, "product_active_status": "show", "limit": 1, "offset": 0}, 
                        timeout=5
                    )
                else:
                    return "" # Don't cache empty if login fails
            
            if r.status_code == 200 and "application/json" in r.headers.get("Content-Type", ""):
                rows = r.json().get("rows", [])
                if rows:
                    img_tag = str(rows[0].get("img") or "")
                    m = re.search(r'src=["\']([^"\']+)["\']', img_tag)
                    if m:
                        img_url = m.group(1)
                        IMAGE_CACHE[sku] = img_url
                        return img_url
                
                # If valid JSON but no image found, cache as empty so we don't spam requests
                IMAGE_CACHE[sku] = ""
                return ""
        except Exception as e:
            print(f"[NOCPU] Failed to fetch image for {sku}: {e}")
            
        # Do not cache empty string on network errors, so it will retry next time
        return ""


nocpu = NocpuSession()


# ==========================================================
#  Flask routes
# ==========================================================

@app.route("/api/nocpu/search", methods=["GET"])
def nocpu_search():
    global NOCPU_CACHE, NOCPU_CACHE_TIME
    
    query = flask_request.args.get("query", "").strip().lower()
    if not query:
        return jsonify([])

    if not NOCPU_CACHE or time.time() - NOCPU_CACHE_TIME > CACHE_TTL:
        NOCPU_CACHE = nocpu.load_excel_cache()
        NOCPU_CACHE_TIME = time.time()
        
    if not NOCPU_CACHE:
        return jsonify({"error": "Failed to fetch data from nocpu-behind.info"}), 500

    # Replace hyphens with spaces in query to make searching easier (e.g. JUN26-D4 -> jun26 d4)
    query_clean = query.replace("-", " ")
    words = query_clean.split()
    
    def is_comset(name, sku):
        name_lower = name.lower()
        if any(k in name_lower for k in ["computer set", "คอมเซ็ต", "คอมเซต", "คอมประกอบ", "ชุดประกอบ", "comset"]): return True
        if name.count('/') >= 2: return True
        prefix = r'\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\d{2}\b'
        if re.search(prefix, name, re.IGNORECASE) or re.search(prefix, sku, re.IGNORECASE): return True
        return False
    
    # Fast in-memory filtering: match items containing ALL words
    filtered = []
    for p in NOCPU_CACHE:
        # Also clean the search string to make matching more forgiving
        p_search_clean = p["search_str"].replace("-", " ")
        if all(word in p_search_clean for word in words):
            # If the user typed only 1 word, exclude comsets UNLESS they explicitly searched for the comset series/SKU
            if len(words) == 1:
                word = words[0]
                if is_comset(p["name"], p["sku"]):
                    # Allow only if the query exactly matches the SKU or is a month-year prefix
                    if word == p["sku"].lower() or re.match(r'^[a-z]{3}\d{2}$', word):
                        pass
                    else:
                        continue
            
            filtered.append(p)
            
    # Take top 10 items
    top_items = filtered[:10]
    
    # Fetch images in parallel for the top 10 items if not cached
    if top_items:
        skus_to_fetch = [p["sku"] for p in top_items if p["sku"] not in IMAGE_CACHE]
        if skus_to_fetch:
            with ThreadPoolExecutor(max_workers=10) as executor:
                # We map to list to force execution
                list(executor.map(nocpu.fetch_image_for_sku, skus_to_fetch))

    # Build final response
    results = []
    for p in top_items:
        results.append({
            "name": p["name"],
            "price": p["price"],
            "image": IMAGE_CACHE.get(p["sku"], "")
        })

    return jsonify(results)


@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok",
        "nocpu_logged_in": nocpu.logged_in,
        "cache_size": len(NOCPU_CACHE),
        "image_cache_size": len(IMAGE_CACHE)
    })

FEES_CACHE = None
FEES_CACHE_TIME = 0

@app.route("/api/fees", methods=["GET"])
def get_fees():
    global FEES_CACHE, FEES_CACHE_TIME
    if FEES_CACHE and time.time() - FEES_CACHE_TIME < CACHE_TTL:
        return jsonify(FEES_CACHE)
        
    try:
        csv_url = 'https://docs.google.com/spreadsheets/d/1OpvDt53URkSmkhG36-2KNvE-EB_FGm37yOrDXHJjgO8/export?format=csv&gid=0'
        r = requests.get(csv_url, timeout=10)
        reader = csv.reader(io.StringIO(r.text))
        data = {'shopee': {}, 'lazada': {}, 'tiktok': {}}
        for i, row in enumerate(reader):
            if i < 2: continue
            if len(row) < 9: continue
            
            s_cat = row[1].strip()
            if s_cat and s_cat not in ['Category', 'SHOPEE'] and not s_cat.startswith('Update'):
                data['shopee'][s_cat] = row[2].strip()
                
            l_cat = row[4].strip()
            if l_cat and l_cat not in ['Category', 'LAZADA'] and not l_cat.startswith('Update'):
                data['lazada'][l_cat] = row[5].strip()
                
            t_cat = row[7].strip()
            if t_cat and t_cat not in ['Category', 'TIKTOK'] and not t_cat.startswith('Update'):
                data['tiktok'][t_cat] = row[8].strip()
                
        FEES_CACHE = data
        FEES_CACHE_TIME = time.time()
        return jsonify(data)
    except Exception as e:
        print(f"Error fetching fees: {e}")
        if FEES_CACHE: return jsonify(FEES_CACHE)
        return jsonify({"error": str(e)}), 500

@app.route("/api/diy/price", methods=["GET"])
def get_diy_price():
    url = flask_request.args.get("url")
    if not url or "ihavecpu.com/diy/share" not in url:
        return jsonify({"error": "Invalid DIY URL"}), 400
        
    try:
        headers = {"User-Agent": "Mozilla/5.0"}
        r = requests.get(url, headers=headers, timeout=10)
        m = re.search(r'<script id="__NEXT_DATA__" type="application/json">(.*?)</script>', r.text)
        if m:
            data = json.loads(m.group(1))
            net_price = data.get("props", {}).get("pageProps", {}).get("detailDIY", {}).get("netPrice")
            if net_price is not None:
                return jsonify({"price": net_price})
        return jsonify({"error": "Price not found in HTML"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ==========================================================
if __name__ == "__main__":
    print("=" * 60)
    print("  Price Calculator Proxy -> http://127.0.0.1:5000")
    print("=" * 60)
    nocpu.login()
    NOCPU_CACHE = nocpu.load_excel_cache()
    NOCPU_CACHE_TIME = time.time()
    app.run(host="127.0.0.1", port=5000, debug=False)
