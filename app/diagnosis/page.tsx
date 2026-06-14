"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const questions = [
  { id: 1, axis: 1, text: "繝√・繝縺ｧ逶ｮ讓吶↓蜷代°縺・→縺阪∽ｸ莠ｺ縺ｮ縺ｨ縺阪ｈ繧雁鴨縺梧ｹｧ縺・※縺上ｋ" },
  { id: 2, axis: 1, text: "莉ｲ髢薙′鬆大ｼｵ縺｣縺ｦ縺・ｋ蟋ｿ繧定ｦ九ｋ縺ｨ縲∬・蛻・ｂ繧・ｋ豌励′荳翫′繧・ },
  { id: 3, axis: 1, text: "隱ｰ縺九→荳邱偵↓蜿悶ｊ邨・・譁ｹ縺後∵・譫懊′蜃ｺ繧・☆縺・→諢溘§繧・ },
  { id: 4, axis: 1, text: "繝√・繝縺ｮ髮ｰ蝗ｲ豌励′閾ｪ蛻・・繝代ヵ繧ｩ繝ｼ繝槭Φ繧ｹ縺ｫ螟ｧ縺阪￥蠖ｱ髻ｿ縺吶ｋ" },
  { id: 5, axis: 1, text: "莉ｲ髢薙→蝟懊・繧貞・縺九■蜷医≧縺薙→縺後∽ｻ穂ｺ九・繝｢繝√・繝ｼ繧ｷ繝ｧ繝ｳ縺ｫ縺ｪ繧・ },
  { id: 6, axis: 2, text: "譁ｰ縺励＞縺薙→縺ｫ謖第姶縺励∬・繧蛾％繧貞・繧頑挙縺上％縺ｨ縺ｫ繧・ｊ縺後＞繧呈─縺倥ｋ" },
  { id: 7, axis: 2, text: "迴ｾ迥ｶ縺ｫ貅雜ｳ縺帙★縲√ｈ繧願憶縺・婿豕輔ｒ謗｢縺励※蜍輔￥縺薙→縺悟･ｽ縺阪□" },
  { id: 8, axis: 2, text: "隱ｰ繧ゅｄ縺｣縺ｦ縺・↑縺・％縺ｨ縺ｫ蜿悶ｊ邨・・縺ｨ縺阪√Ρ繧ｯ繝ｯ繧ｯ縺吶ｋ" },
  { id: 9, axis: 2, text: "隱ｲ鬘後′縺ゅｌ縺ｰ縲∬・蛻・°繧牙虚縺・※隗｣豎ｺ縺励ｈ縺・→縺吶ｋ" },
  { id: 10, axis: 2, text: "繝√Ε繝ｬ繝ｳ繧ｸ縺吶ｋ縺薙→繧医ｊ縲∫｢ｺ螳溘↓謌先棡繧貞・縺吶％縺ｨ繧帝㍾隕悶☆繧・, reverse: true },
  { id: 11, axis: 3, text: "陦悟虚縺吶ｋ蜑阪↓縲∝・菴薙・險育判繧堤ｫ九※縺ｦ縺九ｉ蜍輔″縺溘＞" },
  { id: 12, axis: 3, text: "繧ｴ繝ｼ繝ｫ縺九ｉ騾・ｮ励＠縺ｦ縲∵ｮｵ蜿悶ｊ繧堤ｵ・・縺薙→縺悟ｾ玲э縺" },
  { id: 13, axis: 3, text: "隕矩壹＠縺檎ｫ九▲縺ｦ縺九ｉ蜍輔￥譁ｹ縺後∝鴨繧堤匱謠ｮ縺ｧ縺阪ｋ" },
  { id: 14, axis: 3, text: "陦後″蠖薙◆繧翫・縺｣縺溘ｊ繧医ｊ縲∵ｺ門ｙ縺励※縺九ｉ閾ｨ繧譁ｹ縺悟･ｽ縺阪□" },
  { id: 15, axis: 3, text: "閠・∴繧九ｈ繧雁・縺ｫ蜍輔＞縺ｦ縺励∪縺・％縺ｨ縺悟､壹＞", reverse: true },
  { id: 16, axis: 4, text: "縲後％繧後□・√阪→縺・≧逶ｴ諢溘ｄ辭ｱ驥上〒蜍輔￥縺薙→縺悟､壹＞" },
  { id: 17, axis: 4, text: "逅・ｱ医ｈ繧翫∬・蛻・′繝ｯ繧ｯ繝ｯ繧ｯ縺吶ｋ縺九←縺・°縺ｧ蛻､譁ｭ縺吶ｋ縺薙→縺悟､壹＞" },
  { id: 18, axis: 4, text: "諢滓ュ縺悟虚縺・◆縺ｨ縺阪∽ｸ逡ｪ蜉帙′蜃ｺ繧九→諢溘§繧・ },
  { id: 19, axis: 4, text: "諠・ｱ繧呈紛逅・＠縺ｦ縺九ｉ蜍輔￥繧医ｊ縲√∪縺壽─縺倥※縺九ｉ閠・∴繧九ち繧､繝励□" },
  { id: 20, axis: 4, text: "繝・・繧ｿ繧・ｹ諡縺梧純縺｣縺ｦ縺九ｉ蜍輔￥譁ｹ縺悟ｮ牙ｿ・☆繧・, reverse: true },
];

const labels = ["蜈ｨ縺丞ｽ薙※縺ｯ縺ｾ繧峨↑縺・, "縺ゅ∪繧雁ｽ薙※縺ｯ縺ｾ繧峨↑縺・, "縺ｩ縺｡繧峨〒繧ゅ↑縺・, "繧・ｄ蠖薙※縺ｯ縺ｾ繧・, "縺ｨ縺ｦ繧ょｽ薙※縺ｯ縺ｾ繧・];

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

  return (
    <main className="min-h-screen bg-[#0F0E1A] text-white flex flex-col items-center justify-center px-4 py-12">
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
          {["蜉帙・貅先ｳ・, "繝輔ぅ繝ｼ繝ｫ繝峨〒縺ｮ蠖ｹ蜑ｲ", "繝励Ξ繝ｼ繧ｹ繧ｿ繧､繝ｫ", "蛻､譁ｭ縺ｮ繧医ｊ縺ｩ縺薙ｍ"][q.axis - 1]}
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
          <button onClick={handleBack} className="mt-10 text-gray-500 hover:text-gray-300 transition text-sm">← トップに戻る/前の質問</button>
    </main>
  );
}

