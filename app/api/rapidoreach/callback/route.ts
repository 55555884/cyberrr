// RapidoReach Postbackハンドラー
// S2S（Server-to-Server）でアンケート完了通知を受け取り、報酬を確定する

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { RAPIDOREACH_APP_SECRET } from "@/lib/config";
import crypto from "crypto";

// GET /api/rapidoreach/callback
// RapidoReachからのPostback通知を受け取る（S2S通知はGETで来ることが多い）
export async function GET(request: Request) {
  // Supabase未設定チェック
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: "データベースが設定されていません" },
      { status: 503 }
    );
  }

  const { searchParams } = new URL(request.url);

  // Postbackパラメータを取得する
  const userId = searchParams.get("user_id"); // アプリ側ユーザーID
  const surveyNumber = searchParams.get("survey_number"); // アンケート番号
  const status = searchParams.get("status"); // 完了ステータス（1=完了）
  const cpi = searchParams.get("cpi"); // 確定報酬額
  const signature = searchParams.get("sig"); // Webhook署名（セキュリティ検証用）

  // 必須パラメータのバリデーション
  if (!userId || !surveyNumber || !status) {
    return NextResponse.json(
      { success: false, error: "必須パラメータが不足しています" },
      { status: 400 }
    );
  }

  // Webhook署名の検証（改ざん防止）
  if (RAPIDOREACH_APP_SECRET && signature) {
    // 署名検証：HMAC-SHA256でパラメータを署名して比較する
    // デリミタ「|」でパラメータを区切りコリジョン攻撃を防ぐ
    const expectedSig = crypto
      .createHmac("sha256", RAPIDOREACH_APP_SECRET)
      .update(`${userId}|${surveyNumber}|${status}`)
      .digest("hex");

    if (signature !== expectedSig) {
      console.warn("Postback署名検証失敗 - 不正なリクエストの可能性があります");
      return NextResponse.json(
        { success: false, error: "署名検証に失敗しました" },
        { status: 403 }
      );
    }
  }

  const statusNum = parseInt(status);
  const cpiNum = cpi ? parseFloat(cpi) : 0;

  try {
    // 既存のtask_completionレコードを確認する（重複処理防止）
    const { data: existing } = await supabase
      .from("task_completions")
      .select("id, status")
      .eq("user_id", userId)
      .eq("survey_number", surveyNumber)
      .single();

    if (existing) {
      // 既存レコードが存在する場合はステータスを更新する
      const { error: updateError } = await supabase
        .from("task_completions")
        .update({
          status: statusNum,
          // status=1（完了）の場合は報酬額を確定する
          earned_amount: statusNum === 1 ? cpiNum : 0,
          completed_at: statusNum === 1 ? new Date().toISOString() : null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existing.id);

      if (updateError) {
        console.error("タスク完了更新エラー:", updateError);
        return NextResponse.json({ success: false, error: "更新に失敗しました" }, { status: 500 });
      }
    } else {
      // 新規レコードを作成する
      const { error: insertError } = await supabase.from("task_completions").insert({
        user_id: userId,
        survey_number: surveyNumber,
        cpi: cpiNum,
        status: statusNum,
        // status=1（完了）の場合は報酬額を確定する
        earned_amount: statusNum === 1 ? cpiNum : 0,
        completed_at: statusNum === 1 ? new Date().toISOString() : null,
      });

      if (insertError) {
        console.error("タスク完了登録エラー:", insertError);
        return NextResponse.json({ success: false, error: "登録に失敗しました" }, { status: 500 });
      }
    }

    // RapidoReachはPostbackレスポンスとして"1"を期待することがある
    return new Response("1", { status: 200, headers: { "Content-Type": "text/plain" } });
  } catch (error) {
    console.error("Postbackハンドラーエラー:", error);
    return NextResponse.json({ success: false, error: "サーバーエラーが発生しました" }, { status: 500 });
  }
}

// POST /api/rapidoreach/callback
// POSTでもPostbackを受け取れるようにする
export async function POST(request: Request) {
  // POSTボディをGETのクエリパラメータ形式に変換してGETハンドラーに委譲
  try {
    const body = await request.json().catch(() => ({}));
    const url = new URL(request.url);

    // ボディのパラメータをクエリパラメータに追加してGETハンドラーを再利用
    Object.entries(body).forEach(([key, value]) => {
      url.searchParams.set(key, String(value));
    });

    return GET(new Request(url.toString(), { method: "GET" }));
  } catch (error) {
    console.error("POSTボディのパースエラー:", error);
    return NextResponse.json({ success: false, error: "リクエストのパースに失敗しました" }, { status: 400 });
  }
}
