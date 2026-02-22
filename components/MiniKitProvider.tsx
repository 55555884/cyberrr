"use client";
import { MiniKit } from "@worldcoin/minikit-js";
import { ReactNode, useEffect } from "react";

export default function MiniKitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // World Mini App では app_id を渡して install する
    MiniKit.install(process.env.NEXT_PUBLIC_WORLD_APP_ID ?? "");
  }, []);

  return <>{children}</>;
}
