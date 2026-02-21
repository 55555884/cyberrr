"use client";
import { useEffect, useState } from "react";
import { MiniKit } from "@worldcoin/minikit-js";

export default function AuthPage() {
  const [debugData, setDebugData] = useState<string>("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      MiniKit.install();
    }
  }, []);

  const handleVerify = async () => {
    try {
      setDebugData("認証リクエスト送信中...");
      
      const { finalPayload } = await MiniKit.commands.verify({
        action: "verify-human",
        signal: "debug_session_" + Date.now(),
        verification_level: "orb", 
      });

      if (finalPayload.status === "success") {
        // 認証に成功した証拠（Proof）を画面に表示する
        setDebugData("✅ 認証成功！\nデータ: " + JSON.stringify(finalPayload, null, 2));
      } else {
        setDebugData("❌ 認証失敗またはキャンセル\n詳細: " + finalPayload.details);
      }
    } catch (error) {
      setDebugData("⚠️ システムエラー: " + error);
    }
  };

  return (
    <div style={{ backgroundColor: "#0A0A0A", color: "white", minHeight: "100vh", padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ fontSize: "20px", marginBottom: "20px" }}>World ID Debugger</h1>
      
      <button 
        onClick={handleVerify} 
        style={{ padding: "15px 30px", background: "#06C755", borderRadius: "99px", color: "white", fontWeight: "bold", border: "none", marginBottom: "20px" }}
      >
        認証テスト実行
      </button>

      {debugData && (
        <div style={{ background: "#1A1A1A", padding: "15px", borderRadius: "10px", width: "100%", wordBreak: "break-all" }}>
          <pre style={{ fontSize: "12px", whiteSpace: "pre-wrap" }}>{debugData}</pre>
        </div>
      )}
    </div>
  );
}