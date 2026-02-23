"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { MiniKit } from "@worldcoin/minikit-js";

export default function AuthPage() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && MiniKit.isInstalled()) {
      const profile = localStorage.getItem("profile");
      if (profile) {
        router.replace("/tasks");
      } else {
        router.replace("/profile/setup");
      }
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-black mb-8 italic text-[#06C755]">CYBERRR</h1>
      <p className="text-zinc-500 mb-8">Please open in World App to start.</p>
    </div>
  );
}