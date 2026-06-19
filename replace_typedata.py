# -*- coding: utf-8 -*-
import sys

start_marker = "const typeData: { [key: string]: {"
end_marker = "const typeNames: { [k: string]: string } ="

with open("app/result/page.tsx", "r", encoding="utf-8") as f:
    content = f.read()

start_idx = content.find(start_marker)
end_idx = content.find(end_marker)

if start_idx == -1:
    print("ERROR: typeData開始が見つかりません")
    sys.exit(1)
if end_idx == -1:
    print("ERROR: typeNames開始が見つかりません")
    sys.exit(1)

before = content[:start_idx]
after = content[end_idx:]

new_block = open("update_type_data.txt", "r", encoding="utf-8").read()
new_content = before + new_block + "\n" + after

with open("app/result/page.tsx", "w", encoding="utf-8") as f:
    f.write(new_content)

print(f"置換完了！ typeData開始: {start_idx}, typeNames開始: {end_idx}")
