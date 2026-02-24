// MiniKit ユーティリティ関数
// MiniKit SDK の初期化・状態確認・エラーハンドリングをサポートする

import { MiniKit } from "@worldcoin/minikit-js";

/**
 * World App miniapp 環境を検出する
 */
export function isInWorldAppMiniapp(): boolean {
  if (typeof window === "undefined") return false;

  return (
    (window as unknown as Record<string, unknown>).__WORLD_APP__ === true ||
    (window as unknown as Record<string, unknown>).__WORLD_MINIAPP__ === true ||
    window.parent !== window
  );
}

/**
 * MiniKit を World App miniapp 環境で安全に初期化する
 *
 * 初期化フロー：
 * 1. World App miniapp 環境か確認
 * 2. MiniKit がすでにインストール済みか確認
 * 3. MiniKit.install() を呼び出し（引数なし）
 * 4. MiniKit の ready 状態を確認
 * 5. エラー時は詳細ログ
 *
 * @returns 初期化成功なら true、失敗なら false
 */
export function initializeMiniKit(): boolean {
  try {
    // MiniKit がすでにインストール済みか確認
    if (MiniKit.isInstalled()) {
      if (process.env.NODE_ENV === "development") {
        console.log("[MiniKit] 既にインストール済み");
      }
      return true;
    }

    // World App miniapp 環境では app_id を指定しない
    // MiniKit.install() は miniapp WebView 内でのみ呼び出す
    const installResult = MiniKit.install();

    if (process.env.NODE_ENV === "development") {
      console.log("[MiniKit] install() 実行後:", {
        result: installResult,
        isInstalled: MiniKit.isInstalled(),
        timestamp: new Date().toISOString(),
      });
    }

    // インストール後、再度確認
    if (!MiniKit.isInstalled()) {
      console.error("[MiniKit] install() 後も isInstalled() = false");
      return false;
    }

    console.log("[MiniKit] ✅ 初期化成功");
    return true;
  } catch (error) {
    // 初期化エラーの詳細をログ出力する
    console.error("[MiniKit] 初期化エラー詳細:", {
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString(),
      isWorldApp: (window as unknown as Record<string, unknown>).__WORLD_APP__,
    });
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
    return "World App miniapp 環境で実行してください";
  }
  // 本番環境では World App を案内するメッセージを返す
  return "World App 内でこのアプリを開いてください";
}
