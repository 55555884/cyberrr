// プロフィール保存APIルート
// ユーザーのgender/dob/zipを1回限りSupabaseに保存する

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { markProfileCompleted } from "@/lib/auth";

// POST /api/auth/profile
// プロフィール情報をDBに保存する（1回限り・変更不可）
export async function POST(request: Request) {
  // Supabase未設定チェック
  if (!supabase) {
    return NextResponse.json(
      { success: false, error: "データベースが設定されていません" },
      { status: 503 }
    );
  }

  try {
    // リクエストボディからプロフィールデータを取得
    const body = await request.json();
    const { user_id, gender, date_of_birth, zip_code } = body;

    // 必須パラメータのバリデーション
    if (!user_id || !gender || !date_of_birth || !zip_code) {
      return NextResponse.json(
        { success: false, error: "必須パラメータが不足しています" },
        { status: 400 }
      );
    }

    // 性別の値チェック（1=男性, 2=女性）
    if (![1, 2].includes(Number(gender))) {
      return NextResponse.json(
        { success: false, error: "性別は1（男性）または2（女性）を指定してください" },
        { status: 400 }
      );
    }

    // 既存プロフィールの確認（1回限りの入力制限）
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id")
      .eq("user_id", user_id)
      .single();

    if (existingProfile) {
      // すでにプロフィールが存在する場合はエラー
      return NextResponse.json(
        { success: false, error: "プロフィールはすでに登録されています" },
        { status: 409 }
      );
    }

    // プロフィールをSupabaseに保存する
    const { error: insertError } = await supabase.from("profiles").insert({
      user_id,
      gender: Number(gender),
      date_of_birth, // YYYY-MM-DD形式
      zip_code: String(zip_code),
    });

    if (insertError) {
      console.error("プロフィール保存エラー:", insertError);
      return NextResponse.json(
        { success: false, error: "プロフィールの保存に失敗しました" },
        { status: 500 }
      );
    }

    // ユーザーのprofile_completedフラグをtrueに更新する
    const updated = await markProfileCompleted(user_id);
    if (!updated) {
      console.warn("profile_completedフラグの更新に失敗しました（user_id:", user_id, "）");
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("プロフィール保存APIエラー:", error);
    return NextResponse.json(
      { success: false, error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
