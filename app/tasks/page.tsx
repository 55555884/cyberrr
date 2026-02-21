"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMissions() {
      try {
        const userId = localStorage.getItem("worldid_address") || "test-user";
        // さっき成功が確認できたAPIを叩く
        const res = await fetch(`/api/tasks?userId=${userId}`);
        const data = await res.json();
        // image_884601.png の構造に合わせて tasks をセット
        setTasks(data.tasks || []);
      } catch (e) {
        console.error("Fetch error", e);
      } finally {
        setLoading(false);
      }
    }
    fetchMissions();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 font-sans">
      <header className="mb-8 pt-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-black italic tracking-tighter">CYBERRR</h1>
          <div className="flex gap-3">
            <button className="text-xl">🔔</button>
            <button className="text-xl text-zinc-600">👤</button>
          </div>
        </div>
        <h2 className="text-2xl font-black mb-4">AVAILABLE TASKS</h2>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {["ALL", "SURVEY", "OFFER", "VIDEO"].map((cat, i) => (
            <button key={cat} className={`px-5 py-2 rounded-full text-[10px] font-black ${i === 0 ? 'bg-[#00ff00] text-black' : 'bg-zinc-900 text-zinc-500'}`}>
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="grid gap-4">
        {loading ? (
          <div className="animate-pulse space-y-4">
            {[1, 2].map(i => <div key={i} className="h-40 bg-zinc-900 rounded-[2rem]" />)}
          </div>
        ) : (
          tasks.map((task) => (
            <div 
              key={task.id} 
              onClick={() => window.location.href = task.url}
              className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-[2.5rem] active:scale-[0.98] transition-all cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="bg-[#00ff00]/10 text-[#00ff00] text-[9px] font-black px-2 py-1 rounded border border-[#00ff00]/20 uppercase">
                  {task.id.startsWith('rr') ? 'SURVEY' : 'TASK'}
                </span>
                <span className="text-[#00ff00] font-black text-lg">{task.reward}</span>
              </div>
              <h3 className="text-lg font-bold mb-4 pr-10 leading-tight">{task.title}</h3>
              <div className="flex items-center gap-3 text-zinc-500 text-[10px] font-bold">
                <span>⏱ {task.time}</span>
                <span>★ 4.5</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ナビゲーション */}
      <nav className="fixed bottom-8 left-6 right-6">
        <div className="bg-zinc-900/80 backdrop-blur-3xl border border-zinc-800/50 p-2 rounded-full flex justify-around items-center shadow-2xl">
          <button className="text-[#00ff00] px-6 py-2 rounded-full text-[10px] font-black">Tasks</button>
          <button className="text-zinc-600 px-6 py-2 text-[10px] font-black">Search</button>
          <button className="text-zinc-600 px-6 py-2 text-[10px] font-black">History</button>
          <button className="text-zinc-600 px-6 py-2 text-[10px] font-black">Profile</button>
        </div>
      </nav>
    </div>
  );
}