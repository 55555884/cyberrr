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
      // signIn ではなく最新の walletAuth を使用
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
    <main className="flex min-h-screen flex-col items-center justify-center bg-black text-white p-6">
      <h1 className="text-6xl font-black mb-12 tracking-tighter italic">CYBERRR</h1>
      
      {!address ? (
        <button
          onClick={handleSignIn}
          className="bg-[#00ff00] text-black px-12 py-5 rounded-full font-bold text-2xl active:scale-90 transition-all shadow-[0_0_20px_rgba(0,255,0,0.4)]"
        >
          World ID ログイン
        </button>
      ) : (
        <div className="bg-zinc-900 p-8 rounded-3xl border border-zinc-800 w-full max-w-sm text-center shadow-2xl">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-green-500 text-3xl">✓</span>
          </div>
          <p className="text-green-400 font-bold text-xl mb-2">認証完了</p>
          <p className="text-[10px] text-zinc-500 break-all font-mono">{address}</p>
        </div>
      )}
    </main>
  );
}