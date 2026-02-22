"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MiniKit } from "@worldcoin/minikit-js";
import { useState, useEffect } from "react";

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkStatus = () => {
      const profile = localStorage.getItem("profile");
      const isVerified = localStorage.getItem("worldid_verified");

      // 1. すべて完了しているならタスク画面へ
      if (profile && (isVerified || MiniKit.isInstalled())) {
        router.replace("/tasks");
      } 
      // 2. 認証済みだがプロフィールがまだならアンケートへ
      else if (!profile && (isVerified || MiniKit.isInstalled())) {
        router.replace("/profile/setup");
      } 
      // 3. 未認証ならチェックを終了してログインボタンを表示
      else {
        setIsChecking(false);
      }
    };

    if (typeof window !== "undefined") {
      checkStatus();
    }
  }, [router]);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const nonce = Math.random().toString(36).substring(2);
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce,
        statement: "Sign in to CYBERRR",
      });

      if (finalPayload.status === "success") {
        // 認証成功フラグを保存
        localStorage.setItem("worldid_verified", "true");
        // 次のステップ（アンケート）へ強制移動
        router.replace("/profile/setup");
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  // チェック中は何も表示しない（画面のチラつき防止）
  if (isChecking) return null;

  return (
    <div style={{ backgroundColor: "#ECECEC", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <Image src="/名称_未_設定 - 2026-02-19T155633.450 (1) (1).png" alt="Logo" width={120} height={120} priority style={{ borderRadius: "24px" }} />
      </div>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ color: "#111111", fontSize: "28px", fontWeight: "800", margin: "0 0 8px 0" }}>
          Verify World ID to<br/>Unlock Premium Tasks
        </h1>
        <p style={{ color: "#666666", fontSize: "13px" }}>Secure access via Worldcoin Protocol</p>
      </div>
      <button
        onClick={handleSignIn}
        disabled={loading}
        style={{ width: "100%", maxWidth: "340px", padding: "18px", borderRadius: "99px", background: "linear-gradient(135deg, #06C755, #04a344)", color: "#FFFFFF", fontWeight: "700", fontSize: "14px", border: "none", cursor: "pointer", opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "Verifying..." : "Verify with World ID"}
      </button>
      <div style={{ position: "absolute", bottom: "40px", color: "#666666", fontSize: "10px", fontWeight: "bold" }}>
        POWERED BY WORLDCOIN
      </div>
    </div>
  );
}