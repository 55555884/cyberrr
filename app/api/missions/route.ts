import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'user_guest';
  const appId = process.env.RAPIDOREACH_APP_ID || 'PVnxv7sZMH2';
  const appKey = process.env.RAPIDOREACH_APP_KEY;

  if (!appKey) return NextResponse.json({ error: "API Key Missing" }, { status: 500 });

  try {
    // 1. RapidoReachから現在の案件一覧を取得
    const response = await fetch(
      `https://api.rapidoreach.com/v1/surveys?app_id=${appId}&user_id=${userId}`,
      { headers: { "Authorization": `Bearer ${appKey}` } }
    );
    const data = await response.json();

    // 2. 各案件に署名付きURLを付与
    const surveys = (data.surveys || []).map((s: Record<string, unknown>) => {
      const checksum = crypto.createHash('md5').update(`${userId}-${appId}-${appKey}`).digest('hex');
      return {
        ...s,
        url: `https://www.rapidoreach.com/ofw/?userId=${userId}-${appId}-${checksum}&survey_id=${s.id}&lang=jp&country=JP`
      };
    });

    return NextResponse.json(surveys);
  } catch {
    return NextResponse.json([]);
  }
}