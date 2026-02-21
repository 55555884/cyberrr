import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'user_guest';
  const gender = searchParams.get('gender') || ''; 
  const birthYear = searchParams.get('birthYear') || '';

  // 環境変数の読み込み
  const appId = process.env.RAPIDOREACH_APP_ID;
  const appKey = process.env.RAPIDOREACH_APP_KEY; 

  // ★デバッグ用：環境変数がない場合にエラーを返す
  if (!appId || !appKey) {
    return NextResponse.json({ 
      error: "Environment Variables Missing",
      check: "VercelのSettingsで変数が設定されているか確認してください" 
    }, { status: 500 });
  }

  // 1. 性別の変換
  const gCode = gender === "男性" ? "1" : gender === "女性" ? "2" : "0";

  // 2. 署名の作成
  const checksum = crypto.createHash('md5').update(`${userId}-${appId}-${appKey}`).digest('hex');
  
  // 3. URL構築
  const finalUrl = `https://www.rapidoreach.com/ofw/?userId=${userId}-${appId}-${checksum}&gender=${gCode}&birth_year=${birthYear}&lang=jp&country=JP`;

  return NextResponse.json({ url: finalUrl });
}