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
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const q = questions[current];
  const progress = Math.round((current / questions.length) * 100);

  const goTo = (index: number, dir: "next" | "prev") => {
    setDirection(dir);
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 250);
  };

  const handleAnswer = (score: number) => {
    const actual = (q as any).reverse ? 6 - score : score;
    const newAnswers = { ...answers, [q.id]: actual };
    setAnswers(newAnswers);
    if (current + 1 < questions.length) {
      goTo(current + 1, "next");
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
      goTo(current - 1, "prev");
    } else {
      router.push("/");
    }
  };

  const slideClass = animating
    ? direction === "next"
      ? "opacity-0 translate-x-8"
      : "opacity-0 -translate-x-8"
    : "opacity-100 translate-x-0";

  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-16"
      style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #faf0ff 100%)" }}>

      {/* ヘッダー */}
      <div className="w-full max-w-xl mb-8">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Q{current + 1} / {questions.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-white/60 rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: "linear-gradient(135deg, #7B5CF6, #C84B8B)" }}
          />
        </div>
      </div>

      {/* 質問カード */}
      <div className={`w-full max-w-xl transition-all duration-250 ease-in-out ${slideClass}`}>
        <div className="rounded-3xl p-8 mb-6 text-center"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow: "0 8px 32px rgba(123,92,246,0.08)",
          }}>
          <p className="text-xs font-bold mb-4 tracking-widest uppercase"
            style={{ color: "#7B5CF6" }}>
            {["力の源泉", "フィールドでの役割", "プレースタイル", "判断のよりどころ"][q.axis - 1]}
          </p>
          <p className="text-xl md:text-2xl font-bold leading-relaxed text-gray-900">{q.text}</p>
        </div>

        {/* 選択肢 */}
        <div className="flex flex-col gap-3">
          {labels.map((label, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(i + 1)}
              className="w-full py-4 rounded-2xl font-medium transition-all duration-200 text-gray-700 hover:text-white"
              style={{
                background: "rgba(255,255,255,0.6)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.8)",
                boxShadow: "0 2px 8px rgba(123,92,246,0.06)",
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "linear-gradient(135deg, #7B5CF6, #C84B8B)";
                (e.currentTarget as HTMLButtonElement).style.border = "1px solid transparent";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.6)";
                (e.currentTarget as HTMLButtonElement).style.border = "1px solid rgba(255,255,255,0.8)";
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleBack}
        className="mt-10 text-gray-400 hover:text-gray-700 transition text-sm underline"
      >
        {current === 0 ? "← トップに戻る" : "← 前の質問に戻る"}
      </button>
    </main>
  );
}
