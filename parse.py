import csv
import json
import os

filepath = r'C:\Users\pumnp\.gemini\antigravity\brain\126d0b1c-3167-47a7-aa80-d0c691c76397\.system_generated\steps\17\content.md'

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

csv_lines = lines[8:]
reader = csv.reader(csv_lines)

data = {'Shopee': {}, 'Lazada': {}, 'Tiktok': {}}
rows = list(reader)
for row in rows[6:]:
    if len(row) < 9:
        continue
    if row[1].strip():
        data['Shopee'][row[1].strip()] = row[2].strip()
    if row[4].strip():
        data['Lazada'][row[4].strip()] = row[5].strip()
    if row[7].strip():
        data['Tiktok'][row[7].strip()] = row[8].strip()

with open('category_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)
