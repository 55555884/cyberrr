// RapidoReach APIクライアント：v2エンドポイントとの通信を管理

import { RAPIDOREACH_API_KEY, RAPIDOREACH_API_URL } from "./config";
import type { RapidoReachSurvey, RapidoReachApiResponse } from "./types";

// RapidoReach v2 APIからアンケート一覧を取得する
// user_id, gender, dob, zipはターゲティングパラメータとして送信する
export async function fetchSurveys(
  userId: string,
  gender: number,
  dob: string,
  zip: string
): Promise<RapidoReachSurvey[]> {
  // APIキーの確認
  if (!RAPIDOREACH_API_KEY) {
    console.error("RapidoReach APIキーが設定されていません");
    return [];
  }

  // クエリパラメータの構築（プロフィール関所スキップのためにすべて送信）
  const params = new URLSearchParams({
    user_id: userId,
    gender: String(gender),
    dob: dob, // YYYY-MM-DD形式
    zip: zip,
  });

  try {
    // RapidoReach v2 APIへのリクエスト
    // 認証はX-RapidoReach-Api-Keyカスタムヘッダーで行う（環境変数から取得）
    const response = await fetch(`${RAPIDOREACH_API_URL}?${params.toString()}`, {
      method: "GET",
      headers: {
        "X-RapidoReach-Api-Key": RAPIDOREACH_API_KEY, // サーバーサイドのみで使用
        "Content-Type": "application/json",
      },
      // レート制限対策：タイムアウトを設定
      signal: AbortSignal.timeout(10000),
    });

    // HTTPエラーのハンドリング（429 rate limitを含む）
    if (!response.ok) {
      if (response.status === 429) {
        console.warn("RapidoReach APIのレート制限に達しました。しばらく待ってから再試行してください。");
      } else {
        console.error(`RapidoReach APIエラー: ${response.status} ${response.statusText}`);
      }
      return [];
    }

    // レスポンスのパース
    const data: RapidoReachApiResponse = await response.json();
    return data.surveys ?? [];
  } catch (error) {
    // ネットワークエラーやタイムアウトのハンドリング
    console.error("RapidoReach API接続エラー:", error);
    return [];
  }
}

// タスク完了をSupabaseに記録する（Postbackハンドラーから呼び出される）
export function buildEntryLink(entryLink: string, userId: string): string {
  // entry_linkにuser_idを付与してポストバックURLを正しく機能させる
  // RapidoReachはentry_linkにすでにプロフィール情報が含まれている
  try {
    const url = new URL(entryLink);
    // user_idが未設定の場合は追加
    if (!url.searchParams.get("user_id")) {
      url.searchParams.set("user_id", userId);
    }
    return url.toString();
  } catch {
    // URLのパースに失敗した場合はそのまま返す
    return entryLink;
  }
}
