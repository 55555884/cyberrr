import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // ユーザー情報と属性の取得
  const rawId = searchParams.get('userId') || 'user_guest';
  const gender = searchParams.get('gender') || ''; 
  const birthYear = searchParams.get('birthYear') || '';
  const zip = searchParams.get('zip') || '';
  const lang = searchParams.get('lang') || 'ja';
  
  // .env.localから読み込み（image_87bea0.pngのキー名に合わせる）
  const appId = process.env.RAPIDOREACH_APP_ID || 'PVnxv7sZMH2';
  const appKey = process.env.RAPIDOREACH_APP_KEY || ''; 

  // 1. セキュアな署名の作成（RapidReachの仕様）
  const checksum = crypto.createHash('md5').update(`${rawId}-${appId}-${appKey}`).digest('hex');
  
  // 2. 基本URLの構築
  let finalUrl = `https://www.rapidoreach.com/ofw/?userId=${rawId}-${appId}-${checksum}`;

  // 3. プロフィールデータの注入（これによりアンケート初期の質問がスキップされる）
  if (gender) {
    // 1=男性, 2=女性, 0=その他
    const gCode = gender === '男性' ? '1' : gender === '女性' ? '2' : '0';
    finalUrl += `&gender=${gCode}`;
  }
  
  if (birthYear) finalUrl += `&birth_year=${birthYear}`;

  if (zip) {
    let cleanZip = zip.replace(/[^\d]/g, '');
    finalUrl += `&zip=${cleanZip}`;
  }
  
  // 4. 国・言語設定
  finalUrl += `&lang=${lang === 'ja' ? 'jp' : 'en'}&country=JP`;

  return NextResponse.json({ url: finalUrl });
}