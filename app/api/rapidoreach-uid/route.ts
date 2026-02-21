import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const rawId = searchParams.get('userId') || 'user_guest';
  const gender = searchParams.get('gender') || ''; 
  const birthYear = searchParams.get('birthYear') || '';
  const zip = searchParams.get('zip') || '';
  
  // .env.local（画像 9）から読み込み
  const appId = process.env.RAPIDOREACH_APP_ID || 'PVnxv7sZMH2';
  const appKey = process.env.RAPIDOREACH_APP_KEY || ''; 

  // 1. 安全な署名(MD5)の作成
  const checksum = crypto.createHash('md5').update(`${rawId}-${appId}-${appKey}`).digest('hex');
  
  // 2. 基本URLの構築
  let finalUrl = `https://www.rapidoreach.com/ofw/?userId=${rawId}-${appId}-${checksum}`;

  // 3. プロフィールデータの付与（アンケートのスキップ用）
  if (gender) {
    const gCode = gender === '男性' ? '1' : gender === '女性' ? '2' : '0';
    finalUrl += `&gender=${gCode}`;
  }
  if (birthYear) finalUrl += `&birth_year=${birthYear}`;
  if (zip) finalUrl += `&zip=${zip.replace(/[^\d]/g, '')}`;
  
  // 日本設定を固定
  finalUrl += `&lang=jp&country=JP`;

  return NextResponse.json({ url: finalUrl });
}