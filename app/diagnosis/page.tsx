"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const sections = [
  {
    axis: 1,
    label: "力の源泉",
    sublabel: "チーム型 OR ソロ型",
    color: "#C84B8B",
    colorEnd: "#3B82F6",
    questions: [
      { id: 1, text: "チームで目標に向かうとき、一人のときより力が湧いてくる" },
      { id: 4, text: "一人で深く集中して取り組む方が、本来の力を発揮できる", reverse: true },
      { id: 2, text: "仲間の熱量が自分のパフォーマンスを引き上げてくれる" },
      { id: 5, text: "チームの足並みを揃えなければならない状況は、窮屈に感じる", reverse: true },
      { id: 3, text: "自分がうまくいっても、仲間も一緒でないと素直に喜べない" },
      { id: 6, text: "他の人と議論するより、一人で考えた方がいいアイデアが出る", reverse: true },
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
      { id: 10, text: "前例のないことより、証明されたやり方を着実にこなす方が力を発揮できる", reverse: true },
      { id: 8, text: "やったことのないことに取り組む前、不安よりワクワク感の方が強い" },
      { id: 11, text: "新しい提案を聞いたとき、まずリスクや問題点が頭に浮かぶ", reverse: true },
      { id: 9, text: "リスクがあっても、可能性があると感じたら動ける" },
      { id: 12, text: "ミスや見落としがないか、必要以上に確認してしまうことがある", reverse: true },
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
      { id: 16, text: "やり直しや修正は、当たり前のプロセスだと思っている", reverse: true },
      { id: 14, text: "準備に時間をかけすぎて、スタートが遅くなることがある" },
      { id: 17, text: "細かく決めすぎると、動き出す前に気持ちが冷める", reverse: true },
      { id: 15, text: "急に予定が変わったり、行き当たりばったりで進む状況は苦手だ" },
      { id: 18, text: "完璧な計画を立てるより、まず動いて現実を確認した方が早いと思う", reverse: true },
    ],
  },
  {
    axis: 4,
    label: "判断のよりどころ",
    sublabel: "本能型 OR 思考型",
    color: "#F59E0B",
    colorEnd: "#EF4444",
    questions: [
      { id: 19, text: "理由はうまく説明できないけど、「これだ」と感じる感覚を大事にしている" },
      { id: 22, text: "物事の筋道が見えていないと、前に進む気になれない", reverse: true },
      { id: 20, text: "論理的に正しくても、ワクワクしないことには全力を出しにくい" },
      { id: 23, text: "感覚で決めた判断より、根拠のある判断の方が自信を持って動ける", reverse: true },
      { id: 21, text: "気持ちや感覚が先に動いて、あとから根拠を考えることが多い" },
      { id: 24, text: "感情に流されそうになったとき、一度立ち止まって論理的に考え直す癖がある", reverse: true },
    ],
  },
];

const scaleSizes = [42, 38, 34, 28, 34, 38, 42];

function mixColor(c1: string, c2: string, ratio: number): string {
  const h = (c: string) => parseInt(c.slice(1), 16);
  const v1 = h(c1), v2 = h(c2);
  const r = Math.round(((v1 >> 16) & 255) * (1 - ratio) + ((v2 >> 16) & 255) * ratio);
  const g = Math.round(((v1 >> 8) & 255) * (1 - ratio) + ((v2 >> 8) & 255) * ratio);
  const b = Math.round((v1 & 255) * (1 - ratio) + (v2 & 255) * ratio);
  return "#" + [r, g, b].map(x => x.toString(16).padStart(2, "0")).join("");
}

const RAINBOW = "linear-gradient(90deg, #C84B8B, #3B82F6, #06B6D4, #10B981, #84CC16, #F59E0B, #EF4444)";

export default function DiagnosisPage() {
  const router = useRouter();
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [currentSection, setCurrentSection] = useState(0);

  const section = sections[currentSection];
  const totalQuestions = sections.reduce((sum, s) => sum + s.questions.length, 0);
  const answeredTotal = Object.keys(answers).length;
  const progress = Math.round((answeredTotal / totalQuestions) * 100);
  const sectionAnswered = section.questions.every(q => answers[q.id] !== undefined);
  const isLastSection = currentSection === sections.length - 1;

  const handleAnswer = (questionId: number, score: number, reverse?: boolean) => {
    const actual = reverse ? 8 - score : score;
    setAnswers(prev => {
      if (prev[questionId] === actual) {
        const next = { ...prev };
        delete next[questionId];
        return next;
      }
      return { ...prev, [questionId]: actual };
    });
  };

  const handleNext = () => {
    if (isLastSection) {
      const axisScores = sections.map(s =>
        s.questions.reduce((sum, q) => sum + (answers[q.id] || 0), 0)
      );
      const maxScores = sections.map(s => s.questions.length * 7);
      const axisLetters = [["T","S"],["A","G"],["H","L"],["M","P"]];
      const types = axisScores.map((score, i) => (score >= maxScores[i] / 2 ? axisLetters[i][0] : axisLetters[i][1]));
      const pcts = axisScores.map((score, i) => Math.round((score / maxScores[i]) * 100));
        router.push(`/result?type=${types.join("")}&scores=${pcts.join(",")}`);
    } else {
      setCurrentSection(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const getScaleColor = (score: number): string => {
    const ratio = (score - 1) / 6;
    return mixColor(section.color, section.colorEnd, ratio);
  };

  return (
    <main className="min-h-screen px-4 pb-12" style={{ background: "#f8f7ff" }}>
      {/* プログレス（固定） */}
      <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(248,247,255,0.75)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", paddingTop: "12px", paddingBottom: "12px", borderBottom: "1px solid rgba(123,92,246,0.08)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between text-xs text-gray-400 mb-2">
            <span>{section.label}（{currentSection + 1} / {sections.length}）</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-white rounded-full h-1.5 mb-3" style={{ border: "1px solid rgba(123,92,246,0.1)" }}>
            <div className="h-1.5 rounded-full transition-all duration-500"
  style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${section.color}, ${section.colorEnd})` }} />
          </div>
          <div className="flex gap-2 justify-center">
            {sections.map((s, i) => (
              <div key={i} className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                  style={{ background: i < currentSection ? "#7B5CF6" : i === currentSection ? section.color : "rgba(123,92,246,0.15)" }} />
                {i < sections.length - 1 && (
                  <div className="w-8 h-px" style={{ background: i < currentSection ? "#7B5CF6" : "rgba(123,92,246,0.15)" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* セクションタイトル（固定） */}
      <div style={{ position: "sticky", top: "68px", zIndex: 40, paddingTop: "8px", paddingBottom: "8px" }}>
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl p-4 text-center" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)", border: `1px solid ${section.color}30`, boxShadow: `0 2px 12px ${section.color}15` }}>
          <p className="text-xs font-bold tracking-widest mb-0.5" style={{ color: section.color }}>
            軸{section.axis} — {section.sublabel}
          </p>
          <p className="text-lg font-black text-gray-900">{section.label}</p>
        </div>
      </div>
      </div>

      {/* 質問一覧 */}
      <div className="max-w-2xl mx-auto flex flex-col gap-5 mb-10">
        {section.questions.map((q, qi) => {
          const selected = answers[q.id];
          const displayScore = selected !== undefined ? (q.reverse ? 8 - selected : selected) : null;

          return (
            <div key={q.id} className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(123,92,246,0.08)", boxShadow: "0 1px 6px rgba(123,92,246,0.04)" }}>
              <p className="text-base font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full text-white flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${section.color}, ${section.colorEnd})`, fontSize: "11px" }}>
                  {qi + 1}
                </span>
                {q.text}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "72px 1fr 72px", alignItems: "center", gap: "4px" }}>
                <span style={{ fontSize: "12px", color: section.color, textAlign: "center", lineHeight: "1.4", fontWeight: 600, whiteSpace: "nowrap" }}>
                  そう思わない
                </span>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                    {[1, 2, 3, 4, 5, 6, 7].map((score) => {
                      const isSelected = displayScore === score;
                      const color = getScaleColor(score);
                      const size = scaleSizes[score - 1];

                      return (
                        <button
                          key={score}
                          onClick={() => handleAnswer(q.id, score, q.reverse)}
                          style={{
                            width: `${size}px`,
                            height: `${size}px`,
                            borderRadius: "50%",
                            border: "none",
              background: isSelected ? color : `${color}22`,
                            transition: "all 0.2s ease",
                            flexShrink: 0,
                            outline: "none",
                            cursor: "pointer",
                           boxShadow: isSelected ? `0 0 0 5px ${color}44, 0 3px 12px ${color}60` : "none",
                            transform: isSelected ? "scale(1.15)" : "scale(1)",
                          }}
                          onMouseEnter={e => {
                            if (!isSelected) {
                              (e.currentTarget as HTMLButtonElement).style.background = `${color}35`;
                              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1.08)";
                            }
                          }}
                          onMouseLeave={e => {
                            if (!isSelected) {
                              (e.currentTarget as HTMLButtonElement).style.background = `${color}18`;
                              (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                            }
                          }}
                        />
                      );
                    })}
                  </div>
                  <span style={{ fontSize: "11px", color: "#9CA3AF", textAlign: "center" }}>― どちらでもない ―</span>
                </div>
                <span style={{ fontSize: "12px", color: section.colorEnd, textAlign: "center", lineHeight: "1.4", fontWeight: 600, whiteSpace: "nowrap" }}>
                  そう思う
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* ボタン */}
      <div className="max-w-2xl mx-auto">
        <button
          onClick={handleNext}
          disabled={!sectionAnswered}
          className="w-full py-4 rounded-full font-bold text-white text-base transition-all duration-200"
          style={{
            background: sectionAnswered ? `linear-gradient(135deg, ${section.color}, ${section.colorEnd})` : `linear-gradient(135deg, ${section.color}40, ${section.colorEnd}40)`,
            cursor: sectionAnswered ? "pointer" : "not-allowed",
            boxShadow: sectionAnswered ? `0 4px 16px ${section.color}40` : "none",
          }}
        >
          {isLastSection ? "診断結果を見る →" : `次のセクションへ → ${sections[currentSection + 1]?.label}`}
        </button>
        <button
          onClick={() => {
            if (currentSection > 0) { setCurrentSection(prev => prev - 1); window.scrollTo(0, 0); }
            else router.push("/");
          }}
          className="w-full py-3 mt-2 text-sm text-gray-400 hover:text-gray-600 transition"
        >
          {currentSection === 0 ? "← トップに戻る" : "← 前のセクションに戻る"}
        </button>
      </div>
    </main>
  );
}





