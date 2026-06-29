"use client";
import Link from "next/link";
import Image from "next/image";

// scores順: [チーム型%, 攻撃型%, 本能型%(H=75/L=25), 行動型%(M=75/P=25)]
// 例: TALM = T75, A75, L=思考型→本能型25%, M=行動型75%
const types = [
  { code: "TAHM", scores: "75,75,75,75", name: "天性のゲームメーカー",     catch: "仲間と共に、誰も見たことのない景色へ。",              img: "/char-basketball.png", grad: ["#ef4444","#f97316"] },
  { code: "TALM", scores: "75,75,25,75", name: "閃光のスパイカー",          catch: "仲間と分析し、素早く仕留める。",                   img: "/char-volleyball.png", grad: ["#1d4ed8","#818cf8"] },
  { code: "TAHP", scores: "75,75,75,25", name: "気迫のフランカー",          catch: "燃える心と緻密な戦略で、チームを制圧する。",           img: "/char-rugby.png",      grad: ["#dc2626","#ec4899"] },
  { code: "TALP", scores: "75,75,25,25", name: "頭脳派アタッカー",         catch: "精緻な設計で、確実に仕留める。",                   img: "/char-lacrosse.png",   grad: ["#3b82f6","#06b6d4"] },
  { code: "TGHM", scores: "75,25,75,75", name: "縁の下のラインバッカー",       catch: "縁の下から、チームの可能性を最大化する。",              img: "/char-football.png",   grad: ["#22c55e","#14b8a6"] },
  { code: "TGLM", scores: "75,25,25,75", name: "冷静な鉄壁キーパー",       catch: "読んで、動いて、最後の砦を守り抜く。",               img: "/char-handball.png",   grad: ["#8b5cf6","#6366f1"] },
  { code: "TGHP", scores: "75,25,75,25", name: "本能のボランチ",       catch: "熱く燃えながら、戦略でチームを動かし続ける。",          img: "/char-soccer.png",     grad: ["#f97316","#ef4444"] },
  { code: "TGLP", scores: "75,25,25,25", name: "知将のキャッチャー",       catch: "データと信頼で、チームを守り抜く。",                 img: "/char-baseball.png",   grad: ["#2563eb","#3b82f6"] },
  { code: "SAHM", scores: "25,75,75,75", name: "無双のハンター",           catch: "己の本能を解き放ち、頂点を狙う。",                 img: "/char-archery.png",    grad: ["#b45309","#f59e0b"] },
  { code: "SALM", scores: "25,75,25,75", name: "疾風のスプリンター",        catch: "論理で磨いた速さで、誰よりも先へ。",               img: "/char-sprint.png",     grad: ["#6b7280","#374151"] },
  { code: "SAHP", scores: "25,75,75,25", name: "天才型ストローカー",  catch: "直感と戦略が、最強の一打を生む。",                 img: "/char-tennis.png",     grad: ["#0f766e","#2dd4bf"] },
  { code: "SALP", scores: "25,75,25,25", name: "型破りのスケーター",   catch: "ルールを超えた先に、真の自由がある。",                img: "/char-skateboard.png", grad: ["#c2410c","#fb923c"] },
  { code: "SGHM", scores: "25,25,75,75", name: "情熱のスイマー",         catch: "誰も見えない闘志で、自分の記録を塗り替える。",          img: "/char-swimming.png",   grad: ["#be123c","#f43f5e"] },
  { code: "SGLM", scores: "25,25,25,75", name: "理想追求のパフォーマー",   catch: "完璧を追い求める孤高の芸術家。",                    img: "/char-gymnastics.png", grad: ["#4f46e5","#3b82f6"] },
  { code: "SGHP", scores: "25,25,75,25", name: "感性で漕ぐパドラー", catch: "直感と計画で、誰も走らない川を進む。",               img: "/char-canoe.png",      grad: ["#1e3a5f","#3b82f6"] },
  { code: "SGLP", scores: "25,25,25,25", name: "孤高のクライマー",          catch: "一歩一歩、確かな足跡を刻んでいく。",                img: "/char-climbing.png",   grad: ["#64748b","#334155"] },
];

function PolygonBg({ colors }: { colors: [string, string] }) {
  const id = colors[0].replace("#", "");
  return (
    <svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 w-full h-full">
      <defs>
        <linearGradient id={`g${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={colors[0]} />
          <stop offset="100%" stopColor={colors[1]} />
        </linearGradient>
      </defs>
      <rect width="200" height="140" fill={`url(#g${id})`} />
      <polygon points="0,0 90,0 40,60"       fill="rgba(255,255,255,0.07)" />
      <polygon points="200,0 120,0 200,80"   fill="rgba(255,255,255,0.07)" />
      <polygon points="0,140 60,140 0,70"    fill="rgba(255,255,255,0.06)" />
      <polygon points="200,140 100,140 160,60" fill="rgba(255,255,255,0.09)" />
      <polygon points="60,0 140,0 100,50"    fill="rgba(255,255,255,0.05)" />
      <polygon points="30,140 100,90 170,140" fill="rgba(255,255,255,0.06)" />
      <polygon points="0,40 50,100 0,100"    fill="rgba(0,0,0,0.04)" />
      <polygon points="200,40 150,100 200,100" fill="rgba(0,0,0,0.04)" />
    </svg>
  );
}

export default function TypesPage() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>

      {/* ── ヘッダー ── */}
      <header className="w-full border-b border-gray-100 sticky top-0 z-50"
        style={{ background: "rgba(255,255,255,0.88)", backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)" }}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <img src="/logo.png" alt="AcialDesign" style={{ height: "28px", width: "auto" }} />
          </Link>
          <Link href="/diagnosis"
            className="px-4 md:px-6 py-2 rounded-full text-xs md:text-sm font-bold text-white hover:opacity-90 transition"
            style={{ background: "linear-gradient(135deg, #7B5CF6, #C84B8B)" }}>
            無料で診断をはじめる →
          </Link>
        </div>
      </header>

      {/* ── タイトル ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-12 pb-8">
        <p className="text-xs font-bold tracking-widest text-purple-500 uppercase mb-3">
          Business Athlete Types
        </p>
        <h1 className="font-black text-gray-900 mb-3"
          style={{
            fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
            fontFamily: "'游ゴシック','Yu Gothic','YuGothic','Noto Sans JP',sans-serif",
            letterSpacing: "-0.01em",
            lineHeight: 1.15,
          }}>
          16のビジネスアスリート<br className="md:hidden" />タイプ一覧
        </h1>
        <div className="w-12 h-0.5 bg-gray-900 mb-4" />
        <p className="text-gray-500 text-sm max-w-md">
          あなたはどのタイプ？タイプをクリックして詳細を確認しよう。
        </p>
      </div>

      {/* ── グリッド ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
          {types.map((t) => (
            <Link
              key={t.code}
              href={`/result?type=${t.code}&scores=${t.scores}`}
              className="group rounded-xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 bg-white"
            >
              {/* ポリゴン背景＋キャラ */}
              <div className="relative overflow-hidden" style={{ height: "145px" }}>
                <PolygonBg colors={[t.grad[0], t.grad[1]]} />
                <div className="absolute inset-0 flex items-end justify-center pb-1">
                  <Image
                    src={t.img}
                    alt={t.name}
                    width={105}
                    height={122}
                    className="object-contain relative z-10 group-hover:scale-105 transition-transform duration-300"
                    style={{ maxHeight: "122px", width: "auto", filter: "drop-shadow(0 3px 10px rgba(0,0,0,0.25))" }}
                  />
                </div>
              </div>

              {/* テキストエリア */}
              <div className="px-3 pt-2.5 pb-3 bg-white">
                <p className="text-xs font-black tracking-widest mb-0.5"
                  style={{ color: t.grad[0], fontFamily: "monospace" }}>
                  {t.code}
                </p>
                <p className="font-black text-gray-900 leading-snug mb-1"
                  style={{
                    fontSize: "0.83rem",
                    fontFamily: "'游ゴシック','Yu Gothic','YuGothic',sans-serif",
                  }}>
                  {t.name}
                </p>
                <p className="text-gray-400 leading-relaxed" style={{ fontSize: "0.68rem" }}>
                  {t.catch}
                </p>
              </div>

              {/* カラーボトムライン */}
              <div className="h-[3px]"
                style={{ background: `linear-gradient(to right, ${t.grad[0]}, ${t.grad[1]})` }} />
            </Link>
          ))}
        </div>
      </div>

      {/* ── CTA フッター ── */}
      <div className="border-t border-gray-100 bg-gray-50 py-14 text-center">
        <p className="text-gray-500 text-sm mb-5">あなたはどのタイプに当てはまる？</p>
        <Link href="/diagnosis"
          className="inline-block px-8 py-3 rounded-full text-sm font-bold text-white hover:opacity-90 transition"
          style={{ background: "linear-gradient(135deg, #7B5CF6, #C84B8B)" }}>
          無料で診断をはじめる →
        </Link>
      </div>
    </div>
  );
}
