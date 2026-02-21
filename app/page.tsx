"use client";
import { MiniKit } from "@worldcoin/minikit-js";
import { useState } from "react";

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (!MiniKit.isInstalled()) return;

    try {
      // 非同期で最新のwalletAuthを実行
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce: crypto.randomUUID(), // リクエスト毎のNonce生成
        requestId: "0",
        statement: "CYBERRRへのログインを承認してください。",
        expirationTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24時間有効
      });

      if (finalPayload.status === "success") {
        setAddress(finalPayload.address); // 署名済みアドレスの取得
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black">
      <h1 className="text-white text-4xl font-bold mb-8">CYBERRR</h1>
      <button
        onClick={handleSignIn}
        className="bg-[#00ff00] text-black px-8 py-4 rounded-full font-bold"
      >
        World IDでログイン
      </button>
      {address && <p className="text-white mt-4 text-xs">{address}</p>}
    </main>
  );
}