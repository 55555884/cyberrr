"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();
  const [iframeUrl, setIframeUrl] = useState("");

  useEffect(() => {
    async function init() {
      const profileData = localStorage.getItem("profile");
      if (!profileData) {
        router.push("/profile/setup");
        return;
      }
      const profile = JSON.parse(profileData);
      const userId = localStorage.getItem("worldid_address") || "user_test";

      // 調査報告書に基づいた詳細パラメータの送信
      const query = new URLSearchParams({
        userId,
        gender: profile.gender,
        birthYear: profile.birthYear,
        zip: profile.zipCode,
        prefecture: profile.prefecture, // ISO変換用に都道府県を渡す
        city: profile.city
      });

      const res = await fetch(`/api/rapidoreach-uid?${query.toString()}`);
      const data = await res.json();
      if (data.url) setIframeUrl(data.url);
    }
    init();
  }, [router]);

  return (
    <div className="fixed inset-0 flex flex-col bg-[#ECECEC]">
      <header className="h-16 bg-white border-b flex items-center px-6 z-50 justify-between">
        <button onClick={() => router.back()} className="font-black text-xs bg-zinc-100 px-4 py-2 rounded-xl">← 戻る</button>
        <span className="font-black italic text-sm tracking-widest">CYBERRR SURVEYS</span>
        <div className="w-10"></div>
      </header>
      <div className="flex-1 relative">
        {iframeUrl ? (
          <iframe src={iframeUrl} className="w-full h-full border-none" allow="geolocation" />
        ) : (
          <div className="h-full flex items-center justify-center text-zinc-400 animate-pulse font-black text-xs uppercase tracking-widest">
            Connecting Securely...
          </div>
        )}
      </div>
    </div>
  );
}