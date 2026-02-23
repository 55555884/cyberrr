import { NextResponse } from 'next/server';
import crypto from 'crypto';

// 簡易的な都道府県ローマ字変換マップ
const prefMap: { [key: string]: string } = {
  "東京都": "Tokyo", "大阪府": "Osaka", "神奈川県": "Kanagawa", "愛知県": "Aichi", "福岡県": "Fukuoka" 
  // ...必要に応じて追加
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'guest';
  const appId = process.env.RAPIDOREACH_APP_ID || 'PVnxv7sZMH2';
  const appKey = process.env.RAPIDOREACH_APP_KEY;

  if (!appKey) return NextResponse.json({ error: "Missing Key" }, { status: 500 });

  const checksum = crypto.createHash('md5').update(`${userId}-${appId}-${appKey}`).digest('hex');

  // 1. 性別を海外仕様に (male/female)
  const gender = searchParams.get('gender') === '男性' ? 'male' : 'female';

  // 2. 住所を海外仕様に (ローマ字変換を試みる)
  const prefKanji = searchParams.get('prefecture') || '';
  const cityKanji = searchParams.get('city') || '';
  
  // 都道府県がマップにあれば英語に、なければエンコードした漢字（非推奨だが次策）
  const prefEng = prefMap[prefKanji] || encodeURIComponent(prefKanji);
  const cityEng = encodeURIComponent(cityKanji); 

  let finalUrl = `https://www.rapidoreach.com/ofw/?userId=${userId}-${appId}-${checksum}`;
  finalUrl += `&gender=${gender}`;
  finalUrl += `&dob=${searchParams.get('birthYear')}-01-01`; // DOB形式
  finalUrl += `&zip=${searchParams.get('zip')}`;
  finalUrl += `&city=${cityEng}`;
  finalUrl += `&state=${prefEng}`; // 海外サービスでは都道府県は 'state' キーが多い
  finalUrl += `&country=JP`;

  return NextResponse.json({ url: finalUrl });
}