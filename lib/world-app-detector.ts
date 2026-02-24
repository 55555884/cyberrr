// World App 環境検出ユーティリティ
// miniapp WebView 内での実行かどうかを確認する関数群

/**
 * World App miniapp WebView 内で実行されているか確認する
 * 複数の手がかりを組み合わせて環境を判定する
 */
export function isInWorldApp(): boolean {
  // サーバーサイドレンダリング時は false を返す
  if (typeof window === "undefined") return false;

  // window.__WORLD_APP__ が存在すれば World App 内
  if ((window as unknown as Record<string, unknown>).__WORLD_APP__) return true;

  // navigator.userAgent に WorldApp が含まれているか確認
  if (navigator.userAgent && navigator.userAgent.includes("WorldApp")) return true;

  // MiniKit が既にインストール済みか確認（World App WebView 内のみ有効）
  try {
    // @worldcoin/minikit-js の MiniKit.isInstalled() で確認
    // dynamic import を避けるため、window オブジェクト経由で確認
    const win = window as unknown as Record<string, unknown>;
    if (win.MiniKit && typeof (win.MiniKit as Record<string, unknown>).isInstalled === "function") {
      return (win.MiniKit as { isInstalled: () => boolean }).isInstalled();
    }
  } catch {
    // エラーは無視して次の判定へ
  }

  return false;
}

/**
 * 開発環境かどうかを確認する
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === "development";
}

/**
 * World App か開発環境かどうかを確認する
 * 開発環境では World App なしでも動作できるようにするため
 */
export function isWorldAppOrDev(): boolean {
  return isInWorldApp() || isDevelopment();
}
