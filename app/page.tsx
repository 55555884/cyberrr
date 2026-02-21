"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IDKit, ISuccessResult } from "@worldcoin/idkit";

export default function AuthPage() {
  const router = useRouter();

  const handleVerify = async (result: ISuccessResult) => {
    // 認証データを保存
    localStorage.setItem('worldid_proof', JSON.stringify(result));
  };

  const onSuccess = () => {
    localStorage.setItem('worldid_verified', 'true');
    // 認証成功後のページへ
    router.push("/tasks");
  };

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <Image src="/名称_未_設定 - 2026-02-19T155633.450 (1) (1).png" alt="Logo" width={120} height={120} priority style={{ borderRadius: "24px" }} />
      </div>

      <IDKit
        app_id="app_558e35674ed6ecbb3aaebfeb9f0b6540" 
        action="verify-human"
        onSuccess={onSuccess}
        handleVerify={handleVerify}
        verification_level={"device" as any}
      >
        {({ open }) => (
          <button 
            onClick={open} 
            style={{ width: "100%", maxWidth: "340px", padding: "18px", borderRadius: "99px", background: "linear-gradient(135deg, #06C755, #04a344)", color: "#FFFFFF", fontWeight: "700", border: "none", cursor: "pointer" }}
          >
            ◎ Verify with World ID
          </button>
        )}
      </IDKit>

      <div style={{ position: "absolute", bottom: "40px", color: "#333", fontSize: "10px", fontWeight: "bold" }}>
        POWERED BY WORLDCOIN
      </div>
    </div>
  );
}