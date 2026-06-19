const fs = require('fs');
let c = fs.readFileSync('app/diagnosis/page.tsx', 'utf8');
const oldStr = 'const maxScores = sections.map(s => s.questions.length * 5);';
const newStr = 'const maxScores = sections.map(s => s.questions.length * 7);';
const count = c.split(oldStr).length - 1;
c = c.split(oldStr).join(newStr);
fs.writeFileSync('app/diagnosis/page.tsx', c, 'utf8');
console.log('完了！置換数:' + count);
