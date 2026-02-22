"use client";
import { MiniKit } from "@worldcoin/minikit-js";
import { ReactNode, useEffect } from "react";

export default function MiniKitProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const appId = process.env.NEXT_PUBLIC_WORLD_APP_ID;
      MiniKit.install(appId);
    }
  }, []);

  return <>{children}</>;
}
