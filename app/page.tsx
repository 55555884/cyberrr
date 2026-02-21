"use client";
import { useState } from "react";
import { IDKit, ISuccessResult } from "@worldcoin/idkit";

export default function AuthPage() {
  const [proof, setProof] = useState<string | null>(null);

  const handleVerify = async (result: ISuccessResult) => {
    // 認証が通ると、ここですごく長い「暗号（Proof）」が届きます
    setProof(JSON.stringify(result, null, 2));
  };

  return (
    <div style={{ backgroundColor: "#0A0A0A", color: "white", minHeight: "100vh", padding: "20px" }}>
      <h1>CYBERRR Mini App</h1>
      
      {!proof ? (
        <IDKit
          app_id="app_558e35674ed6ecbb3aaebfeb9f0b6540" 
          action="verify-human"
          onSuccess={() => console.log("Success!")}
          handleVerify={handleVerify}
          verification_level={"orb" as any}
        >
          {({ open }) => (
            <button onClick={open} style={{ padding: "20px", background: "#06C755", borderRadius: "10px", color: "white" }}>
              人間であることを証明する
            </button>
          )}
        </IDKit>
      ) : (
        <div style={{ wordBreak: "break-all", fontSize: "12px", background: "#222", padding: "10px" }}>
          <h3>✅ 認証成功！</h3>
          <p>あなたの認証証拠（Proof）:</p>
          <code>{proof}</code>
        </div>
      )}
    </div>
  );
}