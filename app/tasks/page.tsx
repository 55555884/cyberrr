"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const userId = localStorage.getItem("worldid_address") || "user_test";
      const res = await fetch(`/api/missions?userId=${userId}`);
      const data = await res.json();
      setTasks(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen bg-[#F2F2F2] text-black font-sans pb-24">
      {/* TOTAL EARNED 黒カード (デザイン固定) */}
      <div className="bg-[#1C1C1E] text-white p-8 rounded-b-[2.5rem] shadow-xl relative overflow-hidden">
        <p className="text-zinc-500 text-[10px] font-bold uppercase mb-2">Total Earned</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black">$0.00</span>
          <span className="text-[#32D74B] font-bold text-sm">USDC</span>
        </div>
        <div className="absolute top-[-20px] right-[-20px] w-32 h-32 bg-[#32D74B]/20 rounded-full blur-3xl"></div>
      </div>

      <div className="px-6 mt-8">
        <h2 className="text-xl font-black mb-6">Available Tasks</h2>

        <div className="space-y-4">
          {loading ? (
            <div className="animate-pulse bg-white h-32 rounded-[2.5rem]" />
          ) : tasks.length > 0 ? (
            tasks.map((task) => (
              <div key={task.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-zinc-100">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-zinc-100 text-zinc-400 text-[9px] font-black px-3 py-1.5 rounded-lg uppercase">SURVEY</span>
                  <span className="text-black text-xl font-black">${task.reward} <span className="text-[10px] text-zinc-400">USDC</span></span>
                </div>
                <h3 className="text-lg font-black text-zinc-800 mb-6">{task.title}</h3>
                <div className="flex justify-end">
                  <button 
                    onClick={() => window.location.href = task.url}
                    className="bg-black text-white px-8 py-3 rounded-full font-black text-xs active:scale-95 transition-all"
                  >
                    Start →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-zinc-400 font-bold py-10">現在、案件はありません</p>
          )}
        </div>
      </div>

      {/* ナビゲーション (デザイン固定) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-zinc-100 px-8 py-4 flex justify-around items-end">
        <div className="flex flex-col items-center gap-1.5 text-black">
          <div className="text-xl">📋</div>
          <span className="text-[9px] font-black uppercase">Tasks</span>
          <div className="w-1 h-1 bg-[#32D74B] rounded-full"></div>
        </div>
        <div className="text-zinc-300 flex flex-col items-center gap-1.5 opacity-50"><div className="text-xl">🔍</div><span className="text-[9px] font-black uppercase">Search</span></div>
        <div className="text-zinc-300 flex flex-col items-center gap-1.5 opacity-50"><div className="text-xl">🕒</div><span className="text-[9px] font-black uppercase">History</span></div>
        <div className="text-zinc-300 flex flex-col items-center gap-1.5 opacity-50"><div className="text-xl">👤</div><span className="text-[9px] font-black uppercase">Profile</span></div>
      </nav>
    </div>
  );
}