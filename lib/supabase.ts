// Supabaseクライアント設定ファイル

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

// Supabase クライアントインスタンス（フロントエンド・APIルート共用）
// RLSが有効な状態で匿名キーを使用
// 環境変数が未設定の場合はnullを返す（ビルド時エラーを防ぐ）
function createSupabaseClient(): SupabaseClient | null {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Supabase環境変数が設定されていません。.env.localを確認してください。");
    }
    return null;
  }
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

export const supabase = createSupabaseClient();
