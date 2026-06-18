replacements = [
    ('TAMH', 'TAHM'), ('TAML', 'TALM'), ('TAPH', 'TAHP'), ('TAPL', 'TALP'),
    ('TGMH', 'TGHM'), ('TGML', 'TGLM'), ('TGPH', 'TGHP'), ('TGPL', 'TGLP'),
    ('SAMH', 'SAHM'), ('SAML', 'SALM'), ('SAPH', 'SAHP'), ('SAPL', 'SALP'),
    ('SGMH', 'SGHM'), ('SGML', 'SGLM'), ('SGPH', 'SGHP'), ('SGPL', 'SGLP'),
]
files = ['app/result/page.tsx', 'app/diagnosis/page.tsx']
for filepath in files:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    for old, new in replacements:
        content = content.replace(old, new)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    print(filepath + ' 完了')
