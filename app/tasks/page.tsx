"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function TasksPage() {
  const router = useRouter();
  const [iframeUrl, setIframeUrl] = useState("");

  useEffect(() => {
    async function loadIframe() {
      if (typeof window === "undefined") return;
      const profile = JSON.parse(localStorage.getItem("profile") || "{}");
      const userId = localStorage.getItem("worldid_address") || "guest";

      const res = await fetch(
        `/api/rapidoreach-uid?userId=${userId}&gender=${profile.gender}&birthYear=${profile.birthYear}&birthMonth=${profile.birthMonth}&birthDay=${profile.birthDay}&zip=${profile.zipCode}&city=${profile.city}`
      );
      const data = await res.json();
      if (data.url) setIframeUrl(data.url);
    }
    loadIframe();
  }, []);

  return (
    <div className="fixed inset-0 bg-[#ECECEC] flex flex-col font-['DM_Sans']">
      {/* 独自ヘッダー */}
      <header className="h-16 bg-white border-b flex items-center px-4 z-50">
        <button 
          onClick={() => router.back()}
          className="bg-zinc-100 px-4 py-2 rounded-lg text-sm font-bold"
        >
          ← 戻る
        </button>
        <h1 className="ml-4 font-black text-lg">アンケート一覧</h1>
      </header>

      {/* iframe表示エリア */}
      <div className="flex-1 w-full relative">
        {iframeUrl ? (
          <iframe src={iframeUrl} className="w-full h-full border-none" allow="geolocation" />
        ) : (
          <div className="flex items-center justify-center h-full">Loading...</div>
        )}
      </div>
    </div>
  );
}