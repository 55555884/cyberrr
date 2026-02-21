"use client";
import { useState } from "react";

export default function TasksPage() {
  const [loading, setLoading] = useState(false);

  const handleStartMission = async () => {
    setLoading(true);
    try {
      const profile = JSON.parse(localStorage.getItem("profile") || "{}");
      const userId = localStorage.getItem("worldid_address") || "guest_user";

      // 1. 作成したAPIルートを叩いて署名済みURLを取得
      const res = await fetch(
        `/api/rapidoreach-uid?userId=${userId}&gender=${profile.gender}&birthYear=${profile.birthYear}&zip=${profile.zip}`
      );
      const data = await res.json();

      if (data.url) {
        // 2. RapidReachの本番URLへジャンプ
        window.location.href = data.url; 
      }
    } catch (e) {
      console.error("Connection failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 w-full max-w-sm text-center">
        <h1 className="text-2xl font-black mb-6">AVAILABLE TASKS</h1>
        <p className="text-zinc-500 text-sm mb-8">あなたの属性に最適な案件を開始します</p>
        
        <button 
          onClick={handleStartMission}
          disabled={loading}
          className="w-full bg-[#00ff00] text-black py-4 rounded-2xl font-black active:scale-95 transition-all shadow-lg"
        >
          {loading ? "接続中..." : "ミッションを開始"}
        </button>
      </div>
    </div>
  );
}