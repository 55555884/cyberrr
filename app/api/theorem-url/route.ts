import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'user_guest';
  const apiKey = process.env.THEOREM_REACH_API_KEY;
  const url = `https://theoremreach.com/respondent_entry/direct?api_key=${apiKey}&user_id=${userId}`;
  return NextResponse.json({ url });
}