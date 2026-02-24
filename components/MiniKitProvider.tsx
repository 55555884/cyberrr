"use client";
import { ReactNode, useEffect } from "react";
import { initializeMiniKit, isInWorldAppMiniapp } from "@/lib/minikit-utils";

export default function MiniKitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // World App miniapp 環境確認
    if (!isInWorldAppMiniapp()) {
      if (process.env.NODE_ENV === "development") {
        console.warn("[MiniKitProvider] World App miniapp 環境で実行してください");
      }
      return;
    }

    // MiniKit 初期化（複数回実行されても安全）
    const result = initializeMiniKit();

    if (process.env.NODE_ENV === "development") {
      console.log("[MiniKitProvider] 初期化結果:", result ? "✅ 成功" : "❌ 失敗");
    }
  }, []);

  return <>{children}</>;
}
