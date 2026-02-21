"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MiniKit } from "@worldcoin/minikit-js";

export default function AuthPage() {
  const router = useRouter();

  // 1. ミニアプリの初期化（これが必須！）
  useEffect(() => {
    if (typeof window !== "undefined") {
      MiniKit.install();
    }
  }, []);

  const handleVerify = async () => {
    try {
      if (!MiniKit.isInstalled()) {
        alert("World App内で開いてください。");
        return;
      }

      // 2. 認証コマンドの実行
      const { finalPayload } = await MiniKit.commands.verify({
        action: "verify-human", // ポータルで設定したAction ID
        signal: "user_session_" + Date.now(), // 毎回変えることでキャッシュを防止
        verification_level: "orb", // 本物のOrb認証者のみ
      });

      // 3. 結果の厳格チェック
      if (finalPayload.status === "success") {
        console.log("Verified!");
        router.push("/tasks"); // 成功時のみ遷移
      } else {
        // 失敗・キャンセル時は何もせず、エラー詳細をログに出す
        console.error("Verification failed:", finalPayload.details);
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <Image src="/名称_未_設定 - 2026-02-19T155633.450 (1) (1).png" alt="Logo" width={120} height={120} priority style={{ borderRadius: "24px" }} />
      </div>

      <button 
        onClick={handleVerify} 
        style={{ width: "100%", maxWidth: "340px", padding: "18px", borderRadius: "99px", background: "linear-gradient(135deg, #06C755, #04a344)", color: "#FFFFFF", fontWeight: "900", border: "none", cursor: "pointer" }}
      >
        ◎ Verify with World ID
      </button>
    </div>
  );
}