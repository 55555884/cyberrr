// MiniKit ユーティリティ関数
// MiniKit SDK の初期化・状態確認・エラーハンドリングをサポートする

import { MiniKit } from "@worldcoin/minikit-js";
import { WORLD_APP_ID } from "./config";

/**
 * MiniKit を初期化する
 * エラーが発生しても例外をスローせず、結果を返す
 * @returns 初期化成功なら true、失敗なら false
 */
export function initializeMiniKit(): boolean {
  try {
    console.log("=== MiniKit 初期化デバッグ ===");
    console.log("1. WORLD_APP_ID:", WORLD_APP_ID);
    console.log("2. typeof WORLD_APP_ID:", typeof WORLD_APP_ID);
    console.log("3. MiniKit.install() 前:", MiniKit.isInstalled());
    
    // ここが問題の行
    console.log("4. MiniKit.install(" + WORLD_APP_ID + ") を呼び出します");
    MiniKit.install(WORLD_APP_ID);
    console.log("5. MiniKit.install() 呼び出し完了");
    
    console.log("6. MiniKit.install() 後:", MiniKit.isInstalled());
    
    if (process.env.NODE_ENV === "development") {
      console.log("[MiniKit] インストール完了 app_id:", WORLD_APP_ID);
      console.log("[MiniKit] isInstalled:", MiniKit.isInstalled());
    }

    return true;
  } catch (error) {
    console.error("[MiniKit] 初期化エラー:", error);
    console.error("[MiniKit] エラースタック:", (error as Error).stack);
    return false;
  }
}

/**
 * MiniKit が利用可能か確認する
 * World App miniapp WebView 内でのみ true を返す
 */
export function isMiniKitReady(): boolean {
  try {
    const result = MiniKit.isInstalled();
    console.log("[isMiniKitReady] MiniKit.isInstalled():", result);
    return result;
  } catch {
    console.error("[isMiniKitReady] isInstalled() 呼び出し失敗");
    return false;
  }
}

/**
 * MiniKit が利用できない場合のユーザー向けエラーメッセージを返す
 */
export function getMiniKitErrorMessage(): string {
  if (process.env.NODE_ENV === "development") {
    return "開発環境: World App 外で実行中です";
  }
  return "World App 内でこのアプリを開いてください";
}