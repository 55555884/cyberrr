// World ID検証APIルート
// MiniKit SDKで取得したWorld ID証明をサーバーサイドで検証する

import { NextResponse } from "next/server";
import { findOrCreateUser } from "@/lib/auth";

// POST /api/auth/verify
// World IDのVerify Action証明を検証してユーザーを登録・取得する
export async function POST(request: Request) {
  try {
    // リクエストボディからWorld ID証明データを取得
    const body = await request.json();
    const { proof, nullifier_hash, merkle_root, verification_level, action } = body;

    // 必須パラメータのバリデーション
    if (!proof || !nullifier_hash || !merkle_root || !verification_level || !action) {
      return NextResponse.json(
        { success: false, error: "必須パラメータが不足しています" },
        { status: 400 }
      );
    }

    // World ID Developer APIで証明を検証する
    const worldIdResponse = await fetch(
      `https://developer.worldcoin.org/api/v2/verify/${process.env.NEXT_PUBLIC_WORLD_ID_APP_ID}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nullifier_hash,
          merkle_root,
          proof,
          verification_level,
          action,
        }),
      }
    );

    const worldIdData = await worldIdResponse.json();

    // World ID検証に失敗した場合
    if (!worldIdResponse.ok || !worldIdData.success) {
      console.error("World ID検証失敗:", worldIdData);
      return NextResponse.json(
        { success: false, error: "World ID検証に失敗しました", detail: worldIdData },
        { status: 400 }
      );
    }

    // 検証成功：nullifier_hashでユーザーを登録または取得する
    // nullifier_hashはWorld IDが発行する一意の識別子（同一ユーザーで常に同じ）
    const user = await findOrCreateUser(nullifier_hash);

    if (!user) {
      return NextResponse.json(
        { success: false, error: "ユーザー登録に失敗しました" },
        { status: 500 }
      );
    }

    // 認証成功レスポンス（user_idとprofile_completedフラグを返す）
    return NextResponse.json({
      success: true,
      user_id: user.id,
      profile_completed: user.profile_completed,
    });
  } catch (error) {
    console.error("World ID検証エラー:", error);
    return NextResponse.json(
      { success: false, error: "サーバーエラーが発生しました" },
      { status: 500 }
    );
  }
}
