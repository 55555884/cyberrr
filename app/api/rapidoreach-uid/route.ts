import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  // ユーザーIDは固定または認証済みアドレスを1つに固定
  const rawId = searchParams.get('userId') || 'user_official_001';
  const appId = "PVnxv7sZMH2";
  const appKey = process.env.RAPIDOREACH_APP_KEY; // Secret Key

  if (!appKey) return NextResponse.json({ error: "Config missing" }, { status: 500 });

  // 1. 署名の生成 (この順序が1文字でも違うとBAN対象になります)
  const hashString = `${rawId}-${appId}-${appKey}`;
  const checksum = crypto.createHash('md5').update(hashString).digest('hex');
  
  // 2. URL構築
  let finalUrl = `https://www.rapidoreach.com/ofw/?userId=${rawId}-${appId}-${checksum}`;

  // 3. 互換性の注入 (これを正確に送れば、画像13:12の入力画面をスキップできます)
  const gender = searchParams.get('gender'); // '男性' or '女性'
  const birthYear = searchParams.get('birthYear');
  const zip = searchParams.get('zip');

  if (gender) finalUrl += `&gender=${gender === '男性' ? '1' : '2'}`;
  if (birthYear) finalUrl += `&birth_year=${birthYear}`;
  if (zip) finalUrl += `&zip=${zip.replace(/[^\d]/g, '')}`; // 数字のみ

  finalUrl += `&lang=jp&country=JP`;

  return NextResponse.json({ url: finalUrl });
}