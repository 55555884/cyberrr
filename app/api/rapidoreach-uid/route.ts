import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const rawId = searchParams.get('userId') || 'user_guest';
  const gender = searchParams.get('gender') || ''; 
  const birthYear = searchParams.get('birthYear') || '';
  const zip = searchParams.get('zip') || '';
  
  const appId = process.env.RAPIDOREACH_APP_ID || 'PVnxv7sZMH2';
  const appKey = process.env.RAPIDOREACH_APP_KEY; 

  if (!appKey) return NextResponse.json({ error: "Missing API Key" }, { status: 500 });

  // 署名の作成
  const checksum = crypto.createHash('md5').update(`${rawId}-${appId}-${appKey}`).digest('hex');
  
  // 基本URL
  let finalUrl = `https://www.rapidoreach.com/ofw/?userId=${rawId}-${appId}-${checksum}`;

  // 【互換性アップ】プロフィール情報を注入してスキップさせる
  if (gender) {
    const gCode = gender === '男性' ? '1' : gender === '女性' ? '2' : '0';
    finalUrl += `&gender=${gCode}`;
  }
  if (birthYear) finalUrl += `&birth_year=${birthYear}`;
  if (zip) finalUrl += `&zip=${zip.replace(/[^\d]/g, '')}`; // ハイフン抜き数字のみ
  
  // 日本固定設定
  finalUrl += `&lang=jp&country=JP`;

  return NextResponse.json({ url: finalUrl });
}