import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const rawId = searchParams.get('userId') || 'user_guest';
  const gender = searchParams.get('gender') || ''; 
  const birthYear = searchParams.get('birthYear') || '';
  const zip = searchParams.get('zip') || '';
  const lang = searchParams.get('lang') || 'ja';
  
  // .env.localから確実に読み込む
  const appId = process.env.RAPIDOREACH_APP_ID;
  const appKey = process.env.RAPIDOREACH_APP_KEY; 

  if (!appId || !appKey) {
    return NextResponse.json({ error: "APIキーが設定されていません" }, { status: 500 });
  }

  // 1. 署名(MD5)の作成: RapidReachのセキュリティ仕様
  const checksum = crypto.createHash('md5').update(`${rawId}-${appId}-${appKey}`).digest('hex');
  
  // 2. 基本URLの構築
  let finalUrl = `https://www.rapidoreach.com/ofw/?userId=${rawId}-${appId}-${checksum}`;

  // 3. プロフィールデータの注入 (互換性維持)
  if (gender) {
    const gCode = gender === '男性' ? '1' : gender === '女性' ? '2' : '0';
    finalUrl += `&gender=${gCode}`;
  }
  if (birthYear) finalUrl += `&birth_year=${birthYear}`;
  if (zip) finalUrl += `&zip=${zip.replace(/[^\d]/g, '')}`;
  
  finalUrl += `&lang=${lang === 'ja' ? 'jp' : 'en'}&country=JP`;

  // 生成したURLをフロントに返す
  return NextResponse.json({ url: finalUrl });
}