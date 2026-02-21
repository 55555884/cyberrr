"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [taskUrl, setTaskUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConfig() {
      try {
        // 保存されたプロフィールを勝手に呼び出す
        const profile = JSON.parse(localStorage.getItem("profile") || "{}");
        const userId = localStorage.getItem("worldid_address") || "guest_user";

        // APIから署名済みURLを取得
        const res = await fetch(`/api/tasks?userId=${userId}&gender=${profile.gender}&birthYear=${profile.birthYear}`);
        const data = await res.json();
        
        if (data.url) setTaskUrl(data.url);
      } catch (e) {
        console.error("API接続失敗", e);
      } finally {
        setLoading(false);
      }
    }
    loadConfig();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <header className="mb-10 pt-4">
        <h1 className="text-3xl font-black italic tracking-tighter text-[#00ff00]">AVAILABLE TASKS</h1>
        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mt-1">
          {loading ? "AUTHENTICATING..." : "PROFILE SYNCED"}
        </p>
      </header>

      <div className="grid gap-6">
        {/* 1.50 USDC のタスクカードデザイン (image.pngに準拠) */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] relative active:scale-[0.98] transition-all">
          <div className="flex justify-between items-start mb-6">
            <span className="text-[10px] font-black text-[#00ff00] bg-[#00ff00]/10 px-3 py-1 rounded-full border border-[#00ff00]/20 uppercase">
              Survey
            </span>
            <span className="text-[#00ff00] text-2xl font-black italic">1.50 USDC</span>
          </div>
          <h3 className="text-xl font-bold mb-8">Consumer Trend Survey</h3>
          <button 
            onClick={() => taskUrl && (window.location.href = taskUrl)}
            disabled={!taskUrl}
            className="w-full bg-white text-black py-5 rounded-2xl font-black text-sm shadow-xl"
          >
            {loading ? "読み込み中..." : "タスクを開始する"}
          </button>
        </div>
      </div>

      {/* タブバー (image.pngに準拠) */}
      <nav className="fixed bottom-8 left-6 right-6">
        <div className="bg-zinc-900/80 backdrop-blur-3xl border border-zinc-800/50 p-2 rounded-full flex justify-around items-center">
          <button className="bg-[#00ff00] text-black px-8 py-3 rounded-full text-xs font-black">Tasks</button>
          <button className="text-zinc-500 text-xs font-black">Search</button>
          <button className="text-zinc-500 text-xs font-black">History</button>
        </div>
      </nav>
    </div>
  );
}