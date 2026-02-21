import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // ユーザー識別子を確実に取得
  const rawId = searchParams.get('userId') || 'user_guest';
  const gender = searchParams.get('gender') || ''; 
  const birthYear = searchParams.get('birthYear') || '';
  
  // Vercelに設定した環境変数を取得
  const appId = process.env.RAPIDOREACH_APP_ID || 'PVnxv7sZMH2';
  const appKey = process.env.RAPIDOREACH_APP_KEY; 

  if (!appKey) {
    return NextResponse.json({ error: "API_KEY_MISSING" }, { status: 500 });
  }

  // 1. 署名の作成 (userId-appId-appKey)
  const checksum = crypto.createHash('md5').update(`${rawId}-${appId}-${appKey}`).digest('hex');
  
  // 2. 本番URLの構築 (署名入り)
  let finalUrl = `https://www.rapidoreach.com/ofw/?userId=${rawId}-${appId}-${checksum}`;

  // 3. 属性情報の付与 (互換性維持)
  if (gender) {
    const gCode = gender === '男性' ? '1' : gender === '女性' ? '2' : '0';
    finalUrl += `&gender=${gCode}`;
  }
  if (birthYear) finalUrl += `&birth_year=${birthYear}`;
  
  // 国と言語を固定
  finalUrl += `&lang=jp&country=JP`;

  return NextResponse.json({ url: finalUrl });
}