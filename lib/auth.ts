// 認証ロジックファイル：World ID認証とユーザー管理

import { supabase } from "./supabase";
import type { User } from "./types";

// World ID検証済みユーザーをDBに登録または取得する
// nullifier_hashはWorld IDが発行する一意の識別子（同一ユーザーなら常に同じ値）
export async function findOrCreateUser(nullifierHash: string): Promise<User | null> {
  // Supabaseが未設定の場合はnullを返す
  if (!supabase) {
    console.error("Supabase未設定: 環境変数を確認してください");
    return null;
  }

  // 既存ユーザーを検索
  const { data: existing, error: findError } = await supabase
    .from("users")
    .select("*")
    .eq("world_id_proof", nullifierHash)
    .single();

  // 既存ユーザーが見つかった場合はそのまま返す
  if (existing && !findError) {
    return existing as User;
  }

  // 新規ユーザーを作成（初回ログイン時）
  const { data: created, error: createError } = await supabase
    .from("users")
    .insert({ world_id_proof: nullifierHash, profile_completed: false })
    .select("*")
    .single();

  if (createError) {
    console.error("ユーザー作成エラー:", createError);
    return null;
  }

  return created as User;
}

// ユーザーIDでユーザーを取得する
export async function getUserById(userId: string): Promise<User | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    console.error("ユーザー取得エラー:", error);
    return null;
  }

  return data as User;
}

// プロフィール入力完了フラグを更新する
export async function markProfileCompleted(userId: string): Promise<boolean> {
  if (!supabase) return false;

  const { error } = await supabase
    .from("users")
    .update({ profile_completed: true, updated_at: new Date().toISOString() })
    .eq("id", userId);

  if (error) {
    console.error("プロフィール完了フラグ更新エラー:", error);
    return false;
  }

  return true;
}
