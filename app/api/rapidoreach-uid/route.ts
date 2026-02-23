import { NextResponse } from 'next/server';
import crypto from 'crypto';

const GENDER_MAP: Record<string, string> = {
  '男性': 'male',
  '女性': 'female',
  'その他': 'other',
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const rawId   = searchParams.get('userId')     || 'user_official_001';
  const appId   = "PVnxv7sZMH2";
  const appKey  = process.env.RAPIDOREACH_APP_KEY;

  if (!appKey) return NextResponse.json({ error: "Config missing" }, { status: 500 });

  // UID 生成（チェックサム方式）
  const checksum = crypto.createHash('md5')
    .update(`${rawId}-${appId}-${appKey}`)
    .digest('hex');
  const uid = `${rawId}-${appId}-${checksum}`;

  // プロフィールパラメータ受け取り
  const genderRaw  = searchParams.get('gender')     ?? '';
  const birthYear  = searchParams.get('birthYear')  ?? '';
  const birthMonth = searchParams.get('birthMonth') ?? '';
  const birthDay   = searchParams.get('birthDay')   ?? '';
  const zipCode    = searchParams.get('zipCode')    ?? '1000001';
  const city       = searchParams.get('city')       ?? 'Tokyo';
  const country    = searchParams.get('country')    ?? 'JP';

  // gender → male / female / other
  const gender = GENDER_MAP[genderRaw] ?? (genderRaw || undefined);

  // dob → YYYY-MM-DD
  const dob = birthYear && birthMonth && birthDay
    ? `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`
    : undefined;

  // zip → 数字のみ（例: 1000001）
  const zip = zipCode.replace(/[^\d]/g, '') || '1000001';

  // RapidoReach URL 構築
  const qs = new URLSearchParams({ userId: uid });
  if (gender) qs.set('gender', gender);
  if (dob)    qs.set('dob', dob);
  qs.set('zip',     zip);
  qs.set('city',    city || 'Tokyo');
  qs.set('country', country || 'JP');
  qs.set('lang',    'jp');

  const finalUrl = `https://www.rapidoreach.com/ofw/?${qs.toString()}`;

  return NextResponse.json({ url: finalUrl });
}
