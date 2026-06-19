const fs = require('fs');
let c = fs.readFileSync('app/result/page.tsx', 'utf8');
const oldStr = '  { label: ["行動型", "計画型"], icon: "🔥", color: "#10B981" },\n  { label: ["情熱型", "思考型"], icon: "💜", color: "#F59E0B" },';
const newStr = '  { label: ["情熱型", "思考型"], icon: "🔥", color: "#10B981" },\n  { label: ["行動型", "計画型"], icon: "💜", color: "#F59E0B" },';
const count = c.split(oldStr).length - 1;
c = c.split(oldStr).join(newStr);
fs.writeFileSync('app/result/page.tsx', c, 'utf8');
console.log('完了！置換数:' + count);
