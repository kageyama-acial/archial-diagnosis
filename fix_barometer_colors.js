const fs = require('fs');
let c = fs.readFileSync('app/result/page.tsx', 'utf8');
const oldStr = `    { label1: "チーム型", label2: "ソロ型", color: "#C84B8B", pct: scores[0] },
    { label1: "攻撃型", label2: "守備型", color: "#8B5CF6", pct: scores[1] },
    { label1: "情熱型", label2: "思考型", color: "#10B981", pct: scores[2] },
    { label1: "行動型", label2: "計画型", color: "#F59E0B", pct: scores[3] },`;
const newStr = `    { label1: "チーム型", label2: "ソロ型", color: "#C84B8B", colorEnd: "#3B82F6", pct: scores[0] },
    { label1: "攻撃型", label2: "守備型", color: "#8B5CF6", colorEnd: "#06B6D4", pct: scores[1] },
    { label1: "情熱型", label2: "思考型", color: "#10B981", colorEnd: "#84CC16", pct: scores[2] },
    { label1: "行動型", label2: "計画型", color: "#F59E0B", colorEnd: "#EF4444", pct: scores[3] },`;
const count = c.split(oldStr).length - 1;
c = c.split(oldStr).join(newStr);

// グラデーションをcolorEndも使うように更新
const oldBar = 'style={{ width: `${ax.pct}%`, background: `linear-gradient(90deg, ${ax.color}99, ${ax.color})` }}';
const newBar = 'style={{ width: `${ax.pct}%`, background: `linear-gradient(90deg, ${ax.color}, ${ax.colorEnd})` }}';
c = c.split(oldBar).join(newBar);

fs.writeFileSync('app/result/page.tsx', c, 'utf8');
console.log('完了！');
