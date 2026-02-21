"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [loading, setLoading] = useState(false);

  const startMission = async () => {
    setLoading(true);
    try {
      const profile = JSON.parse(localStorage.getItem("profile") || "{}");
      const userId = localStorage.getItem("worldid_address") || "guest";

      // 自作したAPIルートから署名付きURLを取得
      const res = await fetch(`/api/rapidoreach-uid?userId=${userId}&gender=${profile.gender}&birthYear=${profile.birthYear}`);
      const data = await res.json();

      if (data.url) {
        window.open(data.url, "_blank"); // 案件画面へジャンプ
      }
    } catch (error) {
      console.error("Mission start error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-black mb-8 text-[#00ff00]">AVAILABLE MISSIONS</h1>
      <div className="bg-zinc-900 p-8 rounded-[2rem] border border-zinc-800">
        <h2 className="text-xl font-bold mb-4 text-white">RapidReach アンケート</h2>
        <p className="text-zinc-500 text-sm mb-6">あなたの属性に最適化された高単価案件を開始します。</p>
        <button 
          onClick={startMission}
          disabled={loading}
          className="w-full bg-[#00ff00] text-black py-4 rounded-2xl font-black active:scale-95 transition-all"
        >
          {loading ? "準備中..." : "案件サイトへ移動"}
        </button>
      </div>
    </div>
  );
}