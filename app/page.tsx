"use client";
import { useEffect } from "react";
import { MiniKit } from "@worldcoin/minikit-js";
import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  // 1. アプリ起動時にMiniKitを初期化
  useEffect(() => {
    MiniKit.install();
  }, []);

  const handleSignIn = async () => {
    // 2. 「ログイン」ポップアップを呼び出す
    const { finalPayload } = await MiniKit.commands.signIn({
      nonce: crypto.randomUUID(), // セキュリティ用のランダムな文字
      expirationTime: new Date(Date.now() + 15 * 60 * 1000), // 有効期限15分
    });

    // 3. ログインに成功したら次の画面へ
    if (finalPayload.status === "error") {
      console.error("ログイン失敗", finalPayload);
    } else {
      console.log("ログイン成功！", finalPayload);
      router.push("/tasks");
    }
  };

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", color: "white" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "40px" }}>CYBERRR</h1>
      
      <button 
        onClick={handleSignIn}
        style={{ width: "80%", maxWidth: "300px", padding: "18px", borderRadius: "99px", backgroundColor: "white", color: "black", fontWeight: "bold", border: "none" }}
      >
        ログインする
      </button>
    </div>
  );
}