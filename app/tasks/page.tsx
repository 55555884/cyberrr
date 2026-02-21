"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [taskUrl, setTaskUrl] = useState("");
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    async function initTasks() {
      // 1. プロフィールを勝手に呼び出し
      const savedProfile = JSON.parse(localStorage.getItem("profile") || "{}");
      const userId = localStorage.getItem("worldid_address") || "guest_user";
      setProfile(savedProfile);

      // 2. APIを叩いて互換性のあるURLを取得
      const res = await fetch(`/api/tasks?userId=${userId}&gender=${savedProfile.gender}&birthYear=${savedProfile.birthYear}`);
      const data = await res.json();
      if (data.url) setTaskUrl(data.url);
    }
    initTasks();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-24">
      <header className="mb-8 pt-4">
        <h1 className="text-2xl font-black italic tracking-tighter text-[#00ff00]">AVAILABLE TASKS</h1>
        <p className="text-zinc-500 text-[10px] font-bold mt-1 uppercase">
          {profile ? `${profile.gender} / ${profile.job} 向けの最適案件` : "読み込み中..."}
        </p>
      </header>

      {/* 自動生成されたタスクカード */}
      <div className="grid gap-4">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-[2rem] relative group">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[#00ff00] text-[10px] font-black border border-[#00ff00]/30 px-2 py-1 rounded">PREMIUM</span>
            <span className="text-[#00ff00] text-xl font-black">1.50 USDC</span>
          </div>
          <h3 className="text-lg font-bold mb-6">属性マッチング・アンケート</h3>
          <a 
            href={taskUrl} 
            target="_blank" 
            className="block w-full bg-white text-black py-4 rounded-2xl font-black text-center text-sm active:scale-95 transition-all"
          >
            タスクを開始する
          </a>
        </div>
      </div>

      {/* 下部ナビゲーション */}
      <nav className="fixed bottom-8 left-6 right-6">
        <div className="bg-zinc-900/80 backdrop-blur-2xl border border-zinc-800/50 p-2 rounded-full flex justify-around items-center">
          <button className="bg-[#00ff00] text-black px-6 py-2 rounded-full text-xs font-black">Tasks</button>
          <button className="text-zinc-500 text-xs font-black">History</button>
          <button className="text-zinc-500 text-xs font-black">Profile</button>
        </div>
      </nav>
    </div>
  );
}