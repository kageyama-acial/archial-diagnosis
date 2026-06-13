import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F0E1A] text-white flex flex-col items-center">
      {/* Hero Section */}
      <div className="w-full relative">
        <div className="w-full max-w-5xl mx-auto px-4 pt-8">
          <Image
            src="/top-hero.png"
            alt="SportsForce 16タイプ診断"
            width={1200}
            height={630}
            className="w-full rounded-2xl"
            priority
          />
        </div>
      </div>

      {/* CTA Section */}
      <div className="flex flex-col items-center gap-6 py-12 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold">
          あなたの<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#7B5CF6] to-[#C84B8B]">エンジニア適性</span>を診断しよう
        </h1>
        <p className="text-gray-400 max-w-xl text-lg">
          スポーツ経験者3,000名以上のデータから生まれた<br />
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

      {/* Footer */}
      <footer className="mt-auto py-6 text-gray-600 text-sm">
        © 2024 株式会社アーシャルデザイン
      </footer>
    </main>
  );
}