// プロフィール入力画面：gender/dob/zipを1回限り入力する
// ProfileFormコンポーネントを使用してフォームを表示する

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ProfileForm from "@/components/ProfileForm";
import type { ProfileFormData } from "@/lib/types";

export default function ProfileSetup() {
  const router = useRouter();
  // 保存中のローディング状態
  const [isLoading, setIsLoading] = useState(false);
  // エラーメッセージの状態
  const [error, setError] = useState("");

  // プロフィール保存ハンドラー
  // ProfileFormコンポーネントから呼び出される
  const handleSave = async (formData: ProfileFormData) => {
    setIsLoading(true);
    setError("");

    // localStorageからユーザーIDを取得する
    const userId = localStorage.getItem("worldid_user_id");
    if (!userId) {
      // 未認証の場合はトップページへリダイレクト
      router.replace("/");
      return;
    }

    // 生年月日をYYYY-MM-DD形式に変換する
    const dob = `${formData.birthYear}-${formData.birthMonth}-${formData.birthDay}`;

    try {
      // サーバーサイドAPIにプロフィールを保存する
      const response = await fetch("/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          gender: Number(formData.gender),
          date_of_birth: dob,
          zip_code: formData.zipCode,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error ?? "プロフィールの保存に失敗しました");
        setIsLoading(false);
        return;
      }

      // 保存成功：localStorageにプロフィール情報をキャッシュする（タスク画面で使用）
      localStorage.setItem(
        "profile",
        JSON.stringify({
          gender: formData.gender,
          dob,
          zipCode: formData.zipCode,
        })
      );
      // profile_completedフラグを更新する
      localStorage.setItem("worldid_profile_completed", "true");

      // タスク画面へ遷移する
      router.replace("/tasks");
    } catch (err) {
      console.error("プロフィール保存エラー:", err);
      setError("通信エラーが発生しました");
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#ECECEC",
        minHeight: "100vh",
        padding: "40px 24px 80px",
      }}
    >
      {/* ヘッダー */}
      <div style={{ marginBottom: "32px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 900, color: "#111111", margin: "0 0 8px" }}>
          プロフィール設定
        </h1>
        <p style={{ fontSize: "13px", color: "#666666", margin: 0 }}>
          アンケートの最適なマッチングのために入力してください
        </p>
      </div>

      {/* エラーメッセージ */}
      {error && (
        <div
          style={{
            backgroundColor: "#FFE5E5",
            borderRadius: "12px",
            padding: "12px 16px",
            marginBottom: "20px",
          }}
        >
          <p style={{ fontSize: "13px", color: "#CC0000", margin: 0 }}>{error}</p>
        </div>
      )}

      {/* プロフィール入力フォーム */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 8px 30px rgba(17,17,17,0.06)",
          border: "1px solid rgba(0,0,0,0.06)",
        }}
      >
        <ProfileForm onSave={handleSave} isLoading={isLoading} />
      </div>
    </div>
  );
}