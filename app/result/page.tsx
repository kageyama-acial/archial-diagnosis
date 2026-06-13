"use client";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

const typeData: { [key: string]: { name: string; catch: string; desc: string; color: string; sport: string } } = {
  AAAA: { name: "熱血司令塔", catch: "仲間と燃えて、前線を切り拓く情熱のリーダー", desc: "チームの熱量を最大化しながら、誰も踏み込んでいない領域へ果敢に挑む。直感と行動力で場を動かす、天性のキャプテンタイプ。", color: "from-red-500 to-orange-500", sport: "バスケットボール" },
  AAAB: { name: "戦略キャプテン", catch: "仲間と燃えて、緻密な設計で勝ちに行く", desc: "チームワークを武器に、論理的な戦略で突破口を開く。熱量と計画性を兼ね備えた、信頼されるリーダー。", color: "from-orange-500 to-yellow-500", sport: "バレーボール" },
  AABA: { name: "炎のストライカー", catch: "仲間と共に、感性で突き進む攻撃型", desc: "チームの一体感を力に変え、直感と情熱で最前線を駆け抜ける。勢いと熱量で周囲を巻き込む突破力の持ち主。", color: "from-red-600 to-pink-500", sport: "ラグビー" },
  AABB: { name: "冷静エース", catch: "仲間と燃えながら、データで仕留める", desc: "チームプレイヤーでありながら、冷静な分析力で勝負どころを見極める。熱さと知性が融合した、頼れるエース。", color: "from-blue-500 to-cyan-400", sport: "ラクロス" },
  ABAA: { name: "熱血参謀", catch: "仲間と共に守り、感性で道を切り拓く", desc: "チームを守ることに誇りを持ちながら、直感的なアイデアで新たな可能性を切り開く。縁の下の力持ちでありながら、突破口を生み出す存在。", color: "from-green-500 to-teal-500", sport: "ソフトボール" },
  ABAB: { name: "鉄壁プレイン", catch: "仲間と守り抜き、戦略で組織を支える", desc: "チームの安定を最優先に、緻密な設計でリスクを排除する。信頼と安心感を生み出す、組織の要。", color: "from-purple-600 to-indigo-500", sport: "ハンドボール" },
  ABBA: { name: "緑の下の熱狂者", catch: "仲間と支え合い、感性で輝く縁の下", desc: "表舞台より仲間のサポートに徹しながら、熱量で場の空気を変える。献身と情熱を兼ね備えた、チームの心臓。", color: "from-orange-400 to-red-400", sport: "陸上（短距離）" },
  ABBB: { name: "堅守サポーター", catch: "仲間を守り、データで最適解を出す", desc: "チームメンバーを支えることに徹し、論理的な判断で最善策を提供する。安定感と信頼性の権化。", color: "from-blue-600 to-blue-400", sport: "野球" },
  BAAA: { name: "孤高のビジョナリー", catch: "一人で極め、感性で未来を切り拓く", desc: "独自の視点と直感で誰も見ていない可能性を発見する。孤独を恐れず、自分の信念で世界を変えようとする革新者。", color: "from-green-600 to-emerald-400", sport: "アーチェリー" },
  BAAB: { name: "独立戦略家", catch: "一人で極め、論理で勝負する", desc: "独立独歩で深く研究し、データと論理で最適解を導き出す。一人でも圧倒的な成果を出せる、孤高の専門家。", color: "from-gray-500 to-slate-400", sport: "アメリカンフットボール" },
  BABA: { name: "直感クリエイター", catch: "一人で極め、感性で守り育てる", desc: "独自の感性と直感で、人や物事を丁寧に育て上げる。派手さはなくとも、確かな価値を生み出すクリエイター。", color: "from-pink-500 to-rose-400", sport: "テニス" },
  BABB: { name: "鋭利なイノベーター", catch: "一人で極め、論理で新しい価値を創る", desc: "独自の専門性と論理的思考で、既存の枠を壊す新しい価値を生み出す。静かに、しかし確実に世界を変えていく。", color: "from-violet-500 to-purple-400", sport: "スケートボード" },
  BBAA: { name: "静かな守護者", catch: "一人で守り抜き、感性で支える", desc: "目立つことなく、ひたすら誠実に守り続ける。直感と献身で、大切なものを静かに守り抜く信頼の存在。", color: "from-teal-500 to-green-400", sport: "水泳" },
  BBAB: { name: "精密設計者", catch: "一人で守り、論理で完璧を追求する", desc: "緻密な計画と論理的思考で、ミスゼロの仕事をやり遂げる。完璧主義と専門性が融合した、静かなプロフェッショナル。", color: "from-indigo-500 to-blue-400", sport: "体操（体操競技）" },
  BBBA: { name: "職人気質の探求者", catch: "一人で深め、感性で本質に迫る", desc: "自分のペースで深く探求し、直感で本質を掴み取る。誰よりも深く、誰よりも純粋に、自分の道を極める職人。", color: "from-amber-500 to-orange-400", sport: "カヌー" },
  BBBB: { name: "孤高の職人", catch: "一人で極め、論理で本質を究める", desc: "孤独な環境で最も力を発揮し、データと論理で真理を追い求める。静寂の中で輝く、究極の専門家。", color: "from-slate-500 to-gray-400", sport: "クライミング" },
};

function ResultContent() {
  const searchParams = useSearchParams();
  const typeCode = searchParams.get("type") || "AAAA";
  const type = typeData[typeCode] || typeData["AAAA"];

  return (
    <main className="min-h-screen bg-[#0F0E1A] text-white flex flex-col items-center justify-center px-4 py-16">
      <p className="text-purple-400 text-sm tracking-widest mb-4">診断結果</p>
      <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${type.color} flex items-center justify-center mb-6 text-5xl`}>
        🏅
      </div>
      <h1 className={`text-4xl md:text-5xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r ${type.color}`}>
        {type.name}
      </h1>
      <p className="text-gray-300 text-lg mb-2">{type.sport}</p>
      <p className="text-xl text-gray-200 mb-6 text-center max-w-lg">{type.catch}</p>
      <div className="bg-[#1A1830] rounded-2xl p-8 max-w-lg text-center mb-10">
        <p className="text-gray-300 leading-relaxed">{type.desc}</p>
      </div>
      <div className="flex gap-4 flex-wrap justify-center">
        <Link href="/" className="px-8 py-3 rounded-full border border-gray-600 hover:border-purple-500 transition text-gray-300 hover:text-white">
          トップに戻る
        </Link>
        <Link href="/diagnosis" className="px-8 py-3 rounded-full bg-gradient-to-r from-[#7B5CF6] to-[#C84B8B] hover:opacity-90 transition font-bold">
          もう一度診断する
        </Link>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0F0E1A] text-white flex items-center justify-center">読み込み中...</div>}>
      <ResultContent />
    </Suspense>
  );
}