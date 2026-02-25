// メイン画面：World ID認証フローのエントリーポイント
// MiniKit SDKでWorld IDのVerify Actionを実行し、認証済みユーザーを振り分ける

"use client";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MiniKit, VerificationLevel, ISuccessResult } from "@worldcoin/minikit-js";

import { WORLD_ID_ACTION } from "@/lib/config";
import { isMiniKitReady, getMiniKitErrorMessage } from "@/lib/minikit-utils";
import { saveSession, hasValidSession, getSession } from "@/lib/session-manager";

export default function AuthPage() {
  const router = useRouter();
  // 認証処理中のローディング状態
  const [isLoading, setIsLoading] = useState(false);
  // エラーメッセージの状態
  const [error, setError] = useState("");
  // 自動ログインチェックボックスの状態（デフォルト: オフ）
  const [autoLogin, setAutoLogin] = useState(false);
  // MiniKit が準備できているかどうかの状態（クライアントサイドのみ）
  const [miniKitReady, setMiniKitReady] = useState(false);

  useEffect(() => {
    // クライアントサイドで MiniKit の状態を確認する
    setMiniKitReady(isMiniKitReady());

    // 自動ログインセッションが有効な場合は自動でリダイレクトする
    if (hasValidSession()) {
      const session = getSession();
      if (session) {
        // セッション有効：プロフィール完了状態に応じてリダイレクト
        if (session.profileCompleted) {
          router.replace("/tasks");
        } else {
          router.replace("/profile/setup");
        }
        return;
      }
    }

    // MiniKitがインストール済み（World App内で開いている）の場合
    // すでに認証済みかどうかを確認してリダイレクトする
    if (isMiniKitReady()) {
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
    if (!isMiniKitReady()) {
      setError(getMiniKitErrorMessage());
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

      // 認証成功：セッション情報を保存する（自動ログイン設定を含む）
      saveSession(verifyData.user_id, verifyData.profile_completed, autoLogin);

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
  }, [router, autoLogin]);

  // エラー状態をリセットしてリトライする
  const handleRetry = useCallback(() => {
    // エラーをクリアして再度 MiniKit の状態を確認する
    setError("");
    setMiniKitReady(isMiniKitReady());
  }, []);

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

      {/* World App以外でのアクセス時の詳細メッセージ */}
      {!miniKitReady && !isLoading && (
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
          {/* MiniKit が見つからない場合の説明メッセージ */}
          <p style={{ fontSize: "13px", color: "#856404", margin: "0 0 8px 0", fontWeight: 600 }}>
            ❌ MiniKit が World App に見つかりません
          </p>
          <p style={{ fontSize: "12px", color: "#856404", margin: "0 0 4px 0" }}>
            → World App 内でこのアプリを開いてください
          </p>
          <p style={{ fontSize: "12px", color: "#856404", margin: 0 }}>
            → World App が最新バージョンか確認してください
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
          <p style={{ fontSize: "13px", color: "#CC0000", margin: "0 0 8px 0" }}>{error}</p>
          {/* リトライボタン：エラー発生後に再試行できる */}
          <button
            onClick={handleRetry}
            style={{
              fontSize: "12px",
              color: "#CC0000",
              background: "none",
              border: "1px solid #CC0000",
              borderRadius: "999px",
              padding: "4px 12px",
              cursor: "pointer",
            }}
          >
            リトライ
          </button>
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

      {/* 自動ログインチェックボックス：次回から自動ログインするか選択できる */}
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginTop: "16px",
          fontSize: "13px",
          color: "#555555",
          cursor: "pointer",
        }}
      >
        <input
          type="checkbox"
          checked={autoLogin}
          onChange={(e) => setAutoLogin(e.target.checked)}
          style={{ width: "16px", height: "16px", cursor: "pointer", accentColor: "#06C755" }}
        />
        次回から自動ログインする
      </label>

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
