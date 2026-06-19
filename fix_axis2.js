const fs = require('fs');
let c = fs.readFileSync('app/result/page.tsx', 'utf8');
// 行動型と情熱型の行を入れ替える
const line1 = '  { label: ["行動型", "計画型"], icon: "🔥", color: "#10B981" },';
const line2 = '  { label: ["情熱型", "思考型"], icon: "💜", color: "#F59E0B" },';
const newLine1 = '  { label: ["情熱型", "思考型"], icon: "🔥", color: "#10B981" },';
const newLine2 = '  { label: ["行動型", "計画型"], icon: "💜", color: "#F59E0B" },';
c = c.replace(line1, '___TEMP___');
c = c.replace(line2, newLine2);
c = c.replace('___TEMP___', newLine1);
fs.writeFileSync('app/result/page.tsx', c, 'utf8');
console.log('完了！');
