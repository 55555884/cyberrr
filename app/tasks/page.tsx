"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [taskUrl, setTaskUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getTask() {
      try {
        // localStorageから勝手にプロフィールを呼び出す
        const saved = JSON.parse(localStorage.getItem("profile") || "{}");
        const userId = localStorage.getItem("worldid_address") || "guest_user";

        // APIルート (/api/tasks) を叩く
        const res = await fetch(`/api/tasks?userId=${userId}&gender=${saved.gender}&birthYear=${saved.birthYear}`);
        const data = await res.json();
        
        if (data.url) setTaskUrl(data.url);
      } catch (e) {
        console.error("API接続失敗", e);
      } finally {
        setLoading(false);
      }
    }
    getTask();
  }, []);

  const handleStart = () => {
    if (taskUrl) window.location.href = taskUrl;
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-2xl font-black mb-8 italic">AVAILABLE TASKS</h1>
      
      <div 
        onClick={handleStart}
        className={`bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] transition-all ${loading ? 'opacity-50' : 'active:scale-95'}`}
      >
        <div className="flex justify-between items-start mb-4">
          <span className="text-[#00ff00] text-[10px] font-black border border-[#00ff00]/30 px-2 py-1 rounded">LIVE</span>
          <span className="text-[#00ff00] text-xl font-black">1.50 USDC</span>
        </div>
        <h3 className="text-lg font-bold mb-4">プレミアムアンケート</h3>
        <p className="text-zinc-500 text-sm mb-6">あなたの属性に最適化された案件を読み込み済み</p>
        <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm">
          {loading ? "読み込み中..." : "タスクを開始する"}
        </button>
      </div>
    </div>
  );
}