const fs = require('fs');
let c = fs.readFileSync('app/result/page.tsx', 'utf8');
const oldStr = 'val === ["T","A","M","H"][i] ? axisConfig[i].label[0] : axisConfig[i].label[1]';
const newStr = 'val === ["T","A","H","M"][i] ? axisConfig[i].label[0] : axisConfig[i].label[1]';
const count = c.split(oldStr).length - 1;
c = c.split(oldStr).join(newStr);
fs.writeFileSync('app/result/page.tsx', c, 'utf8');
console.log('完了！置換数:' + count);
