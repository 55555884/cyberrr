"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const missions = [
    {
      id: 1,
      title: "Consumer Trend Survey",
      reward: "1.50",
      time: "5 min",
      rating: "4.5",
      category: "SURVEY"
    },
    {
      id: 2,
      title: "Daily Lifestyle Feedback",
      reward: "0.75",
      time: "5 min",
      rating: "4.5",
      category: "SURVEY"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* ヘッダーセクション */}
      <header className="p-6 pt-10 flex justify-between items-center">
        <h1 className="text-3xl font-black italic tracking-tighter">CYBERRR</h1>
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-xl">🔔</div>
          <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-xl">👤</div>
        </div>
      </header>

      <main className="px-6">
        <h2 className="text-3xl font-bold mb-2">AVAILABLE TASKS</h2>
        <p className="text-zinc-500 text-sm mb-8">Complete tasks to earn USDC instantly</p>

        {/* カテゴリタブ */}
        <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar">
          {["ALL", "SURVEY", "OFFER", "VIDEO"].map((tab) => (
            <button key={tab} className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest ${tab === "ALL" ? 'bg-[#00ff00] text-black' : 'bg-zinc-900 text-zinc-500'}`}>
              {tab}
            </button>
          ))}
        </div>

        {/* 案件カードリスト */}
        <div className="space-y-4">
          {missions.map((m) => (
            <div key={m.id} className="bg-zinc-900/50 border border-zinc-800/50 p-6 rounded-[2rem] active:scale-[0.98] transition-all">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-zinc-800 text-[#00ff00] text-[9px] font-black px-3 py-1 rounded-md uppercase tracking-widest">
                  {m.category}
                </span>
                <span className="text-[#00ff00] text-xl font-black">{m.reward} USDC</span>
              </div>
              
              <h3 className="text-xl font-bold mb-4">{m.title}</h3>
              
              <div className="flex items-center gap-4 text-zinc-500 text-xs font-bold">
                <span className="flex items-center gap-1.5">⏱ {m.time}</span>
                <span className="flex items-center gap-1.5">★ {m.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* フッターナビゲーション */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-xl border-t border-zinc-800 px-8 py-6 flex justify-around items-center">
        <div className="flex flex-col items-center gap-1 text-[#00ff00]">
          <span className="text-xl">📋</span>
          <span className="text-[10px] font-bold">Tasks</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-zinc-600">
          <span className="text-xl">🔍</span>
          <span className="text-[10px] font-bold">Search</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-zinc-600">
          <span className="text-xl">📋</span>
          <span className="text-[10px] font-bold">History</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-zinc-600">
          <span className="text-xl">👤</span>
          <span className="text-[10px] font-bold">Profile</span>
        </div>
      </nav>
    </div>
  );
}