const fs = require('fs');
let c = fs.readFileSync('app/result/page.tsx', 'utf8');

const oldStr = `const categories = [`;

const newStr = `function AxisBarometer({ scores }: { scores: number[] }) {
  const axes = [
    { label1: "チーム型", label2: "ソロ型", color: "#C84B8B", pct: scores[0] },
    { label1: "攻撃型", label2: "守備型", color: "#8B5CF6", pct: scores[1] },
    { label1: "情熱型", label2: "思考型", color: "#10B981", pct: scores[2] },
    { label1: "行動型", label2: "計画型", color: "#F59E0B", pct: scores[3] },
  ];
  return (
    <div className="w-full rounded-2xl p-5 mb-3" style={{ background: "white", border: "1px solid rgba(123,92,246,0.1)", boxShadow: "0 2px 8px rgba(123,92,246,0.04)" }}>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-base">📊</span>
        <h2 className="text-sm font-bold tracking-wide" style={{ color: "#7B5CF6" }}>あなたの4軸スコア</h2>
      </div>
      <div className="flex flex-col gap-4">
        {axes.map((ax, i) => (
          <div key={i}>
            <div className="flex justify-between text-xs mb-1">
              <span className="font-bold" style={{ color: ax.color }}>{ax.label1}</span>
              <span className="text-gray-400">{ax.label2}</span>
            </div>
            <div className="relative w-full h-3 rounded-full" style={{ background: "rgba(123,92,246,0.08)" }}>
              <div className="absolute left-0 top-0 h-3 rounded-full transition-all duration-700"
                style={{ width: \`\${ax.pct}%\`, background: \`linear-gradient(90deg, \${ax.color}99, \${ax.color})\` }} />
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span style={{ color: ax.color, fontWeight: "bold" }}>{ax.pct}%</span>
              <span className="text-gray-300">{100 - ax.pct}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const categories = [`;

const count = c.split(oldStr).length - 1;
c = c.split(oldStr).join(newStr);
fs.writeFileSync('app/result/page.tsx', c, 'utf8');
console.log('完了！置換数:' + count);
