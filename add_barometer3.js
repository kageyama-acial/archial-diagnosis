const fs = require('fs');
let c = fs.readFileSync('app/result/page.tsx', 'utf8');

const oldStr = `      <div className="max-w-2xl mx-auto">
        <CompatibilitySection myCode={typeCode} />`;

const newStr = `      <div className="max-w-2xl mx-auto">
        <AxisBarometer scores={axisScores} />
        <CompatibilitySection myCode={typeCode} />`;

const count = c.split(oldStr).length - 1;
c = c.split(oldStr).join(newStr);
fs.writeFileSync('app/result/page.tsx', c, 'utf8');
console.log('完了！置換数:' + count);
