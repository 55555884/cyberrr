// app/api/rapidoreach-uid/route.ts
import crypto from 'crypto';

export async function GET(request: Request) {
  const api_key = "PVnxv7sZMH2"; // 支給されたKey
  const secret = "YOUR_SECRET";  // 支給されたSecret
  
  // 1. フォームから受け取ったデータ
  const data: any = {
    api_key,
    user_id: "0x123...", // World IDアドレス
    gender: "1",         // 男性=1
    dob: "1990-01-01",
    zip: "1000001",
    country: "JP",
    state: "JP-13"       // 東京都
  };

  // 2. アルファベット順にソートしてハッシュ計算
  const sortedValues = Object.keys(data).sort().map(k => data[k]).join('');
  const enc = crypto.createHash('md5').update(sortedValues + secret).digest('hex');

  // 3. グリーティングURLの生成
  const url = `https://www.rapidoreach.com/content/rewardcenter?` + 
              new URLSearchParams({...data, enc, full_profile: "true", resetProfiler: "false"}).toString();

  return Response.json({ url });
}