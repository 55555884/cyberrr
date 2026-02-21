"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [loading, setLoading] = useState(false);

  const handleStartMission = async () => {
    setLoading(true);
    try {
      const profile = JSON.parse(localStorage.getItem("profile") || "{}");
      const userId = localStorage.getItem("worldid_address") || "guest_user";

      // 1. 自作したAPIルートへデータを送ってURLをもらう
      const res = await fetch(
        `/api/rapidoreach-uid?userId=${userId}&gender=${profile.gender}&birthYear=${profile.birthYear}&zip=${profile.zip}`
      );
      const data = await res.json();

      if (data.url) {
        // 2. 署名済みの本番URLへリダイレクト
        window.location.href = data.url; 
      } else {
        alert("URLの取得に失敗しました");
      }
    } catch (error) {
      console.error("Connection failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col items-center justify-center">
      <div className="bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-800 w-full max-w-sm text-center">
        <h2 className="text-[#00ff00] text-xs font-bold uppercase tracking-widest mb-4">Live Mission</h2>
        <h1 className="text-2xl font-black mb-6">高単価アンケート</h1>
        <p className="text-zinc-500 text-sm mb-8">属性に最適化された案件を開始します</p>
        
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