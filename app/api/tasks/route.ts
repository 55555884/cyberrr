import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const userId = searchParams.get('userId') || 'user_guest';
  const rawGender = searchParams.get('gender') || ''; 
  const birthYear = searchParams.get('birthYear') || '';

  // VercelのSettings > Environment Variablesに登録した名前と一致させる
  const appId = process.env.RAPIDOREACH_APP_ID || 'PVnxv7sZMH2';
  const appKey = process.env.RAPIDOREACH_APP_KEY || ''; 

  // 1. 性別の互換性変換 (RapidReach: 1=Male, 2=Female, 0=Other)
  let genderCode = "0";
  if (rawGender === "男性") genderCode = "1";
  else if (rawGender === "女性") genderCode = "2";

  // 2. MD5署名の作成
  const checksum = crypto.createHash('md5').update(`${userId}-${appId}-${appKey}`).digest('hex');
  
  // 3. 署名とプロフィールを統合したURLを生成
  const finalUrl = `https://www.rapidoreach.com/ofw/?userId=${userId}-${appId}-${checksum}&gender=${genderCode}&birth_year=${birthYear}&lang=jp&country=JP`;

  return NextResponse.json({ url: finalUrl });
}