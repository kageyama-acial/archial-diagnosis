const fs = require('fs');
let c = fs.readFileSync('app/diagnosis/page.tsx', 'utf8');
const oldStr = 'style={{ width: `${progress}%`, background: RAINBOW, backgroundSize: `${100 / (progress / 100)}% 100%`, backgroundPosition: "left center" }} />';
const newStr = 'style={{ width: `${progress}%`, background: "linear-gradient(90deg, #C84B8B, #8B5CF6, #10B981, #F59E0B)" }} />';
const count = c.split(oldStr).length - 1;
c = c.split(oldStr).join(newStr);
fs.writeFileSync('app/diagnosis/page.tsx', c, 'utf8');
console.log('完了！置換数:' + count);
