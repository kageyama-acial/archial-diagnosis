import Link from "next/link";
import Image from "next/image";

const types = [
  { code: "AAAA", name: "熱血司令塔", sport: "バスケットボール" },
  { code: "AAAB", name: "戦略キャプテン", sport: "バレーボール" },
  { code: "AABA", name: "炎のストライカー", sport: "ラグビー" },
  { code: "AABB", name: "冷静エース", sport: "ラクロス" },
  { code: "ABAA", name: "熱血参謀", sport: "ソフトボール" },
  { code: "ABAB", name: "鉄壁プレイン", sport: "ハンドボール" },
  { code: "ABBA", name: "緑の下の熱狂者", sport: "陸上（短距離）" },
  { code: "ABBB", name: "堅守サポーター", sport: "野球" },
  { code: "BAAA", name: "孤高のビジョナリー", sport: "アーチェリー" },
  { code: "BAAB", name: "独立戦略家", sport: "サッカー" },
  { code: "BABA", name: "直感クリエイター", sport: "テニス" },
  { code: "BABB", name: "鋭利なイノベーター", sport: "スケートボード" },
  { code: "BBAA", name: "静かな守護者", sport: "水泳" },
  { code: "BBAB", name: "精密設計者", sport: "体操" },
  { code: "BBBA", name: "職人気質の探求者", sport: "カヌー" },
  { code: "BBBB", name: "孤高の職人", sport: "クライミング" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F0E1A] text-white flex flex-col">
      {/* Hero Image 全画面 */}
      <div className="w-full">
        <Image
          src="/top-hero.png"
          alt="ビジネスアスリート診断"
          width={1920}
          height={1080}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* CTA Section */}
      <div className="flex flex-col items-center gap-6 py-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          あなたの<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B5CF6] to-[#C84B8B]">ビジネスアスリート適性</span>を診断しよう
        </h1>
        <p className="text-gray-400 max-w-xl text-lg">
          スポーツ経験者5,000名以上のデータから生まれた<br />
          アーシャルデザイン独自の16タイプ診断
        </p>
        <Link
          href="/diagnosis"
          className="mt-4 px-10 py-4 rounded-full text-xl font-bold bg-gradient-to-r from-[#7B5CF6] to-[#C84B8B] hover:opacity-90 transition"
        >
          診断スタート →
        </Link>
        <p className="text-gray-500 text-sm">所要時間：約3分 / 全20問</p>
      </div>

      {/* 16タイプ一覧 */}
      <div className="w-full max-w-5xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-center mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B5CF6] to-[#C84B8B]">16タイプ</span>のキャラクターから探す
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {types.map((type) => (
            <Link
              key={type.code}
              href={`/result?type=${type.code}`}
              className="bg-[#1A1830] rounded-xl p-4 text-center hover:bg-[#2A2050] hover:border-purple-500 border border-gray-800 transition group"
            >
              <Image
                src={`/char-${type.sport === "バスケットボール" ? "basketball" : type.sport === "バレーボール" ? "volleyball" : type.sport === "ラグビー" ? "rugby" : type.sport === "ラクロス" ? "lacrosse" : type.sport === "ソフトボール" ? "softball" : type.sport === "ハンドボール" ? "handball" : type.sport === "陸上（短距離）" ? "sprint" : type.sport === "野球" ? "baseball" : type.sport === "アーチェリー" ? "archery" : type.sport === "サッカー" ? "soccer" : type.sport === "テニス" ? "tennis" : type.sport === "スケートボード" ? "skateboard" : type.sport === "水泳" ? "swimming" : type.sport === "体操" ? "gymnastics" : type.sport === "カヌー" ? "canoe" : "climbing"}.png`}
                alt={type.name}
                width={120}
                height={120}
                className="mx-auto mb-3 group-hover:scale-110 transition-transform duration-200"
              />
              <p className="font-bold text-sm mb-1">{type.name}</p>
              <p className="text-gray-500 text-xs">{type.sport}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto py-6 text-gray-600 text-sm text-center">
        © 2024 株式会社アーシャルデザイン
      </footer>
    </main>
  );
}