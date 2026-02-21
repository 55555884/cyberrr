import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // フロントエンドから送られてくる生データ
  const userId = searchParams.get('userId') || 'user_guest';
  const gender = searchParams.get('gender') || ''; 
  const birthYear = searchParams.get('birthYear') || '';

  // Vercel設定（image_883d84.jpg）に合わせた変数名
  const appId = process.env.RAPIDOREACH_APP_ID || 'PVnxv7sZMH2';
  const appKey = process.env.RAPIDOREACH_APP_KEY || ''; 

  // 1. 性別の変換 (RapidReach: 1=男性, 2=女性)
  let genderCode = "0";
  if (gender === "男性") genderCode = "1";
  else if (gender === "女性") genderCode = "2";

  // 2. MD5署名の作成 (userId-appId-appKey)
  const checksum = crypto.createHash('md5').update(`${userId}-${appId}-${appKey}`).digest('hex');
  
  // 3. 署名とプロフィール属性を統合したURLの構築
  const finalUrl = `https://www.rapidoreach.com/ofw/?userId=${userId}-${appId}-${checksum}&gender=${genderCode}&birth_year=${birthYear}&lang=jp&country=JP`;

  return NextResponse.json({ url: finalUrl });
}