const fs = require('fs');
let c = fs.readFileSync('app/result/page.tsx', 'utf8');
const oldStr = `["🏀","🏐","🏉","🥍","🥎","🤾","🏃","⚾","🏹","⚽","🎾","🛹","🏊","🤸","🛶","🧗"][Object.keys(typeAxes).indexOf(code) % 16]`;
const newStr = `({"TAHM":"🏀","TALM":"🏐","TAHP":"🏉","TALP":"🥍","TGHM":"🏈","TGLM":"🤾","TGHP":"⚽","TGLP":"⚾","SAHM":"🏹","SALM":"🏃","SAHP":"🎾","SALP":"🛹","SGHM":"🏊","SGLM":"🤸","SGHP":"🛶","SGLP":"🧗"})[code]`;
const count = c.split(oldStr).length - 1;
c = c.split(oldStr).join(newStr);
fs.writeFileSync('app/result/page.tsx', c, 'utf8');
console.log('完了！置換数:' + count);
