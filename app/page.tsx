"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
// 最新版のIDKitを使用
import { IDKit, ISuccessResult } from "@worldcoin/idkit";

export default function AuthPage() {
  const router = useRouter();

  // 認証が成功した際に、その証明（Proof）を受け取る関数
  const handleVerify = async (result: ISuccessResult) => {
    console.log("Verified successfully with World ID:", result);
    // 認証データをブラウザに保存
    localStorage.setItem('worldid_proof', JSON.stringify(result));
  };

  // 認証完了後に自動で実行される処理
  const onSuccess = () => {
    localStorage.setItem('worldid_verified', 'true');
    // 次のタスク一覧画面へ移動
    router.push("/tasks");
  };

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px", fontFamily: "sans-serif" }}>
      
      {/* ロゴ部分 */}
      <div style={{ marginBottom: "32px" }}>
        <Image 
          src="/名称_未_設定 - 2026-02-19T155633.450 (1) (1).png" 
          alt="Logo" 
          width={120} 
          height={120} 
          priority 
          style={{ borderRadius: "24px" }} 
        />
      </div>

      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ color: "#FFFFFF", fontSize: "28px", fontWeight: "800", margin: "0 0 8px 0", lineHeight: "1.2" }}>
          Verify World ID to<br/>Unlock Premium Tasks
        </h1>
        <p style={{ color: "#555", fontSize: "14px" }}>Secure access via Worldcoin Protocol</p>
      </div>

      {/* World ID 認証コンポーネント */}
      <IDKit
        app_id="app_558e35674ed6ecbb3aaebfeb9f0b6540" 
        action="verify-human"
        onSuccess={onSuccess}
        handleVerify={handleVerify}
        // "orb" に設定することで、シミュレーターを拒否し、実際のOrb認証を要求します
        verification_level={"orb" as any}
      >
        {({ open }) => (
          <button 
            onClick={open} 
            style={{ 
              width: "100%", 
              maxWidth: "340px", 
              padding: "20px", 
              borderRadius: "99px", 
              background: "linear-gradient(135deg, #06C755, #04a344)", 
              color: "#FFFFFF", 
              fontWeight: "900", 
              fontSize: "16px",
              border: "none", 
              cursor: "pointer",
              boxShadow: "0 10px 20px rgba(6, 199, 85, 0.2)"
            }}
          >
            ◎ Verify with World ID
          </button>
        )}
      </IDKit>

      <div style={{ position: "absolute", bottom: "40px", color: "#333", fontSize: "10px", fontWeight: "bold", letterSpacing: "1px" }}>
        POWERED BY WORLDCOIN
      </div>
    </div>
  );
}