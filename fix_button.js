const fs = require('fs');
let c = fs.readFileSync('app/diagnosis/page.tsx', 'utf8');
const oldStr = 'background: sectionAnswered ? `linear-gradient(135deg, ${section.color}, ${section.colorEnd})` : "rgba(123,92,246,0.2)",';
const newStr = 'background: sectionAnswered ? `linear-gradient(135deg, ${section.color}, ${section.colorEnd})` : `linear-gradient(135deg, ${section.color}40, ${section.colorEnd}40)`,';
const count = c.split(oldStr).length - 1;
c = c.split(oldStr).join(newStr);
fs.writeFileSync('app/diagnosis/page.tsx', c, 'utf8');
console.log('完了！置換数:' + count);
