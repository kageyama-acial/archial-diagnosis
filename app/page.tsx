import Link from "next/link";

const features = [
  { icon: "👤", title: "あなたの強み・才能", desc: "得意なこと・伸ばすべき価値を発見できます" },
  { icon: "📈", title: "活躍しやすい役割", desc: "チームや組織の中であなたが輝く役割が見えます" },
  { icon: "🤝", title: "チームでの立ち位置", desc: "どんなポジションで力を発揮しやすいかがわかります" },
  { icon: "💜", title: "相性の良いタイプ", desc: "一緒に働くと強みを引き出し合えるタイプがわかります" },
  { icon: "🌐", title: "キャリアのヒント", desc: "あなたらしいキャリアの方向性や可能性を見つけられます" },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="w-full border-b border-white/20 sticky top-0 z-50"
        style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <img src="/logo.png" alt="AcialDesign" style={{height:"32px", width:"auto"}} />
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <Link href="#features" className="hover:text-purple-600 transition">診断の流れ</Link>
            <Link href="#types" className="hover:text-purple-600 transition">16のタイプ</Link>
            <Link href="#about" className="hover:text-purple-600 transition">特徴・活かし方</Link>
            <Link href="#faq" className="hover:text-purple-600 transition">よくある質問</Link>
          </nav>
          <Link href="/diagnosis" className="px-6 py-2 rounded-full text-sm font-bold text-white hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #7B5CF6, #C84B8B)" }}>
            無料で診断をはじめる →
          </Link>
        </div>
      </header>

      {/* ヒーロー */}
      <section style={{
        backgroundImage: "url('/hero.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        position: "relative",
      }}>
        {/* 上部：テキスト読みやすくする白フェード */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(to bottom, rgba(255,255,255,0.75) 0%, rgba(255,255,255,0.3) 25%, rgba(255,255,255,0) 45%)"
        }} />
        {/* テキスト・ボタン */}
        <div className="relative z-10 flex flex-col items-center px-4 pt-10">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-3 text-center drop-shadow-sm">
            あなたのビジネスアスリート適性を見つけよう！
          </h1>
          <p className="text-gray-700 text-lg mb-6 font-medium text-center drop-shadow-sm">
            16のキャラクターから、あなたの強み・才能・活躍スタイルがわかる
          </p>
          <Link href="/diagnosis"
            className="inline-block px-12 py-4 rounded-full text-xl font-bold text-white hover:opacity-90 transition shadow-lg mb-2"
            style={{ background: "linear-gradient(135deg, #7B5CF6, #C84B8B)" }}>
            無料で診断スタート →
          </Link>
          <p className="text-gray-600 text-sm">所要時間：約3分</p>
        </div>
      </section>

      {/* 下セクション */}
      <section id="features" className="w-full py-12 px-4"
        style={{ background: "linear-gradient(135deg, #f0f4ff 0%, #faf0ff 100%)" }}>
        <div className="max-w-5xl mx-auto rounded-3xl p-8 mb-6"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow: "0 8px 32px rgba(123,92,246,0.08)",
          }}>
          <h2 className="text-center text-xl font-black text-gray-900 mb-8">診断でわかること</h2>
          <div className="grid grid-cols-5 gap-4">
            {features.map((f) => (
              <div key={f.title} className="flex flex-col items-center text-center p-4 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.7)" }}>
                <div className="text-3xl mb-2">{f.icon}</div>
                <p className="font-bold text-sm text-[#7B5CF6] mb-1">{f.title}</p>
                <p className="text-gray-600 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-2xl mx-auto rounded-3xl p-8 text-center"
          style={{
            background: "rgba(255,255,255,0.6)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.8)",
            boxShadow: "0 8px 32px rgba(123,92,246,0.08)",
          }}>
          <p className="text-2xl font-black text-gray-900 mb-2">さあ、あなたの強みを見つけよう！</p>
          <p className="text-gray-600 text-sm mb-6">簡単な質問に答えるだけで、あなたのビジネスアスリートタイプがわかります。</p>
          <Link href="/diagnosis"
            className="inline-block px-12 py-4 rounded-full text-lg font-bold text-white hover:opacity-90 transition shadow-md"
            style={{ background: "linear-gradient(135deg, #7B5CF6, #C84B8B)" }}>
            無料で診断スタート →
          </Link>
          <p className="text-gray-400 text-xs mt-2">所要時間：約3分</p>
        </div>
      </section>

      <footer className="py-6 text-gray-500 text-sm text-center border-t border-gray-100 bg-white">
        © 2024 株式会社アーシャルデザイン
      </footer>
    </div>
  );
}



