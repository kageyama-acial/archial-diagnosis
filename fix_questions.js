const fs = require('fs');
let c = fs.readFileSync('app/diagnosis/page.tsx', 'utf8');

// reverseバグ修正: 6-score → 8-score
c = c.split('const actual = reverse ? 6 - score : score;').join('const actual = reverse ? 8 - score : score;');

// 質問を24問に書き直し
const oldQuestions = `    questions: [
        { id: 1, text: "チームで目標に向かうとき、一人のときより力が湧いてくる" },
        { id: 2, text: "仲間が頑張っている姿を見ると、自分もやる気が上がる" },
        { id: 3, text: "誰かと一緒に取り組む方が、成果が出やすいと感じる" },
        { id: 4, text: "チームの雰囲気が自分のパフォーマンスに大きく影響する" },
        { id: 5, text: "仲間と喜びを分かち合うことが、仕事のモチベーションになる" },
        { id: 6, text: "一人で黙々と作業するより、誰かと話しながら進める方が好きだ" },
        { id: 7, text: "チームのために自分の役割を果たすことに誇りを感じる" },
      ],
    },
    {
      axis: 2,
      label: "フィールドでの役割",
      sublabel: "攻撃型 OR 守備型",
      color: "#8B5CF6",
      colorEnd: "#06B6D4",
      questions: [
        { id: 8, text: "新しいことに挑戦し、自ら道を切り拓くことにやりがいを感じる" },
        { id: 9, text: "現状に満足せず、より良い方法を探して動くことが好きだ" },
        { id: 10, text: "誰もやっていないことに取り組むとき、ワクワクする" },
        { id: 11, text: "課題があれば、自分から動いて解決しようとする" },
        { id: 12, text: "チャレンジすることより、確実に成果を出すことを重視する", reverse: true },
        { id: 13, text: "リスクがあっても、可能性があると感じたら動ける" },
      ],
    },
    {
      axis: 3,
      label: "プレースタイル",
      sublabel: "計画型 OR 行動型",
      color: "#10B981",
      colorEnd: "#84CC16",
      questions: [
        { id: 14, text: "行動する前に、全体の計画を立ててから動きたい" },
        { id: 15, text: "ゴールから逆算して、段取りを組むことが得意だ" },
        { id: 16, text: "見通しが立ってから動く方が、力を発揮できる" },
        { id: 17, text: "行き当たりばったりより、準備してから臨む方が好きだ" },
        { id: 18, text: "考えるより先に動いてしまうことが多い", reverse: true },
        { id: 19, text: "締め切りや期限を決めて、逆算して行動することが多い" },
      ],
    },
    {
      axis: 4,
      label: "判断のよりどころ",
      sublabel: "情熱型 OR 思考型",
      color: "#F59E0B",
      colorEnd: "#EF4444",
      questions: [
        { id: 20, text: "これだという直感や熱量で動くことが多い" },
        { id: 21, text: "理屈より、自分がワクワクするかどうかで判断することが多い" },
        { id: 22, text: "感情が動いたとき、一番力が出ると感じる" },
        { id: 23, text: "データや根拠が揃ってから動く方が安心する", reverse: true },
        { id: 24, text: "論理的に筋が通っているかどうかを重視して判断する", reverse: true },
        { id: 25, text: "人の気持ちや場の雰囲気を大切にして判断することが多い" },`;

const newQuestions = `    questions: [
        { id: 1, text: "チームで目標に向かうとき、一人のときより力が湧いてくる" },
        { id: 2, text: "仲間の熱量が自分のパフォーマンスを引き上げてくれる" },
        { id: 3, text: "誰かと一緒に取り組む方が、成果が出やすいと感じる" },
        { id: 4, text: "一人で深く集中して取り組む方が、本来の力を発揮できる", reverse: true },
        { id: 5, text: "自分のペースで動ける環境の方が、最高のアウトプットが出る", reverse: true },
        { id: 6, text: "一人で考え抜いた答えの方が、自分らしい結果につながる", reverse: true },
      ],
    },
    {
      axis: 2,
      label: "フィールドでの役割",
      sublabel: "攻撃型 OR 守備型",
      color: "#8B5CF6",
      colorEnd: "#06B6D4",
      questions: [
        { id: 7, text: "新しいことに挑戦し、自ら道を切り拓くことにやりがいを感じる" },
        { id: 8, text: "現状に満足せず、より良い方法を探して動くことが好きだ" },
        { id: 9, text: "リスクがあっても、可能性があると感じたら動ける" },
        { id: 10, text: "守るべきものを守り抜くことに、強いやりがいを感じる", reverse: true },
        { id: 11, text: "品質やリスクを見極めてから動く方が、良い結果につながると思う", reverse: true },
        { id: 12, text: "誰かが見落としているリスクや問題を事前に察知するのが得意だ", reverse: true },
      ],
    },
    {
      axis: 3,
      label: "プレースタイル",
      sublabel: "計画型 OR 行動型",
      color: "#10B981",
      colorEnd: "#84CC16",
      questions: [
        { id: 13, text: "行動する前に、全体の計画を立ててから動きたい" },
        { id: 14, text: "ゴールから逆算して、段取りを組むことが得意だ" },
        { id: 15, text: "行き当たりばったりより、準備してから臨む方が好きだ" },
        { id: 16, text: "まず動いてみて、走りながら修正していくスタイルが合っている", reverse: true },
        { id: 17, text: "考えるより先に動いてしまうことが多い", reverse: true },
        { id: 18, text: "計画より直感で動く方が、いい結果につながることが多い", reverse: true },
      ],
    },
    {
      axis: 4,
      label: "判断のよりどころ",
      sublabel: "情熱型 OR 思考型",
      color: "#F59E0B",
      colorEnd: "#EF4444",
      questions: [
        { id: 19, text: "これだという直感や熱量で動くことが多い" },
        { id: 20, text: "理屈より、自分がワクワクするかどうかで判断することが多い" },
        { id: 21, text: "感情が動いたとき、一番力が出ると感じる" },
        { id: 22, text: "データや根拠を揃えてから動く方が安心する", reverse: true },
        { id: 23, text: "論理的に筋が通っているかどうかを重視して判断する", reverse: true },
        { id: 24, text: "客観的な事実や数字をもとに判断することが多い", reverse: true },`;

const count = c.split(oldQuestions).length - 1;
c = c.split(oldQuestions).join(newQuestions);
fs.writeFileSync('app/diagnosis/page.tsx', c, 'utf8');
console.log('完了！置換数:' + count);
