const fs = require('fs');
let c = fs.readFileSync('app/diagnosis/page.tsx', 'utf8');

// ① 回答取り消し機能を追加
const oldHandle = `  handleAnswer = (questionId: number, score: number, reverse?: boolean) => {
    const actual = reverse ? 6 - score : score;
    setAnswers(prev => ({ ...prev, [questionId]: actual }));
  };`;
const newHandle = `  handleAnswer = (questionId: number, score: number, reverse?: boolean) => {
    const actual = reverse ? 6 - score : score;
    setAnswers(prev => {
      if (prev[questionId] === actual) {
        const next = { ...prev };
        delete next[questionId];
        return next;
      }
      return { ...prev, [questionId]: actual };
    });
  };`;
c = c.split(oldHandle).join(newHandle);

// ② 進捗バーを現在の軸の色のみに変更
const oldBar = 'style={{ width: `${progress}%`, background: "linear-gradient(90deg, #C84B8B, #8B5CF6, #10B981, #F59E0B)" }} />';
const newBar = 'style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${section.color}, ${section.colorEnd})` }} />';
c = c.split(oldBar).join(newBar);

fs.writeFileSync('app/diagnosis/page.tsx', c, 'utf8');
console.log('完了！');
