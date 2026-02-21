"use client";
import { useEffect, useState } from "react";
// Mini App 用のライブラリを使用する形に変更
import { MiniKit } from "@worldcoin/minikit-js";

export default function AuthPage() {
  const [status, setStatus] = useState("未認証");

  const handleVerify = async () => {
    if (!MiniKit.isInstalled()) {
      setStatus("World App 内で開いてください");
      return;
    }

    // Mini App 特有の認証呼び出し
    const { finalPayload } = await MiniKit.commands.verify({
      action: "verify-human",
      signal: "my_signal",
      verification_level: "orb", // 本物の人間のみ
    });

    if (finalPayload.status === "error") {
      setStatus("認証エラー: " + finalPayload.details);
    } else {
      setStatus("✅ 認証成功！証拠を取得しました");
      console.log(finalPayload);
    }
  };

  return (
    <div style={{ backgroundColor: "#0A0A0A", color: "white", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <h1>CYBERRR Mini App</h1>
      <p>ステータス: {status}</p>
      <button onClick={handleVerify} style={{ padding: "20px", backgroundColor: "#06C755", borderRadius: "99px", color: "white", border: "none" }}>
        World ID で認証
      </button>
    </div>
  );
}