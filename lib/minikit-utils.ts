// MiniKit ユーティリティ関数
// MiniKit SDK の初期化・状態確認・エラーハンドリングをサポートする

import { MiniKit } from "@worldcoin/minikit-js";
import { WORLD_APP_ID } from "./config";

/**
 * MiniKit を安全に初期化する
 * エラーが発生しても例外をスローせず、結果を返す
 * @returns 初期化成功なら true、失敗なら false
 */
export function initializeMiniKit(): boolean {
  try {
    // app_id が設定されているか確認する
    if (!WORLD_APP_ID) {
      console.warn("[MiniKit] NEXT_PUBLIC_WORLD_ID_APP_ID が設定されていません");
    }

    // MiniKit を World App ID で初期化する
    MiniKit.install(WORLD_APP_ID);

    // インストール成功確認ログ（開発環境のみ）
    if (process.env.NODE_ENV === "development") {
      console.log("[MiniKit] インストール完了 app_id:", WORLD_APP_ID);
      console.log("[MiniKit] isInstalled:", MiniKit.isInstalled());
    }

    return true;
  } catch (error) {
    // 初期化エラーの詳細をログ出力する
    console.error("[MiniKit] 初期化エラー:", error);
    return false;
  }
}

/**
 * MiniKit が利用可能な状態か確認する
 * World App miniapp WebView 内でのみ true を返す
 */
export function isMiniKitReady(): boolean {
  try {
    return MiniKit.isInstalled();
  } catch {
    // isInstalled() 呼び出し自体が失敗した場合は false を返す
    return false;
  }
}

/**
 * MiniKit が利用できない場合のユーザー向けエラーメッセージを返す
 */
export function getMiniKitErrorMessage(): string {
  // 開発環境では開発用メッセージを返す
  if (process.env.NODE_ENV === "development") {
    return "開発環境: World App 外で実行中です（MiniKit モック使用推奨）";
  }
  // 本番環境では World App を案内するメッセージを返す
  return "World App 内でこのアプリを開いてください";
}
