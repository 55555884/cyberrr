// アプリケーション設定ファイル：環境変数の一元管理

// World IDアプリケーションID（クライアントサイドで使用）
export const WORLD_APP_ID =
  (process.env.NEXT_PUBLIC_WORLD_ID_APP_ID as `app_${string}`) ?? "";

// World ID認証アクション名（Verify Actionで使用）
export const WORLD_ID_ACTION = "cyberrr-login";

// SupabaseのURL（クライアントサイドで使用）
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

// Supabaseの匿名キー（クライアントサイドで使用）
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

// RapidoReach APIキー（サーバーサイドのみ・絶対にクライアントに露出しない）
export const RAPIDOREACH_API_KEY = process.env.RAPIDOREACH_API_KEY ?? "";

// RapidoReach アプリID（サーバーサイドで使用）
export const RAPIDOREACH_APP_ID = process.env.RAPIDOREACH_APP_ID ?? "";

// RapidoReach アプリシークレット（Postback署名検証に使用）
export const RAPIDOREACH_APP_SECRET = process.env.RAPIDOREACH_APP_SECRET ?? "";

// アプリのベースURL（Postbackエンドポイント構築に使用）
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

// RapidoReach API v2エンドポイント
export const RAPIDOREACH_API_URL = "https://www.rapidoreach.com/api/v2/surveys";

// UIカラーシステム
export const COLORS = {
  background: "#ECECEC", // 背景色
  accent: "#06C755", // 成功/CTAボタン色
  secondary: "#4CC764", // セカンダリアクセント色
  text: "#000000", // メインテキスト色
  error: "#FF0000", // エラー色
  white: "#FFFFFF", // ホワイト
  gray: "#888888", // グレー（補助テキスト）
} as const;
