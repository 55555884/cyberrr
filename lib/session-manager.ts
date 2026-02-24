// セッション管理・自動ログイン管理ユーティリティ
// localStorage を使ったセッション情報の保存・取得・削除を管理する

// セッション有効期限（ミリ秒）：24時間
const SESSION_DURATION_MS = 24 * 60 * 60 * 1000;

// localStorage に保存するキー名の定数
const KEYS = {
  USER_ID: "worldid_user_id",                  // ユーザーID
  PROFILE_COMPLETED: "worldid_profile_completed", // プロフィール完了フラグ
  VERIFIED: "world_id_verified",               // World ID 認証済みフラグ
  SESSION_EXPIRY: "session_expiry",            // セッション有効期限（Unix ms）
  AUTO_LOGIN: "auto_login_enabled",            // 自動ログイン有効フラグ
} as const;

/** セッション情報の型定義 */
export interface SessionData {
  userId: string;
  profileCompleted: boolean;
  expiresAt: number;
  autoLoginEnabled: boolean;
}

/**
 * セッションを保存する
 * @param userId ユーザーID
 * @param profileCompleted プロフィール完了フラグ
 * @param autoLogin 自動ログインを有効にするか
 */
export function saveSession(
  userId: string,
  profileCompleted: boolean,
  autoLogin: boolean
): void {
  // セッション有効期限を現在時刻 + 24時間で計算する
  const expiresAt = Date.now() + SESSION_DURATION_MS;

  // 各セッション情報を localStorage に保存する
  localStorage.setItem(KEYS.USER_ID, userId);
  localStorage.setItem(KEYS.PROFILE_COMPLETED, String(profileCompleted));
  localStorage.setItem(KEYS.VERIFIED, "true");
  localStorage.setItem(KEYS.SESSION_EXPIRY, String(expiresAt));
  localStorage.setItem(KEYS.AUTO_LOGIN, String(autoLogin));
}

/**
 * 有効なセッションが存在するか確認する
 * 自動ログインが有効かつセッションが期限内であれば true を返す
 */
export function hasValidSession(): boolean {
  // サーバーサイドレンダリング時は false を返す
  if (typeof window === "undefined") return false;

  // 自動ログインが有効かどうか確認する
  const autoLogin = localStorage.getItem(KEYS.AUTO_LOGIN);
  if (autoLogin !== "true") return false;

  // ユーザーID が存在するか確認する
  const userId = localStorage.getItem(KEYS.USER_ID);
  if (!userId) return false;

  // World ID 認証済みフラグを確認する
  const verified = localStorage.getItem(KEYS.VERIFIED);
  if (verified !== "true") return false;

  // セッション有効期限を確認する
  const expiry = localStorage.getItem(KEYS.SESSION_EXPIRY);
  if (!expiry) return false;

  // 現在時刻と有効期限を比較する
  const expiresAt = Number(expiry);
  if (Date.now() > expiresAt) {
    // 期限切れの場合はセッション情報を削除する
    clearSession();
    return false;
  }

  return true;
}

/**
 * 保存されているセッションデータを取得する
 * 有効なセッションがない場合は null を返す
 */
export function getSession(): SessionData | null {
  // サーバーサイドレンダリング時は null を返す
  if (typeof window === "undefined") return null;

  const userId = localStorage.getItem(KEYS.USER_ID);
  const profileCompleted = localStorage.getItem(KEYS.PROFILE_COMPLETED);
  const expiry = localStorage.getItem(KEYS.SESSION_EXPIRY);
  const autoLogin = localStorage.getItem(KEYS.AUTO_LOGIN);

  // 必須データが揃っていない場合は null を返す
  if (!userId || !expiry) return null;

  return {
    userId,
    profileCompleted: profileCompleted === "true",
    expiresAt: Number(expiry),
    autoLoginEnabled: autoLogin === "true",
  };
}

/**
 * セッション情報を全削除する（ログアウト時に呼ぶ）
 */
export function clearSession(): void {
  // サーバーサイドレンダリング時は何もしない
  if (typeof window === "undefined") return;

  // セッション関連の全キーを削除する
  Object.values(KEYS).forEach((key) => localStorage.removeItem(key));
}

/**
 * セッション有効期限を人間が読める形式で返す（デバッグ用）
 */
export function getSessionExpiryString(): string | null {
  if (typeof window === "undefined") return null;
  const expiry = localStorage.getItem(KEYS.SESSION_EXPIRY);
  if (!expiry) return null;
  return new Date(Number(expiry)).toLocaleString("ja-JP");
}
