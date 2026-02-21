import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const rawId = searchParams.get('userId') || 'user_guest';
  const gender = searchParams.get('gender') || ''; 
  const zip = searchParams.get('zip') || '';
  const city = searchParams.get('city') || ''; 
  const lang = searchParams.get('lang') || 'ja'; // 言語を受け取る
  
  const appId = process.env.RAPIDOREACH_APP_ID || 'PVnxv7sZMH2';
  const appKey = process.env.RAPIDOREACH_APP_KEY || ''; 

  // 1. 署名の作成
  const checksum = crypto.createHash('md5').update(`${rawId}-${appId}-${appKey}`).digest('hex');
  
  // 2. 基本URLの構築
  let finalUrl = `https://www.rapidoreach.com/ofw/?userId=${rawId}-${appId}-${checksum}`;

  // 3. データの注入 (スキップ用パラメータ)
  if (gender) finalUrl += `&gender=${gender === 'male' ? '1' : '2'}`; //
  
  if (zip) {
    // NNN-NNNN 形式を保証
    let cleanZip = zip.replace(/[^\d]/g, '');
    if (cleanZip.length === 7) {
      finalUrl += `&zip=${cleanZip.slice(0, 3)}-${cleanZip.slice(3)}`;
    } else {
      finalUrl += `&zip=${zip}`;
    }
  }

  if (city) finalUrl += `&city=${encodeURIComponent(city)}`;
  
  // 4. 言語・国設定を追加
  finalUrl += `&lang=${lang === 'ja' ? 'jp' : 'en'}`;
  finalUrl += `&country=JP`;

  return NextResponse.json({ url: finalUrl });
}