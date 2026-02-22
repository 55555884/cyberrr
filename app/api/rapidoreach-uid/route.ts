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
  
  // RapidoReach オファーウォール基本URL
  let finalUrl = `https://www.rapidoreach.com/ofw/?userId=${rawId}-${appId}-${checksum}`;

  // 【最重要】初期入力をスキップさせるための変数名修正
  // RapidoReachでは gender: 1(Male), 2(Female) / birth_year / zip を使用します
  if (gender) {
    const gCode = gender === '男性' ? '1' : gender === '女性' ? '2' : '0';
    finalUrl += `&gender=${gCode}`;
  }
  if (birthYear) finalUrl += `&birth_year=${birthYear}`;
  if (zip) finalUrl += `&zip=${zip.replace(/[^\d]/g, '')}`; // 数字のみ抽出

  finalUrl += `&lang=jp&country=JP`;

  return NextResponse.json({ url: finalUrl });
}