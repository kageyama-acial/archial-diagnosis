"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  { id: 1, axis: 1, text: "チームで目標に向かうとき、一人のときより力が湧いてくる" },
  { id: 2, axis: 1, text: "仲間が頑張っている姿を見ると、自分もやる気が上がる" },
  { id: 3, axis: 1, text: "誰かと一緒に取り組む方が、成果が出やすいと感じる" },
  { id: 4, axis: 1, text: "チームの雰囲気が自分のパフォーマンスに大きく影響する" },
  { id: 5, axis: 1, text: "仲間と喜びを分かち合うことが、仕事のモチベーションになる" },
  { id: 6, axis: 2, text: "新しいことに挑戦し、自ら道を切り拓くことにやりがいを感じる" },
  { id: 7, axis: 2, text: "現状に満足せず、より良い方法を探して動くことが好きだ" },
  { id: 8, axis: 2, text: "誰もやっていないことに取り組むとき、ワクワクする" },
  { id: 9, axis: 2, text: "課題があれば、自分から動いて解決しようとする" },
  { id: 10, axis: 2, text: "チャレンジすることより、確実に成果を出すことを重視する", reverse: true },
  { id: 11, axis: 3, text: "行動する前に、全体の計画を立ててから動きたい" },
  { id: 12, axis: 3, text: "ゴールから逆算して、段取りを組むことが得意だ" },
  { id: 13, axis: 3, text: "見通しが立ってから動く方が、力を発揮できる" },
  { id: 14, axis: 3, text: "行き当たりばったりより、準備してから臨む方が好きだ" },
  { id: 15, axis: 3, text: "考えるより先に動いてしまうことが多い", reverse: true },
  { id: 16, axis: 4, text: "これだという直感や熱量で動くことが多い" },
  { id: 17, axis: 4, text: "理屈より、自分がワクワクするかどうかで判断することが多い" },
  { id: 18, axis: 4, text: "感情が動いたとき、一番力が出ると感じる" },
  { id: 19, axis: 4, text: "情報を整理してから動くより、まず感じてから考えるタイプだ" },
  { id: 20, axis: 4, text: "データや根拠が揃ってから動く方が安心する", reverse: true },
];

const labels = ["全く当てはまらない", "あまり当てはまらない", "どちらでもない", "やや当てはまる", "とても当てはまる"];

export default function DiagnosisPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [current, setCurrent] = useState(0);

  const q = questions[current];
  const progress = Math.round((current / questions.length) * 100);

  const handleAnswer = (score: number) => {
    const actual = (q as any).reverse ? 6 - score : score;
    const newAnswers = { ...answers, [q.id]: actual };
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const axisScores = [1, 2, 3, 4].map((axis) =>
        questions.filter((q) => q.axis === axis).reduce((sum, q) => sum + (newAnswers[q.id] || 0), 0)
      );
      const types = axisScores.map((score) => (score >= 13 ? "A" : "B"));
      router.push(`/result?type=${types.join("")}`);
    }
  };

  const handleBack = () => {
    if (current > 0) {
      setCurrent(current - 1);
    } else {
      router.push("/");
    }
  };

  return (
    <main className="min-h-screen bg-[#0F0E1A] text-white flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-xl mb-8">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Q{current + 1} / {questions.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-[#7B5CF6] to-[#C84B8B] h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div className="w-full max-w-xl bg-[#1A1830] rounded-2xl p-8 mb-8 text-center">
        <p className="text-xs text-purple-400 mb-4 tracking-widest uppercase">
          {["力の源泉", "フィールドでの役割", "プレースタイル", "判断のよりどころ"][q.axis - 1]}
        </p>
        <p className="text-xl md:text-2xl font-bold leading-relaxed">{q.text}</p>
      </div>

      <div className="w-full max-w-xl flex flex-col gap-3">
        {labels.map((label, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(i + 1)}
            className="w-full py-4 rounded-xl border border-gray-700 hover:border-purple-500 hover:bg-[#2A2050] transition text-gray-300 hover:text-white font-medium"
          >
            {label}
          </button>
        ))}
      </div>

      <button
        onClick={handleBack}
        className="mt-10 text-gray-400 hover:text-white transition text-sm underline"
      >
        {current === 0 ? "← トップに戻る" : "← 前の質問に戻る"}
      </button>
    </main>
  );
}
