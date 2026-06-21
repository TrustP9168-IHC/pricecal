# -*- coding: utf-8 -*-
import requests
import urllib.parse
import sys
import io

sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')

s = requests.Session()
s.headers.update({
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36",
})

# Login
r = s.get("https://nocpu-behind.info/")
xsrf = urllib.parse.unquote(s.cookies.get("XSRF-TOKEN", ""))
r2 = s.post(
    "https://nocpu-behind.info/checkSignin",
    data={"username": "Trust.p", "password": "trustp9168"},
    headers={"X-XSRF-TOKEN": xsrf, "Referer": "https://nocpu-behind.info/", "X-Requested-With": "XMLHttpRequest"},
)
print("Login:", r2.json())

# Test exportProduct endpoint
print("\n--- GET /product/exportProduct ---")
r3 = s.get("https://nocpu-behind.info/product/exportProduct?product_active_status=show")
print("Status:", r3.status_code)
print("Content-Type:", r3.headers.get("Content-Type"))
print("Content-Disposition:", r3.headers.get("Content-Disposition"))

# Print first 500 chars to see what format it is
print("\nPreview:")
print(r3.text[:1000])

if "application/vnd" in r3.headers.get("Content-Type", "") or "excel" in r3.headers.get("Content-Type", ""):
    with open("export.xlsx", "wb") as f:
        f.write(r3.content)
    print("Saved as export.xlsx")
elif "csv" in r3.headers.get("Content-Type", ""):
    with open("export.csv", "wb") as f:
        f.write(r3.content)
    print("Saved as export.csv")
