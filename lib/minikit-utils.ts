// MiniKit ユーティリティ：安全なエラーハンドリングラッパー
// MiniKit が World App WebView に注入されていない場合でも UI をブロックしない

import { MiniKit } from "@worldcoin/minikit-js";

/**
 * MiniKit が利用可能かどうかを安全に確認する
 * 例外を絶対に投げず、常に boolean を返す
 */
export function isMiniKitReady(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (typeof MiniKit === "undefined") return false;
    return MiniKit.isInstalled() === true;
  } catch {
    return false;
  }
}

/**
 * MiniKit が利用できない場合のエラーメッセージを返す
 */
export function getMiniKitErrorMessage(): string {
  return "World App 内でこのアプリを開いてください（MiniKit が見つかりません）";
}

/**
 * World App miniapp WebView 内で実行されているか確認する
 */
export function isInWorldAppMiniapp(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const win = window as unknown as Record<string, unknown>;
    if (win.__WORLD_APP__) return true;
    if (navigator.userAgent && navigator.userAgent.includes("WorldApp")) return true;
    return isMiniKitReady();
  } catch {
    return false;
  }
}

/**
 * MiniKit を安全に初期化する
 * 例外を絶対に投げず、成功時は true、失敗時は false を返す
 */
export function initializeMiniKit(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (typeof MiniKit === "undefined") return false;
    MiniKit.install();
    return MiniKit.isInstalled() === true;
  } catch {
    return false;
  }
}