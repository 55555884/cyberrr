import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const internalUserId = searchParams.get('userId') || 'guest';
  
  const appId = 'PVnxv7sZMH2';
  const appKey = process.env.RAPIDOREACH_APP_KEY || '';
  
  // checksum = md5("internalUserId-appId-appKey")
  const checksumInput = `${internalUserId}-${appId}-${appKey}`;
  const checksum = crypto.createHash('md5').update(checksumInput).digest('hex');
  
  // UID = internalUserId-appId-checksum
  const uid = `${internalUserId}-${appId}-${checksum}`;
  const encodedUid = encodeURIComponent(uid);
  const iframeUrl = `https://www.rapidoreach.com/ofw/?userId=${encodedUid}`;
  
  return NextResponse.json({ uid, iframeUrl });
}