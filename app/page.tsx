"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MiniKit } from "@worldcoin/minikit-js";
import { useState, useEffect } from "react";

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [miniKitReady, setMiniKitReady] = useState(false);

  // ?reset=1 でアクセスすると localStorage をクリアして初回状態に戻す
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("reset") === "1") {
      localStorage.removeItem("profile");
      localStorage.removeItem("worldid_verified");
      window.history.replaceState({}, "", "/");
    }
  }, []);

  // MiniKit の準備が整っているか確認
  useEffect(() => {
    const check = setInterval(() => {
      if (MiniKit.isInstalled()) {
        setMiniKitReady(true);
        clearInterval(check);
      }
    }, 200);
    // 3秒後に諦める（World App 外の場合）
    const timeout = setTimeout(() => {
      clearInterval(check);
      setMiniKitReady(false);
    }, 3000);
    return () => {
      clearInterval(check);
      clearTimeout(timeout);
    };
  }, []);

  const handleSignIn = async () => {
    if (!MiniKit.isInstalled()) {
      setError("World App から開いてください / Please open via World App");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const nonce = crypto.randomUUID().replace(/-/g, "");
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce,
        statement: "Sign in to CYBERRR",
      });

      if (finalPayload.status === "success") {
        localStorage.setItem("worldid_verified", "true");
        const profile = localStorage.getItem("profile");
        if (profile) {
          router.replace("/tasks");
        } else {
          router.replace("/profile/setup");
        }
      } else {
        setError("認証がキャンセルされました。もう一度お試しください。");
      }
    } catch (e) {
      console.error("Auth error:", e);
      const msg = e instanceof Error ? e.message : String(e);
      setError(`認証エラー: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#ECECEC", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <Image src="/名称_未_設定 - 2026-02-19T155633.450 (1) (1).png" alt="Logo" width={120} height={120} priority style={{ borderRadius: "24px" }} />
      </div>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ color: "#111111", fontSize: "28px", fontWeight: "800", margin: "0 0 8px 0" }}>
          Verify World ID to<br />Unlock Premium Tasks
        </h1>
        <p style={{ color: "#666666", fontSize: "13px" }}>Secure access via Worldcoin Protocol</p>
      </div>

      <button
        onClick={handleSignIn}
        disabled={loading}
        style={{
          width: "100%",
          maxWidth: "340px",
          padding: "18px",
          borderRadius: "99px",
          background: "linear-gradient(135deg, #06C755, #04a344)",
          color: "#FFFFFF",
          fontWeight: "700",
          fontSize: "14px",
          border: "none",
          cursor: loading ? "default" : "pointer",
          opacity: loading ? 0.7 : 1,
        }}
      >
        {loading ? "Verifying..." : "Verify with World ID"}
      </button>

      {error && (
        <p style={{ color: "#FF3B30", fontSize: "12px", marginTop: "16px", textAlign: "center", maxWidth: "300px", lineHeight: 1.5 }}>{error}</p>
      )}

      {/* World App 外でのデバッグ用ステータス */}
      {!miniKitReady && !loading && (
        <p style={{ color: "#AAAAAA", fontSize: "10px", marginTop: "24px", textAlign: "center" }}>
          World App で開いてください
        </p>
      )}

      <div style={{ position: "absolute", bottom: "40px", color: "#666666", fontSize: "10px", fontWeight: "bold" }}>
        POWERED BY WORLDCOIN
      </div>
    </div>
  );
}
