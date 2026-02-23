"use client"; // APIルートですが、MiniKitとの整合性のため記述。実際はサーバーサイド実行
import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  
  const userId = searchParams.get('userId') || 'user_guest';
  const genderRaw = searchParams.get('gender') || '';
  const birthYear = searchParams.get('birthYear') || '';
  const birthMonth = searchParams.get('birthMonth') || '';
  const birthDay = searchParams.get('birthDay') || '';
  const zip = searchParams.get('zip') || '';
  const city = searchParams.get('city') || '';

  const appId = process.env.RAPIDOREACH_APP_ID || 'PVnxv7sZMH2';
  const appKey = process.env.RAPIDOREACH_APP_KEY;

  if (!appKey) return NextResponse.json({ error: "No API Key" }, { status: 500 });

  // 署名作成
  const hashString = `${userId}-${appId}-${appKey}`;
  const checksum = crypto.createHash('md5').update(hashString).digest('hex');

  // パラメータ変換
  const genderMap: { [key: string]: string } = { "男性": "male", "女性": "female", "その他": "other" };
  const gender = genderMap[genderRaw] || 'other';
  const dob = `${birthYear}-${birthMonth.padStart(2, '0')}-${birthDay.padStart(2, '0')}`;

  // URL構築 (日本語はencodeURIComponent)
  let finalUrl = `https://www.rapidoreach.com/ofw/?userId=${userId}-${appId}-${checksum}`;
  finalUrl += `&gender=${gender}`;
  finalUrl += `&dob=${dob}`;
  finalUrl += `&zip=${zip}`;
  finalUrl += `&city=${encodeURIComponent(city)}`;
  finalUrl += `&country=JP`;

  return NextResponse.json({ url: finalUrl });
}