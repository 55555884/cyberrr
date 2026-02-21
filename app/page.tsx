"use client";
import { MiniKit } from "@worldcoin/minikit-js";
import { useState } from "react";

export default function Home() {
  const [address, setAddress] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (!MiniKit.isInstalled()) {
      alert("World App内で実行してください。");
      return;
    }

    try {
      // エラーの原因だった signIn ではなく walletAuth を使用
      const { finalPayload } = await MiniKit.commandsAsync.walletAuth({
        nonce: crypto.randomUUID(),
        requestId: "0",
        statement: "CYBERRRへのログインを承認してください。",
        expirationTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24時間有効
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-5xl font-extrabold mb-10 tracking-tighter">CYBERRR</h1>
      
      {!address ? (
        <button
          onClick={handleSignIn}
          className="bg-[#00ff00] text-black px-10 py-5 rounded-full font-bold text-xl active:scale-95 transition-transform"
        >
          World IDでログイン
        </button>
      ) : (
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 w-full max-w-sm text-center">
          <p className="text-green-400 font-bold mb-2">認証に成功しました</p>
          <p className="text-xs text-zinc-500 break-all">{address}</p>
        </div>
      )}
    </main>
  );
}