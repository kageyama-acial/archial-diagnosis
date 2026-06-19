const fs = require('fs');
let c = fs.readFileSync('app/result/page.tsx', 'utf8');

const oldStr = `  const searchParams = useSearchParams();
  const router = useRouter();
  const typeCode = searchParams.get("type") || "TAHM";`;

const newStr = `  const searchParams = useSearchParams();
  const router = useRouter();
  const typeCode = searchParams.get("type") || "TAHM";
  const scoresParam = searchParams.get("scores");
  const axisScores = scoresParam ? scoresParam.split(",").map(Number) : [50, 50, 50, 50];`;

const count = c.split(oldStr).length - 1;
c = c.split(oldStr).join(newStr);
fs.writeFileSync('app/result/page.tsx', c, 'utf8');
console.log('完了！置換数:' + count);
