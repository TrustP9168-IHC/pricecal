# -*- coding: utf-8 -*-
import requests
import urllib.parse
import json
import re
import sys
import time
from concurrent.futures import ThreadPoolExecutor

s = requests.Session()
s.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
    "X-Requested-With": "XMLHttpRequest",
})
s.get("https://nocpu-behind.info/")
xsrf = urllib.parse.unquote(s.cookies.get("XSRF-TOKEN", ""))
s.post(
    "https://nocpu-behind.info/checkSignin",
    data={"username": "Trust.p", "password": "trustp9168"},
    headers={"X-XSRF-TOKEN": xsrf, "Referer": "https://nocpu-behind.info/"},
)
r_home = s.get("https://nocpu-behind.info/product/index")
xsrf2 = urllib.parse.unquote(s.cookies.get("XSRF-TOKEN", ""))
csrf_token = re.search(r'meta name="csrf-token" content="([^"]+)"', r_home.text).group(1)
group_id = re.search(r'var\s+group_id\s*=\s*["\']?(\d+)', r_home.text).group(1)

headers = {
    "X-XSRF-TOKEN": xsrf2,
    "X-CSRF-TOKEN": csrf_token,
    "USER-GROUP": group_id,
    "Referer": "https://nocpu-behind.info/product/index",
}

def fetch_img(sku):
    try:
        r = s.post("https://nocpu-behind.info/product/get", headers=headers, data={"search": sku, "limit": 1, "offset": 0}, timeout=5)
        if r.status_code == 200:
            rows = r.json().get("rows", [])
            if rows:
                img_tag = rows[0].get("img", "")
                m = re.search(r'src=["\']([^"\']+)["\']', img_tag)
                return m.group(1) if m else ""
    except Exception as e:
        pass
    return ""

start = time.time()
skus = [
    "JUN26-D4-092", "JUN26-D4-091", "JUN26-D4-090", "JUN26-D4-087", "JUN26-D4-086",
    "JUN26-D4-085", "JUN26-D4-082", "JUN26-D4-081", "JUN26-D4-080", "JUN26-D4-078"
]

with ThreadPoolExecutor(max_workers=10) as executor:
    results = list(executor.map(fetch_img, skus))

print(f"Time taken for 10 concurrent requests: {time.time() - start:.2f}s")
for sku, img in zip(skus, results):
    print(f"{sku}: {img}")
