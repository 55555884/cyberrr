"use client";
import { MiniKit } from "@worldcoin/minikit-js";
import { useState } from "react";

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (!MiniKit.isInstalled()) {
      alert("World App内で開いてください");
      return;
    }

    try {
      // エラーの原因だった signIn ではなく walletAuth を使用
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce: crypto.randomUUID(),
        requestId: "0",
        statement: "CYBERRRへのログインを承認してください。",
        expirationTime: new Date(Date.now() + 1000 * 60 * 60 * 24),
      });

      if (finalPayload.status === "success") {
        setAddress(finalPayload.address);
        console.log("ログイン成功:", finalPayload.address);
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-black text-white">
      <h1 className="text-4xl font-bold mb-8">CYBERRR</h1>
      
      {!address ? (
        <button
          onClick={handleSignIn}
          className="bg-[#00ff00] text-black px-8 py-4 rounded-full font-bold text-xl hover:opacity-80 transition-all"
        >
          World IDでログイン
        </button>
      ) : (
        <div className="text-center">
          <p className="text-green-400 mb-2">認証済み</p>
          <p className="text-sm break-all">{address}</p>
        </div>
      )}
    </main>
  );
}