import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const rawId = searchParams.get('userId') || 'user_guest';

  // 環境変数の読み込み
  const appId = process.env.RAPIDOREACH_APP_ID;
  const appKey = process.env.RAPIDOREACH_APP_KEY; // ここが API Key であること

  if (!appId || !appKey) {
    return NextResponse.json({ error: "Config Missing" }, { status: 500 });
  }

  // 1. 署名の生成: md5(userId-appId-appKey)
  const signatureBase = `${rawId}-${appId}-${appKey}`;
  const checksum = crypto.createHash('md5').update(signatureBase).digest('hex');
  
  // 2. 最終的な UID (userId-appId-checksum)
  const finalUid = `${rawId}-${appId}-${checksum}`;
  
  // 3. 案件取得用 URL (日本固定)
  const targetUrl = `https://api.rapidoreach.com/v1/surveys?userId=${finalUid}&lang=jp&country=JP`;

  try {
    const res = await fetch(targetUrl, {
      headers: {
        // サーバーサイド fetch 時のボット判定を回避
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
      cache: 'no-store'
    });

    const data = await res.json();
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json({ error: "API Connection Failed" }, { status: 500 });
  }
}