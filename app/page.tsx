"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MiniKit } from "@worldcoin/minikit-js";
import { useState, useEffect } from "react";

export default function AuthPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (MiniKit.isInstalled()) {
      const profile = localStorage.getItem("profile");
      if (profile) {
        router.replace("/tasks");
      } else {
        router.replace("/profile/setup");
      }
    }
  }, []);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const nonce = Math.random().toString(36).substring(2);
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce,
        statement: "Sign in to CYBERRR",
      });
      if (finalPayload.status === "success") {
        localStorage.setItem("worldid_verified", "true");
        router.replace("/profile/setup");
      }
    } catch (error) {
      console.error("Auth error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <Image src="/名称_未_設定 - 2026-02-19T155633.450 (1) (1).png" alt="Logo" width={120} height={120} priority style={{ borderRadius: "24px" }} />
      </div>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ color: "#FFFFFF", fontSize: "28px", fontWeight: "800", margin: "0 0 8px 0" }}>
          Verify World ID to<br/>Unlock Premium Tasks
        </h1>
        <p style={{ color: "#555", fontSize: "13px" }}>Secure access via Worldcoin Protocol</p>
      </div>
      <button
        onClick={handleSignIn}
        disabled={loading}
        style={{ width: "100%", maxWidth: "340px", padding: "18px", borderRadius: "99px", background: "linear-gradient(135deg, #06C755, #04a344)", color: "#FFFFFF", fontWeight: "700", fontSize: "14px", border: "none", cursor: "pointer", opacity: loading ? 0.7 : 1 }}
      >
        {loading ? "Verifying..." : "Verify with World ID"}
      </button>
      <div style={{ position: "absolute", bottom: "40px", color: "#333", fontSize: "10px", fontWeight: "bold" }}>
        POWERED BY WORLDCOIN
      </div>
    </div>
  );
}