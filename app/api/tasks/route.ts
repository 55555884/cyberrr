// タスク一覧APIルート：RapidoReach v2 APIからアンケートを取得して返す

import { NextResponse } from 'next/server';
import { fetchSurveys } from '@/lib/rapidoreach';

// GET /api/tasks
// RapidoReach v2 APIからユーザーに合わせたアンケート一覧を取得する
// クエリパラメータ: userId, gender, dob, zip
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // クエリパラメータからプロフィール情報を取得する
  const userId = searchParams.get('userId');
  const gender = searchParams.get('gender');
  const dob = searchParams.get('dob'); // YYYY-MM-DD形式
  const zip = searchParams.get('zip');

  // 必須パラメータのバリデーション
  if (!userId || !gender || !dob || !zip) {
    return NextResponse.json(
      { error: '必須パラメータが不足しています', required: ['userId', 'gender', 'dob', 'zip'] },
      { status: 400 }
    );
  }

  // RapidoReach v2 APIからアンケートを取得する
  // APIキーはサーバーサイドの環境変数から取得（クライアントには露出しない）
  const surveys = await fetchSurveys(userId, Number(gender), dob, zip);

  return NextResponse.json({ surveys });
}