"use client";
import { ReactNode, useEffect } from "react";
import { initializeMiniKit } from "@/lib/minikit-utils";

export default function MiniKitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // MiniKit を初期化する（World App miniapp WebView 内でのみ有効）
    // initializeMiniKit() は内部でエラーハンドリングを行うため、ここでは結果を確認するだけ
    const initialized = initializeMiniKit();

    // 開発環境での初期化結果をログ出力する
    if (process.env.NODE_ENV === "development") {
      console.log("[MiniKitProvider] 初期化結果:", initialized ? "成功" : "失敗（World App 外）");
    }
  }, []);

  return <>{children}</>;
}
