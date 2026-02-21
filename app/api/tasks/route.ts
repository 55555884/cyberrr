import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // 1. フロントエンドの localStorage から送られてきたプロフィール情報を取得
  const rawId = searchParams.get('userId') || 'user_guest';
  const gender = searchParams.get('gender') || ''; 
  const zip = searchParams.get('zip') || '';
  const city = searchParams.get('city') || ''; 

  // 2. API 認証情報の準備
  const appId = process.env.RAPIDOREACH_APP_ID || 'PVnxv7sZMH2';
  const appKey = process.env.RAPIDOREACH_APP_KEY || ''; 

  // 3. 署名（MD5チェックサム）の作成
  const checksum = crypto.createHash('md5').update(`${rawId}-${appId}-${appKey}`).digest('hex');
  
  // 4. 基本となる Offerwall URL の構築
  let surveyUrl = `https://www.rapidoreach.com/ofw/?userId=${rawId}-${appId}-${checksum}`;

  // 5. プロフィール情報を URL パラメータに流し込む（互換性変換）
  if (gender) {
    // RapidoReach の仕様: 1=male, 2=female
    const genderCode = gender === 'male' ? '1' : '2';
    surveyUrl += `&gender=${genderCode}`;
  }
  if (zip) {
    surveyUrl += `&zip=${zip}`; //
  }
  if (city) {
    // 日本語（熊本市など）を URL で送れる形式にエンコード
    surveyUrl += `&city=${encodeURIComponent(city)}`;
  }

  // 6. ユーザーには「審査元」の案件としてデータを返す
  const tasks = [
    {
      id: "rr-001",
      title: "Consumer Trend Survey",
      reward: "1.50 USDC",
      time: "8 min",
      url: surveyUrl // プロフィールが注入されたURL
    },
    {
      id: "rr-002",
      title: "Daily Lifestyle Feedback",
      reward: "0.75 USDC",
      time: "3 min",
      url: surveyUrl
    }
  ];

  return NextResponse.json({ tasks });
}