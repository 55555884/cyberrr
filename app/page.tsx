// メイン画面：World ID認証フローのエントリーポイント
// MiniKit SDKでWorld IDのVerify Actionを実行し、認証済みユーザーを振り分ける

"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MiniKit, VerificationLevel, ISuccessResult } from "@worldcoin/minikit-js";
import { WORLD_ID_ACTION } from "@/lib/config";

export default function AuthPage() {
  const router = useRouter();
  // 認証処理中のローディング状態
  const [isLoading, setIsLoading] = useState(false);
  // エラーメッセージの状態
  const [error, setError] = useState("");

  useEffect(() => {
    // MiniKitがインストール済み（World App内で開いている）の場合
    // すでに認証済みかどうかを確認してリダイレクトする
    if (typeof window !== "undefined" && MiniKit.isInstalled()) {
      const userId = localStorage.getItem("worldid_user_id");
      const profileCompleted = localStorage.getItem("worldid_profile_completed");

      if (userId && profileCompleted === "true") {
        // 認証済み＋プロフィール完了 → タスク画面へ
        router.replace("/tasks");
      } else if (userId) {
        // 認証済みだがプロフィール未完了 → プロフィール入力へ
        router.replace("/profile/setup");
      }
    }
  }, [router]);

  // World ID認証を実行する
  const handleVerify = useCallback(async () => {
    // MiniKitが利用できない（World App外でのアクセス）場合はエラー
    if (!MiniKit.isInstalled()) {
      setError("World Appで開いてください");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // MiniKit Verify Actionを実行する（ユーザーがWorld Appで操作する）
      const { finalPayload } = await MiniKit.commandsAsync.verify({
        action: WORLD_ID_ACTION,
        verification_level: VerificationLevel.Orb, // Orb認証（最高レベルの人間確認）
      });

      // ユーザーがキャンセルした場合
      if (finalPayload.status === "error") {
        setError("認証がキャンセルされました");
        setIsLoading(false);
        return;
      }

      // サーバーサイドでWorld ID証明を検証する
      const verifyResponse = await fetch("/api/auth/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...(finalPayload as ISuccessResult),
          action: WORLD_ID_ACTION,
        }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        setError(verifyData.error ?? "認証に失敗しました");
        setIsLoading(false);
        return;
      }

      // 認証成功：ユーザー情報をlocalStorageに保存する
      localStorage.setItem("worldid_user_id", verifyData.user_id);
      localStorage.setItem(
        "worldid_profile_completed",
        String(verifyData.profile_completed)
      );

      // プロフィール完了状態に応じてリダイレクト
      if (verifyData.profile_completed) {
        router.replace("/tasks");
      } else {
        router.replace("/profile/setup");
      }
    } catch (err) {
      console.error("World ID認証エラー:", err);
      setError("認証中にエラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#ECECEC",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 24px",
      }}
    >
      {/* アプリロゴ */}
      <h1
        style={{
          fontSize: "48px",
          fontWeight: 900,
          fontStyle: "italic",
          color: "#06C755",
          marginBottom: "8px",
          letterSpacing: "-2px",
        }}
      >
        CYBERRR
      </h1>
      {/* キャッチコピー */}
      <p style={{ fontSize: "14px", color: "#666666", marginBottom: "48px" }}>
        Earn USDC with surveys
      </p>

      {/* World App以外でのアクセス時のメッセージ */}
      {typeof window !== "undefined" && !MiniKit.isInstalled() && !isLoading && (
        <div
          style={{
            backgroundColor: "#FFF3CD",
            borderRadius: "12px",
            padding: "16px",
            marginBottom: "24px",
            maxWidth: "320px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "13px", color: "#856404", margin: 0 }}>
            このアプリはWorld Appで開いてください
          </p>
        </div>
      )}

      {/* エラーメッセージ */}
      {error && (
        <div
          style={{
            backgroundColor: "#FFE5E5",
            borderRadius: "12px",
            padding: "12px 16px",
            marginBottom: "20px",
            maxWidth: "320px",
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: "13px", color: "#CC0000", margin: 0 }}>{error}</p>
        </div>
      )}

      {/* World ID認証ボタン */}
      <button
        onClick={handleVerify}
        disabled={isLoading}
        style={{
          width: "100%",
          maxWidth: "320px",
          padding: "18px",
          borderRadius: "999px",
          background: isLoading
            ? "#E6E6E6"
            : "linear-gradient(135deg, #06C755, #04a344)",
          color: isLoading ? "#999999" : "#FFFFFF",
          fontSize: "16px",
          fontWeight: 700,
          border: "none",
          cursor: isLoading ? "not-allowed" : "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
        }}
      >
        {/* ローディングスピナー */}
        {isLoading && (
          <span
            style={{
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              border: "2px solid #AAAAAA",
              borderTopColor: "transparent",
              display: "inline-block",
              animation: "spin 0.8s linear infinite",
            }}
          />
        )}
        {isLoading ? "確認中..." : "🌍 World IDで始める"}
      </button>

      {/* 説明テキスト */}
      <p
        style={{
          fontSize: "11px",
          color: "#AAAAAA",
          textAlign: "center",
          maxWidth: "280px",
          marginTop: "20px",
          lineHeight: 1.6,
        }}
      >
        World IDで人間確認を行います。
        個人情報は収集されません。
      </p>

      {/* スピンアニメーション */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
