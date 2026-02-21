"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { MiniKit } from "@worldcoin/minikit-js";

export default function AuthPage() {
  const router = useRouter();

  const handleVerify = async () => {
    try {
      // 1. World App に認証をリクエスト
      const { finalPayload } = await MiniKit.commands.verify({
        action: "verify-human", // Developer Portalで設定したAction名
        signal: "user_auth",
        verification_level: "orb", // Orb認証済みのみ許可
      });

      // 2. 認証結果の判定
      if (finalPayload.status === "success") {
        console.log("認証成功！");
        // 成功した時だけプロフィールへ飛ばす
        router.push("/profile/setup");
      } else {
        // 失敗・キャンセル時はここで止まる
        alert("認証がキャンセルされたか、失敗しました。");
      }
    } catch (error) {
      console.error("認証エラー:", error);
      alert("World App内から実行してください。");
    }
  };

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <Image src="/名称_未_設定 - 2026-02-19T155633.450 (1) (1).png" alt="Logo" width={120} height={120} priority style={{ borderRadius: "24px" }} />
      </div>

      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ color: "#FFFFFF", fontSize: "28px", fontWeight: "800", margin: "0 0 8px 0" }}>Verify World ID</h1>
        <p style={{ color: "#555", fontSize: "14px" }}>Secure access via Worldcoin Protocol</p>
      </div>

      <button 
        onClick={handleVerify} 
        style={{ width: "100%", maxWidth: "340px", padding: "18px", borderRadius: "99px", background: "linear-gradient(135deg, #06C755, #04a344)", color: "#FFFFFF", fontWeight: "700", border: "none", cursor: "pointer" }}
      >
        ◎ Verify with World ID
      </button>
    </div>
  );
}