"use client";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Suspense, useState } from "react";

const typeAxes: { [k: string]: number[] } = {
  TAMH:[1,1,1,1],TAML:[1,1,1,0],TAPH:[1,1,0,1],TAPL:[1,1,0,0],
  TGMH:[1,0,1,1],TGML:[1,0,1,0],TGPH:[1,0,0,1],TGPL:[1,0,0,0],
  SAMH:[0,1,1,1],SAML:[0,1,1,0],SAPH:[0,1,0,1],SAPL:[0,1,0,0],
  SGMH:[0,0,1,1],SGML:[0,0,1,0],SGPH:[0,0,0,1],SGPL:[0,0,0,0],
};
const weights = [3,1,1,3];

function calcScore(a: string, b: string): number {
  if (a === b) return -1;
  let s = 0;
  for (let i = 0; i < 4; i++) {
    if (typeAxes[a][i] === typeAxes[b][i]) s += weights[i];
  }
  return s;
}

function toHearts(s: number): number {
  if (s === -1) return 4;
  if (s >= 7) return 5;
  if (s >= 5) return 4;
  if (s >= 3) return 3;
  if (s >= 1) return 2;
  return 0;
}

const compatibilityComments: { [key: string]: { reason: string } } = {
  "TAMH-TAPH": { reason: "同じ熱量とチーム愛を持ちながら、直感と戦略が噛み合う最高の相棒。お互いの動き方が自然と連動します。" },
  "TAMH-TGMH": { reason: "あなたが前に出て引っ張り、相手が内側を固める黄金の役割分担。2人がいるとチームが最強になります。" },
  "TAML-TAMH": { reason: "熱量と論理が融合した最強コンビ。あなたの戦略に相手の熱量が乗ると、チームが一気に動き出します。" },
  "TAML-TAPL": { reason: "論理という共通言語を持ちながら、チーム愛で根本がつながる。意思決定の場面で特に息が合います。" },
  "TAML-TGML": { reason: "緻密な設計力同士が響き合い、チームの安定を共に作り上げる。信頼し合える戦略パートナーです。" },
  "TAML-SAML": { reason: "論理と戦略という核が一致。チームか個人かの違いを超えて、共通のゴールに向かって動けます。" },
  "TAPH-TAMH": { reason: "直感と戦略、熱量同士が高め合う関係。一緒にいるだけでチーム全体の温度が上がります。" },
  "TAPH-TAPL": { reason: "チームへの愛と攻めの姿勢が共通。判断スタイルの違いが補完関係となり、バランスが生まれます。" },
  "TAPH-TGPH": { reason: "仲間を大切にする価値観が根本で一致。直感同士が共鳴し、場の空気を一緒に作れます。" },
  "TAPH-SAPH": { reason: "直感と心で動くという核が完全一致。Team/Soloの違いが新鮮な視点をもたらします。" },
  "TAPL-TAML": { reason: "論理という共通言語を持ち、チームへの貢献意識も共通。安定した信頼関係を築けます。" },
  "TAPL-TAPH": { reason: "チームと攻めへの情熱が共通。Heart/Logicの違いが互いの判断に深みをもたらします。" },
  "TAPL-TGPL": { reason: "論理と守りの共通点を持ち、チームをデータで支え合える頼れるパートナーです。" },
  "TAPL-SAPL": { reason: "論理と攻めの姿勢が一致。Team/Soloの違いが補完となり、多角的な視点が生まれます。" },
  "TGMH-TAMH": { reason: "あなたが内側を支え、相手が外に打って出る理想的な分業。2人でチームを内外から強くします。" },
  "TGMH-TGML": { reason: "チームと守りへの使命感が共通。戦略設計を共に担えるチームの土台役同士です。" },
  "TGMH-TGPH": { reason: "チームを守るという価値観が根本で一致。Heart同士の共鳴がチームの温かさを作ります。" },
  "TGMH-SGMH": { reason: "守りと戦略という核が共通。Team/Soloの違いが視野の広がりをもたらします。" },
  "TGML-TAML": { reason: "緻密さと論理が共鳴する戦略コンビ。チームの基盤を共に固める最高のパートナーです。" },
  "TGML-TGMH": { reason: "チームと守りへの献身が共通。戦略的思考同士で組織の安定を共に設計できます。" },
  "TGML-TGPL": { reason: "チームを守り論理で動く価値観が一致。緻密な設計力を持ち寄り組織の精度を上げます。" },
  "TGML-SGML": { reason: "論理と守りという核が共通。Team/Soloの違いが視点の補完関係を生みます。" },
  "TGPH-TAPH": { reason: "仲間への愛と直感という根本が共通。場の空気を共に読みながらチームを内側から温めます。" },
  "TGPH-TGMH": { reason: "チームと守りへの使命感が一致。HeartとStrategyの違いが良い化学反応を生みます。" },
  "TGPH-TGPL": { reason: "チームを守ることへの誇りが共通。直感と論理の違いが補完となり、判断の幅が広がります。" },
  "TGPH-SGPH": { reason: "守りと直感が共通の核。Team/Soloの違いを超えて、本質を大切にする姿勢が共鳴します。" },
  "TGPL-TAPL": { reason: "論理と守りへの徹底が共通。チームへの貢献度を数字で担保し合える信頼関係です。" },
  "TGPL-TGML": { reason: "チームを守り論理で動く価値観が完全に近い一致。組織の精度を共に高められます。" },
  "TGPL-TGPH": { reason: "チームと守りという根本が共通。判断スタイルの違いが豊かな意思決定を生みます。" },
  "TGPL-SGPL": { reason: "守りと論理という核が共通。Team/Soloの違いが視野の補完となります。" },
  "SAMH-SAML": { reason: "自律的に動く姿勢と攻めへの意欲が共通。Heart/Logicの違いが判断に深みをもたらします。" },
  "SAMH-SAPH": { reason: "Solo×Attackという根本が一致。直感と戦略の違いが互いの可能性を広げます。" },
  "SAMH-SGMH": { reason: "自律心と守り固める堅実さが補完し合う関係。Strategy×Heartが共鳴します。" },
  "SAMH-TAMH": { reason: "Heart×Strategyという価値観の核が一致。Team/Soloの違いが新鮮な視点を生みます。" },
  "SAML-SAMH": { reason: "自律的に深く追求する姿勢が共通。HeartとLogicの違いが判断に幅をもたらします。" },
  "SAML-SAPL": { reason: "Solo×Attackと論理という核が共通。守りと攻めの違いが役割を自然に分担します。" },
  "SAML-SGML": { reason: "論理と戦略という共通言語で動ける関係。Solo同士の自律性が互いを尊重し合います。" },
  "SAML-TAML": { reason: "論理と戦略が完全一致。Team/Soloの違いを超えて、共通のゴールに向かえます。" },
  "SAPH-SAMH": { reason: "Solo×AttackとHeartが共通。直感同士が共鳴し、お互いの感性を高め合えます。" },
  "SAPH-SAPL": { reason: "Solo×Attackという根本が一致。Heart/Logicの違いが補完的な判断力を生みます。" },
  "SAPH-SGPH": { reason: "Soloと直感という核が共通。Attack/Guardの違いが役割の自然な分担につながります。" },
  "SAPH-TAPH": { reason: "直感とHeartという根本価値観が一致。Team/Soloの違いが新しい視点をもたらします。" },
  "SAPL-SAML": { reason: "Solo×Attackと論理が共通。直感と戦略の違いが互いの思考を豊かにします。" },
  "SAPL-SAPH": { reason: "Solo×Attackという核が共通。Heart/Logicの違いが判断の幅を広げます。" },
  "SAPL-SGPL": { reason: "Soloと論理という価値観の根本が一致。Attack/Guardの役割の違いが補完となります。" },
  "SAPL-TAPL": { reason: "論理と攻めの姿勢が共通。Team/Soloの違いが視野の補完をもたらします。" },
  "SGMH-SAMH": { reason: "SoloとStrategyとHeartが共通。Attack/Guardの違いが役割を自然に分担します。" },
  "SGMH-SGML": { reason: "Solo×Guardという根本が一致。Heart/Logicの違いが判断に深みをもたらします。" },
  "SGMH-SGPH": { reason: "Solo×Guardと戦略が共通。直感と心という違いが補完的な化学反応を生みます。" },
  "SGMH-TGMH": { reason: "守りと戦略とHeartという核が共通。Team/Soloの違いが視点を広げます。" },
  "SGML-SAML": { reason: "Solo×Strategyと論理が共通。Attack/Guardの違いが自然な役割分担を生みます。" },
  "SGML-SGMH": { reason: "Solo×Guardという根本が一致。HeartとLogicの違いが補完的な判断力につながります。" },
  "SGML-SGPL": { reason: "Solo×Guard×Logicという3軸が共通。Strategyと直感の違いが思考の幅を広げます。" },
  "SGML-TGML": { reason: "守りと論理と戦略が共通。Team/Soloの違いが新鮮な補完関係を生みます。" },
  "SGPH-SAPH": { reason: "Soloと直感という根本が共通。Guard/Attackの違いが自然な役割分担につながります。" },
  "SGPH-SGMH": { reason: "Solo×Guardと直感が共通。HeartとStrategyの違いが補完的な化学反応を生みます。" },
  "SGPH-SGPL": { reason: "Solo×Guard×直感という3軸が共通。Heart/Logicの違いが判断の幅を広げます。" },
  "SGPH-TGPH": { reason: "守りと直感という核が共通。Team/Soloの違いが視点の多様性をもたらします。" },
  "SGPL-SAPL": { reason: "Solo×Logic×Guardという核が共通。直感と戦略の違いが思考の幅を広げます。" },
  "SGPL-SGML": { reason: "Solo×Guard×Logicが共通。StrategyとInstinctの違いが互いを補完します。" },
  "SGPL-SGPH": { reason: "Solo×Guard×直感が共通。HeartとLogicの違いが補完的な判断力を生みます。" },
  "SGPL-TGPL": { reason: "守りと論理という核が共通。Team/Soloの違いが視点の補完をもたらします。" },
};
const bridgeComments: { [key: string]: string } = {
  "TAMH-SGPL": "まず相手の「一人で極める時間」を尊重することから始めましょう。成果物で語りかけると、論理派の相手も動き出します。",
  "TAML-SGPH": "相手の直感を「根拠がない」と切り捨てず、まず受け止める姿勢を。あなたの論理で整理してあげると、最強のコンビになれます。",
  "TAPH-SGML": "相手のペースと計画性を尊重することが第一歩。感情より事実を共有すると、相手はあなたの熱量を受け取りやすくなります。",
  "TAPL-SGMH": "相手の「守る」姿勢を攻めの文脈で活かす視点を持ちましょう。共通のゴールを数字で共有すると関係が動き出します。",
  "TGMH-SAPL": "相手の一匹狼スタイルを否定せず、成果で評価する姿勢を。あなたの観察眼で相手の強みを見抜くと自然と連携できます。",
  "TGML-SAPH": "相手の直感的な動きに即座に反応せず、まず受け止める余裕を持ちましょう。論理で補完してあげると相手も信頼を開きます。",
  "TGPH-SAML": "相手の自律性と論理的判断を尊重することから始めましょう。感情的なアプローチより、事実ベースの対話が有効です。",
  "TGPL-SAMH": "相手の「まず動く」衝動を否定せず、その後の整理役を担う姿勢を持ちましょう。あなたのデータが相手のビジョンを形にします。",
  "SAMH-TGPL": "相手のチームへの献身を理解し、自分の成果をチームの文脈で語る練習を。協調の姿勢を見せると相手は動きやすくなります。",
  "SAML-TGPH": "相手の感情的な判断を否定せず、感情の裏にある意図を聞く姿勢を持ちましょう。論理で補完しながら寄り添うと信頼が生まれます。",
  "SAPH-TGML": "相手の緻密な計画を「遅い」と感じても、まず尊重する姿勢を。あなたの直感を言語化して共有すると相手も受け取りやすくなります。",
  "SAPL-TGMH": "相手のチームへの貢献意識を理解し、個人成果をチームの文脈に結びつける言葉を使いましょう。観察眼を持つ相手はあなたを評価します。",
  "SGMH-TAPL": "相手の攻めの姿勢と論理的判断は共通点。「守りながら攻める」という視点で対話すると自然と連携できます。",
  "SGML-TAPH": "相手の熱量を否定せず、まず受け止める余裕を。データで相手の熱量を裏付けてあげると、最高の補完関係が生まれます。",
  "SGPH-TAML": "相手の計画性と論理を「窮屈」と感じても、まずその意図を聞いてみましょう。直感をデータに変換してもらえると一気に動けます。",
  "SGPL-TAMH": "相手の熱量に圧倒されても、まず「なぜそこまで熱くなれるのか」を理解しようとする姿勢を。あなたの深さが相手の熱量に方向性を与えます。",
};
const typeData: { [key: string]: {
  name: string; catch: string; color: string; img: string;
  strength: string; role: string; teamPosition: string; career: string;
}} = {
  TAMH: { name: "炎の司令塔", catch: "仲間と共に、誰も見たことのない景色へ。", color: "from-red-500 to-orange-500", img: "/char-basketball.png", strength: "あなたの最大の強みは、「熱量そのものが武器になる」ことです。やると決めたら全力で動き、その姿勢が言葉よりも雄弁に周囲を動かします。ただ熱いだけでなく、ゴールから逆算して道筋を描く戦略眼も持ち合わせている。感情と論理を同時に使いこなせる人間は、実はそう多くありません。あなたがいる場では、空気が変わります。誰かが迷えば方向性を示し、沈んでいれば温度を上げる。それは才能であり、あなたにしかできないことです。", role: "あなたが最も力を発揮するのは、「まだ答えのない問いに挑む場面」です。誰かが決めたルールの中で動くよりも、自分たちでルールを作り出すフェーズに本領があります。新しいプロジェクトの立ち上げ、チームが停滞しているときの突破口、組織が変わらなければならない局面——そういった「熱量と決断力」が求められる役割で、あなたの存在感は際立ちます。", teamPosition: "チームの中でのあなたは、「温度計であり、ヒーターでもある」存在です。誰がどんな状態にあるかを自然に把握し、全体の空気を読みながら、チームが進むべき方向を体現します。リーダーを担うことも多いですが、あなたのリーダーシップは上から引っ張るのではなく、隣で一緒に燃えるタイプ。だからこそ、メンバーがついてきます。", career: "あなたのキャリアは、「大きな壁があるほど輝く」という法則があります。順調な道よりも、誰もやったことのない挑戦、失敗が許されないプレッシャー、チームが崩れかけた局面——そういった修羅場でこそ、あなたの本領が発揮されます。今後のキャリアで意識したいのは、「自分の熱量を仕組みに変える力」を身につけること。" },
  TAML: { name: "冷静なスパイカー", catch: "仲間と共に、緻密な設計で頂点へ。", color: "from-orange-500 to-yellow-500", img: "/char-volleyball.png", strength: "あなたの強みは、「感情と論理を同時に使いこなせる」という希少な資質です。チームの空気を読みながらも、データや根拠に基づいた判断を下せる。これは多くの人が持ち合わせていない、両立の難しい能力です。メンバーの強みを見抜いて最適な役割を与える人材眼も鋭く、その「信頼できる判断力」がチーム全体の安心感を生み出します。", role: "あなたが最も輝くのは、「戦略を描きながらチームを動かす」役割です。上層部には論理的な根拠を持って提案し、メンバーには感情に寄り添いながら目標を共有する。その両方を自然にこなせるのがあなたの本領です。", teamPosition: "チームでのあなたは、「信頼できるキャプテン」です。感情的になりがちな場面でも、あなたは落ち着いて事実を整理し、最善の判断を示します。その「頼れるけど、話しやすい」というバランスが、チームに絶大な安心感をもたらします。", career: "あなたのキャリアは、「責任が大きくなるほど本領を発揮する」タイプです。意識したいのは、「自分の判断軸を言語化すること」。あなたの意思決定プロセスを言葉にして共有できれば、組織全体がその判断力を活かせるようになります。" },
  TAPH: { name: "炎のラガーマン", catch: "熱量そのものが、あなたの最大の武器だ。", color: "from-red-600 to-pink-500", img: "/char-rugby.png", strength: "あなたの強みは、「チームの熱量を増幅させる力」です。仲間の熱を吸収して自分のものにし、さらに大きくして返す——そんな「感情の増幅器」としての才能を持っています。スタートダッシュの速さと「まずやってみる」精神は、停滞したチームに突破口を作る最大の武器です。", role: "あなたが最も輝くのは、「チームに初速をつける場面」です。新しいことを立ち上げるとき、停滞した空気を打ち破るとき——そういった局面で、あなたの熱量は組織を救います。人を巻き込む力が高いため、「この人と一緒に仕事がしたい」と思わせることができます。", teamPosition: "チームの中でのあなたは、「点火役」です。誰かが火をつけなければ動き出さない場面で、あなたは自然と最初に燃え始める。その炎が周囲に広がり、気づけばチーム全体が同じ方向を向いています。", career: "あなたのキャリアは、「熱量が評価される環境で爆発的に伸びる」タイプです。意識したいのは、「直感を言語化する力」を磨くこと。あなたの感覚を言葉にして共有できれば、チームとしての成果が何倍にもなります。" },
  TAPL: { name: "鋭利なフィールドエース", catch: "熱く燃えながら、冷静に仕留める。", color: "from-blue-500 to-cyan-400", img: "/char-lacrosse.png", strength: "あなたの強みは、「熱さと冷静さを同時に持てる」という稀有な資質です。仲間と共に戦うことへの情熱を持ちながら、感情に流されることなく状況を分析できる。「あの人がいれば大丈夫」——そう思わせる安定感は、チームの精神的な支柱になります。", role: "あなたが最も輝くのは、「感情とデータの両方が求められる場面」です。チームのムードを読みながら数字に基づいた提案をし、メンバーへの配慮を忘れずに合理的な判断を下す。", teamPosition: "チームでのあなたは、「参謀型の安定剤」です。先頭に立つリーダーではなく、判断の質を上げる役割を自然に担います。「頭も心もある」その姿勢が、チームに揺るぎない信頼を生み出します。", career: "あなたのキャリアは、「局面が難しくなるほど真価が問われる」タイプです。意識したいのは、「自分の分析を行動に繋げる速さ」を磨くこと。思考の質の高さを、スピードと掛け合わせることで市場価値はさらに高まります。" },
  TGMH: { name: "熱血キャッチャー", catch: "縁の下から、チームの可能性を最大化する。", color: "from-green-500 to-teal-500", img: "/char-softball.png", strength: "あなたの強みは、「守りながら、ここぞという場面で鋭いひらめきを放つ」独自のバランスです。誰がどんな強みを持ち、今どんな状態かを自然に把握するメンバー観察眼は、チームの課題を誰よりも早く発見する力になります。", role: "あなたが最も力を発揮するのは、「現状を守りながら、改善・革新のタネを見つけて提案する」役割です。「守りながら攻める」スタイルは、どんな職種においても希少価値があります。", teamPosition: "チームでのあなたは、「縁の下の参謀」です。前に出るリーダーではなく、そのリーダーを最も深いところで支える役割を担います。「あの人がいるから安心して戦える」そう思わせる存在感は、かけがえのない価値です。", career: "あなたのキャリアは、「信頼を積み重ねることで価値が倍増する」タイプです。意識したいのは、「ひらめきを積極的に発信すること」。あなたの閃きは本物です。もっと言葉にして届けることで、影響力がさらに広がります。" },
  TGML: { name: "鉄壁のリベロ", catch: "あなたがいるから、チームは揺るがない。", color: "from-purple-600 to-indigo-500", img: "/char-handball.png", strength: "あなたの強みは、「緻密な設計でリスクを排除し、チームの安定を守る」力です。「念のため」「万が一」を常に考え、問題が起きる前に手を打つ先読み力は、多くの人が後から気づく課題をあなただけが事前に察知します。", role: "あなたが最も輝くのは、「組織の基盤を固める」役割です。リスク管理・品質管理・プロセス設計において、あなたの緻密さと論理性は他の追随を許しません。", teamPosition: "チームでのあなたは、「組織の土台」です。「あの人が大丈夫と言うなら大丈夫だ」——そう思わせる安定感は、どんな組織においても最も価値のある立ち位置のひとつです。", career: "あなたのキャリアは、「組織の規模が大きくなるほど価値が高まる」タイプです。意識したいのは、「自分の設計力を言語化して共有すること」。組織全体の精度が上がり、あなたへの信頼もさらに高まります。" },
  TGPH: { name: "情熱のガーディアン", catch: "あなたの熱量が、チームを内側から燃やし続ける。", color: "from-orange-400 to-red-400", img: "/char-sprint.png", strength: "あなたの強みは、「仲間のために全力を尽くすことに喜びを感じられる」献身性です。感性が豊かで、誰かが落ち込んでいれば真っ先に気づき、言葉にならない不安を察知して場の雰囲気を和らげる。その「見えないケア」がチームを内側から強くしています。", role: "あなたが最も力を発揮するのは、「チームを内側から支える」役割です。対立が生まれたとき、誰もが傷つかない言葉を選んで場を収める能力は、組織が大きくなるほど希少で、かけがえのない価値を持ちます。", teamPosition: "チームでのあなたは、「内側から燃やし続けるエンジン」です。静かに支えながらも、必要なときには誰よりも熱く燃え上がる。その緩急がチームを長期的に安定させる最大の力です。", career: "あなたのキャリアは、「関わった人や組織が成長していく」ことで価値が証明されるタイプです。人材育成・組織開発・チームビルディングといった領域で特に力を発揮します。" },
  TGPL: { name: "チームの羅針盤", catch: "静かに、しかし確実に、チームを勝利へ導く。", color: "from-blue-600 to-blue-400", img: "/char-baseball.png", strength: "あなたの強みは、「データと仲間への配慮を組み合わせ、チームを最適な方向へ導く信頼性」です。自分が評価されることよりもチームが成果を出すことを優先する献身さは、組織の中で「いなくてはならない存在」としての地位を自然に築いていきます。", role: "あなたが最も力を発揮するのは、「データ分析・情報整理・チームサポート」の役割です。複雑な情報を整理して分かりやすく伝える力、リスクを数字で可視化する力——これらすべてがあなたの得意領域です。", teamPosition: "チームでのあなたは、「静かな貢献者」です。「あの人のおかげでうまくいった」——後から気づかれることが多いかもしれませんが、それこそがあなたの真の価値の証明です。", career: "あなたのキャリアは、「積み重ねるほど価値が増す」タイプです。意識したいのは、「自分の貢献を見える形にすること」。その価値を言語化して伝える力を磨くと、正当な評価が得られるようになります。" },
  SAMH: { name: "孤高のシューター", catch: "まだ誰も気づいていない可能性を、あなたはすでに掴んでいる。", color: "from-green-600 to-emerald-400", img: "/char-archery.png", strength: "あなたの強みは、「誰もたどり着いていないアイデアや可能性を見つけ出す力」です。周囲が「無理だ」と言う状況でも、あなたの直感が「これはいける」と感じれば迷わず踏み出す勇気がある。あなたの見ている世界は、いつも少し未来にあります。", role: "あなたが最も輝くのは、「新しい価値を生み出す創造的な仕事」です。新規事業の立ち上げ、既存のやり方を根本から変えるような挑戦——そういった場面であなたの存在は欠かせません。", teamPosition: "チームでのあなたは、「革新の触媒」です。群れないからこそ見える景色がある。あなたがいることで、チームは自分たちだけでは気づけなかった可能性を手にすることができます。", career: "あなたのキャリアは、「裁量が大きければ大きいほど爆発的に成長する」タイプです。意識したいのは、「ビジョンを人に伝える力」を磨くこと。あなたの見ている未来を言葉にして届けることができれば、一人の力が組織全体を動かす大きなうねりになります。" },
  SAML: { name: "自由なプレイメーカー", catch: "一人で極め、論理で世界を動かす。", color: "from-gray-500 to-slate-400", img: "/char-soccer.png", strength: "あなたの強みは、「誰かの意見に左右されることなく、自分の頭で考え抜く自律性」です。「まだ誰も解いていない問題」に強く引き寄せられる知的好奇心は、あなたを誰も追いつけない専門領域へと連れて行きます。", role: "あなたが最も輝くのは、「深い専門知識が求められる仕事」です。どんな職種であっても、「この分野ならあの人に聞けば間違いない」と言われる専門家ポジションで、あなたは唯一無二の存在になれます。", teamPosition: "チームでのあなたは、「頼れる専門家」です。「あの人の分析があれば安心だ」——そう思わせる専門性の深さが、あなたのチームにおける最大の価値です。", career: "あなたのキャリアは、「専門性を深めるほど市場価値が高まる」タイプです。意識したいのは、「専門知識を組織の文脈に翻訳すること」。周囲が動けるレベルの言葉に変換する力を磨くと、影響力がさらに広がります。" },
  SAPH: { name: "孤高のストライカー", catch: "感じたことが、あなたの最高の羅針盤。", color: "from-pink-500 to-rose-400", img: "/char-tennis.png", strength: "あなたの強みは、「独自の感性と直感で、人や物事を丁寧に育て上げる力」です。感性が豊かなため、言葉にならない「何か」を察知し、それを形にする表現力がある。その力が周囲の人の心に深く響きます。", role: "あなたが最も力を発揮するのは、「クリエイティブな発想と丁寧な実行力が求められる仕事」です。アイデアを生み出すだけでなく、それを形にするまでのプロセスを一人でやり遂げる力がある。", teamPosition: "チームでのあなたは、「感性の担当者」です。あなたの独自の視点がチームに新しいインスピレーションをもたらし、他にはないオリジナルの価値を生み出します。", career: "あなたのキャリアは、「時間をかけるほど本物の評価が得られる」タイプです。意識したいのは、「自分の感覚を言葉で共有すること」。直感を伝える力を磨くと、あなたの世界観が多くの人に届くようになります。" },
  SAPL: { name: "鋭利なイノベーター", catch: "あなたの論理が、世界を新しく塗り替える。", color: "from-violet-500 to-purple-400", img: "/char-skateboard.png", strength: "あなたの強みは、「独自の専門性と論理的思考で、既存の枠を壊す新しい価値を生み出す力」です。周囲が感情的になっている場面でも冷静にデータを分析し最適解を提示できる。その「鋭利な思考」は、最も求められる能力のひとつです。", role: "あなたが最も輝くのは、「既存の仕組みや方法を根本から見直す仕事」です。「仕組みを変える」「効率を上げる」「本質的な改善をする」という役割で、あなたは真価を発揮します。", teamPosition: "チームでのあなたは、「組織の外科医」です。チームが当たり前と思っていることに「本当にそれでいいのか」と問いかけ、より良い方向へ導く。", career: "あなたのキャリアは、「専門性を極めるほど唯一無二の存在になる」タイプです。意識したいのは、「改善案を人が動きやすい形で届けること」。相手が受け取りやすい言葉に変換する力を磨くと、影響力がさらに広がります。" },
  SGMH: { name: "静かなる守護者", catch: "あなたの誠実さが、チームの土台を作り続けている。", color: "from-teal-500 to-green-400", img: "/char-swimming.png", strength: "あなたの強みは、「目立つことなくひたすら誠実に守り続ける、静かで深い強さ」です。人間関係の微妙な変化、チームの雰囲気のずれ——そういった目に見えないものを察知し、静かに手を打ちます。", role: "あなたが最も力を発揮するのは、「組織の文化や価値観、大切な仕組みを守り育てる」役割です。失ってはならないものを守り続ける一貫性と誠実さは、組織の長期的な安定に不可欠な価値です。", teamPosition: "チームでのあなたは、「静かな守護者」です。「あの人がいる限りこのチームは大丈夫だ」という信頼が積み上がっていきます。一度築いた信頼は決して崩れない、最も強固な価値です。", career: "あなたのキャリアは、「長く関わるほど真価が発揮される」タイプです。意識したいのは、「自分の感性を大切な場面で発信すること」。ここぞというときに声を上げる勇気を持つと、評価はさらに高まります。" },
  SGML: { name: "完璧主義のパーフェクター", catch: "完璧を追い求める姿勢が、あなたの最高の武器だ。", color: "from-indigo-500 to-blue-400", img: "/char-gymnastics.png", strength: "あなたの強みは、「緻密な計画と論理的思考で、ミスゼロの仕事をやり遂げる完璧主義者」としての資質です。リスクを事前に察知する先読み力と、客観的で公平な判断力が、長期的な成果の安定をもたらします。", role: "あなたが最も輝くのは、「高い精度と専門性が求められる仕事」です。一つひとつの仕事を丁寧に、確実にやり遂げる姿勢が、周囲からの揺るぎない信頼を生み出します。", teamPosition: "チームでのあなたは、「組織の精密機器」です。チームが迷ったときに正確な情報と論理的な判断を示し、方向性を整える役割を担います。", career: "あなたのキャリアは、「精度を積み重ねるほど圧倒的な専門家になる」タイプです。意識したいのは、「完璧を追いながら、前に進む判断力」を磨くこと。「8割で動いてみる」判断ができると、さらに大きな成果につながります。" },
  SGPH: { name: "孤高のソロパドラー", catch: "誰よりも深く、誰よりも純粋に、自分の道を極める。", color: "from-amber-500 to-orange-400", img: "/char-canoe.png", strength: "あなたの強みは、「自分のペースで深く探求し、直感で本質を掴み取る純粋さ」です。並外れた集中力で興味を持ったことに没頭し、「これを極めたい」という内なる声を信じて動く直感が、誰も踏み込んでいない深い領域へと連れて行きます。", role: "あなたが最も輝くのは、「一つのテーマを深く掘り下げ、本質的な答えを導き出す仕事」です。他の人が見逃してしまう本質的な問題を発見し、丁寧に掘り下げる力は、深い洞察と革新をもたらします。", teamPosition: "チームでのあなたは、「組織の洞察者」です。その静かで深い視点が、チームに気づきをもたらし、組織の方向性を正します。", career: "あなたのキャリアは、「年月を重ねるごとに誰も追いつけないレベルへ高まる」タイプです。意識したいのは、「洞察を言葉にして届けること」。深い気づきを共有する習慣を作ると、周囲への影響力が大きく広がります。" },
  SGPL: { name: "静寂のソロクライマー", catch: "静寂の中でこそ、本物の答えが生まれる。", color: "from-slate-500 to-gray-400", img: "/char-climbing.png", strength: "あなたの強みは、「一人で深く考え、自分のペースで物事を極める」静かで圧倒的な専門性です。データや根拠を大切にし、「なぜそうなるのか」を徹底的に掘り下げ、表面的な答えでは満足しない。", role: "あなたが最も力を発揮するのは、「深い専門性が求められる仕事」です。どんな職種であっても、深い知識と高い論理性が評価されるポジションで、唯一無二の存在になれます。", teamPosition: "チームでのあなたは、「羅針盤」です。感情に流されず冷静に判断し、チームが混乱しているときや重要な意思決定の場面で静かに真価を発揮します。", career: "あなたのキャリアは、「静かな環境と高い裁量があるほど爆発的に能力が開花する」タイプです。意識したいのは、「自分の世界を少しだけ開くこと」。深い専門性を届ける相手を一人でも増やすと、影響力が静かに広がっていきます。" },
};
const typeNames: { [k: string]: string } = {
  TAMH:"炎の司令塔",TAML:"冷静なスパイカー",TAPH:"炎のラガーマン",TAPL:"鋭利なフィールドエース",
  TGMH:"熱血キャッチャー",TGML:"鉄壁のリベロ",TGPH:"情熱のガーディアン",TGPL:"チームの羅針盤",
  SAMH:"孤高のシューター",SAML:"自由なプレイメーカー",SAPH:"孤高のストライカー",SAPL:"鋭利なイノベーター",
  SGMH:"静かなる守護者",SGML:"完璧主義のパーフェクター",SGPH:"孤高のソロパドラー",SGPL:"静寂のソロクライマー",
};

const axisConfig = [
  { label: ["チーム型", "ソロ型"], icon: "👥", color: "#C84B8B" },
  { label: ["攻撃型", "守備型"], icon: "⚡", color: "#8B5CF6" },
  { label: ["行動型", "計画型"], icon: "🔥", color: "#10B981" },
  { label: ["情熱型", "思考型"], icon: "💜", color: "#F59E0B" },
];

function Hearts({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= count ? "#C84B8B" : "rgba(200,75,139,0.2)", fontSize:"16px", lineHeight:"1" }}>♥</span>
      ))}
    </div>
  );
}

function CompatibilitySection({ myCode }: { myCode: string }) {
  const [showAll, setShowAll] = useState(false);
  const ranked = Object.keys(typeAxes)
    .map(b => {
      const s = calcScore(myCode, b);
      const h = toHearts(s);
      const key1 = `${myCode}-${b}`;
      const key2 = `${b}-${myCode}`;
      const comment = compatibilityComments[key1] || compatibilityComments[key2] || null;
      const bridge = bridgeComments[key1] || bridgeComments[key2] || null;
      return { code: b, score: s, hearts: h, comment, bridge };
    })
    .sort((a, b) => {
      const sa = a.score === -1 ? 4 : a.score;
      const sb = b.score === -1 ? 4 : b.score;
      return sb - sa;
    });
  const top5 = ranked.slice(0, 5);
  const rest = ranked.slice(5);

  return (
    <div className="w-full mb-6">
      <h2 className="text-sm font-bold tracking-wide mb-3 flex items-center gap-2" style={{ color: "#7B5CF6" }}>
        <span>💜</span> 相性の良いタイプ
      </h2>
      <div className="flex flex-col gap-2 mb-3">
        {top5.map(({ code, hearts, comment, bridge }) => (
          <div key={code} className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(123,92,246,0.1)", boxShadow: "0 2px 8px rgba(123,92,246,0.04)" }}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div style={{ width: "40px", height: "40px", flexShrink: 0, borderRadius: "50%", background: "white", border: "1px solid rgba(123,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                  {["🏀","🏐","🏉","🥍","🥎","🤾","🏃","⚾","🏹","⚽","🎾","🛹","🏊","🤸","🛶","🧗"][Object.keys(typeAxes).indexOf(code) % 16]}
                </div>
                <div>
                  <p className="text-xs text-gray-400">{code}</p>
                  <p className="font-bold text-gray-800 text-sm">{typeNames[code]}</p>
                </div>
              </div>
              <Hearts count={hearts} />
            </div>
            {comment && <p className="text-gray-500 text-xs leading-relaxed">{comment.reason}</p>}
            {bridge && (
              <div className="mt-2 p-2 rounded-lg" style={{ background: "rgba(123,92,246,0.04)", border: "1px solid rgba(123,92,246,0.12)" }}>
                <p className="text-xs leading-relaxed" style={{ color: "#7B5CF6" }}>💡 歩み寄り方：{bridge}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      <button onClick={() => setShowAll(v => !v)} className="w-full py-3 rounded-2xl text-sm font-medium transition mb-2" style={{ background: "white", border: "1px solid rgba(123,92,246,0.15)", color: "#7B5CF6" }}>
        {showAll ? "▲ 閉じる" : "▼ 全16タイプとの相性を見る"}
      </button>
      {showAll && (
        <div className="flex flex-col gap-2">
          {rest.map(({ code, hearts, comment, bridge }) => (
            <div key={code} className="rounded-2xl p-4" style={{ background: "white", border: "1px solid rgba(123,92,246,0.1)" }}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div style={{ width: "40px", height: "40px", flexShrink: 0, borderRadius: "50%", background: "white", border: "1px solid rgba(123,92,246,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px" }}>
                    {["🏀","🏐","🏉","🥍","🥎","🤾","🏃","⚾","🏹","⚽","🎾","🛹","🏊","🤸","🛶","🧗"][Object.keys(typeAxes).indexOf(code) % 16]}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">{code}</p>
                    <p className="font-bold text-gray-800 text-sm">{typeNames[code]}</p>
                  </div>
                </div>
                <Hearts count={hearts} />
              </div>
              {comment && <p className="text-gray-500 text-xs leading-relaxed">{comment.reason}</p>}
              {bridge && (
                <div className="mt-2 p-2 rounded-lg" style={{ background: "rgba(123,92,246,0.04)", border: "1px solid rgba(123,92,246,0.12)" }}>
                  <p className="text-xs leading-relaxed" style={{ color: "#7B5CF6" }}>💡 歩み寄り方：{bridge}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const categories = [
  { key: "strength" as const, icon: "👤", label: "あなたの強み・才能" },
  { key: "role" as const, icon: "📈", label: "活躍しやすい役割" },
  { key: "teamPosition" as const, icon: "🤝", label: "チームでの立ち位置" },
  { key: "career" as const, icon: "🌐", label: "キャリアのヒント" },
];

function ResultContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const typeCode = searchParams.get("type") || "TAMH";
  const type = typeData[typeCode] || typeData["TAMH"];
  const shareText = encodeURIComponent(`私のビジネスアスリート適性診断結果は「${type.name}」でした！\n「${type.catch}」\n\nあなたも診断してみよう👇\nhttps://archial-diagnosis.vercel.app`);

  return (
    <main className="min-h-screen px-4 py-12" style={{ background: "#f8f7ff" }}>
      <div className="max-w-2xl mx-auto mb-6 text-center">
        <p className="text-xs font-bold tracking-widest mb-4" style={{ color: "#7B5CF6" }}>診断結果</p>
        <div className="w-48 h-48 relative mx-auto mb-4">
          <Image src={type.img} alt={type.name} fill className="object-contain object-top" />
        </div>
        <h1 className={`text-3xl font-black mb-1 text-transparent bg-clip-text bg-gradient-to-r ${type.color}`}>
          {type.name}
        </h1>
        <p className="text-sm text-gray-500 mb-4">{type.catch}</p>
        <div className="flex flex-wrap gap-2 justify-center mb-2">
          {typeCode.split("").map((val, i) => (
            <span key={i} className="px-3 py-1 rounded-full text-xs font-bold"
              style={{ background: `${axisConfig[i].color}12`, border: `1px solid ${axisConfig[i].color}35`, color: axisConfig[i].color }}>
              {axisConfig[i].icon} {val === ["T","A","M","H"][i] ? axisConfig[i].label[0] : axisConfig[i].label[1]}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto flex flex-col gap-3 mb-6">
        {categories.map((cat) => (
          <div key={cat.key} className="rounded-2xl p-5" style={{ background: "white", border: "1px solid rgba(123,92,246,0.1)", boxShadow: "0 2px 8px rgba(123,92,246,0.04)" }}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">{cat.icon}</span>
              <h2 className="text-xs font-bold tracking-wide" style={{ color: "#7B5CF6" }}>{cat.label}</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-sm">{type[cat.key]}</p>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <CompatibilitySection myCode={typeCode} />
        <div className="flex gap-3 flex-wrap justify-center mb-4">
          <button onClick={() => router.push("/")} className="px-6 py-3 rounded-full text-sm font-medium transition text-gray-600" style={{ background: "white", border: "1px solid rgba(123,92,246,0.2)" }}>
            トップに戻る
          </button>
          <Link href="/diagnosis" className="px-6 py-3 rounded-full text-sm font-bold text-white hover:opacity-90 transition" style={{ background: "linear-gradient(135deg, #7B5CF6, #C84B8B)" }}>
            もう一度診断する
          </Link>
          <a href={`https://twitter.com/intent/tweet?text=${shareText}`} target="_blank" rel="noopener noreferrer"
            className="px-6 py-3 rounded-full text-sm font-bold text-white hover:opacity-80 transition flex items-center gap-2" style={{ background: "#000" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.737-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
            Xでシェア
          </a>
        </div>
      </div>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ background: "#f8f7ff" }}><p style={{ color: "#7B5CF6" }}>読み込み中...</p></div>}>
      <ResultContent />
    </Suspense>
  );
}



