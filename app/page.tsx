"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { IDKitRequestWidget, ISuccessResult } from "@worldcoin/idkit";
import { useState } from "react";

export default function AuthPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleVerify = async (result: ISuccessResult) => {
    localStorage.setItem('worldid_proof', JSON.stringify(result));
    console.log("Verified:", result);
  };

  const onSuccess = () => {
    localStorage.setItem('worldid_verified', 'true');
    router.push("/tasks");
  };

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
      <div style={{ marginBottom: "32px" }}>
        <Image
          src="/名称_未_設定 - 2026-02-19T155633.450 (1) (1).png"
          alt="Logo" width={120} height={120} priority style={{ borderRadius: "24px" }}
        />
      </div>
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <h1 style={{ color: "#FFFFFF", fontSize: "28px", fontWeight: "800", margin: "0 0 8px 0", letterSpacing: "-0.5px" }}>
          Verify World ID to<br/>Unlock Premium Tasks
        </h1>
        <p style={{ color: "#555", fontSize: "13px" }}>Secure access via Worldcoin Protocol</p>
      </div>

      <IDKitRequestWidget
        app_id="app_558e35674ed6ecbb3aaebfeb9f0b6540"
        action="verify-human"
        onSuccess={onSuccess}
        handleVerify={handleVerify}
        verification_level={"device" as any}
        open={open}
        onOpenChange={setOpen}
      />

      <button
        onClick={() => setOpen(true)}
        style={{ width: "100%", maxWidth: "340px", padding: "18px", borderRadius: "99px", background: "linear-gradient(135deg, #06C755, #04a344)", color: "#FFFFFF", fontWeight: "700", fontSize: "14px", border: "none", cursor: "pointer", letterSpacing: "0.5px" }}
      >
        ◎ Verify with World ID
      </button>

      <div style={{ position: "absolute", bottom: "40px", color: "#333", fontSize: "10px", fontWeight: "bold", letterSpacing: "1px" }}>
        POWERED BY WORLDCOIN
      </div>
    </div>
  );
}