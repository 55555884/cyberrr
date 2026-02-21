"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMissions() {
      try {
        const userId = localStorage.getItem("worldid_address") || "test-user";
        // ブラウザで成功が確認できたURLを叩く
        const res = await fetch(`/api/tasks?userId=${userId}`);
        const data = await res.json();
        
        // image_884601.png の構造通り、data.tasks をセットする
        if (data.tasks) {
          setTasks(data.tasks);
        }
      } catch (e) {
        console.error("データの取得に失敗しました", e);
      } finally {
        setLoading(false);
      }
    }
    fetchMissions();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 font-sans selection:bg-[#00ff00]/30">
      <header className="mb-10 pt-4 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter leading-none">CYBERRR</h1>
          <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Available Tasks</p>
        </div>
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center text-xl">🔔</div>
          <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-xl overflow-hidden text-zinc-600">👤</div>
        </div>
      </header>

      {/* カテゴリタブ */}
      <div className="flex gap-3 mb-8 overflow-x-auto no-scrollbar">
        {["ALL", "SURVEY", "OFFER", "VIDEO"].map((cat, i) => (
          <button key={cat} className={`px-6 py-2 rounded-full text-[10px] font-black transition-colors ${i === 0 ? 'bg-[#00ff00] text-black' : 'bg-zinc-900 text-zinc-500 hover:text-white'}`}>
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-5">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            {[1, 2].map(i => <div key={i} className="h-44 bg-zinc-900 rounded-[2.5rem]" />)}
          </div>
        ) : tasks.length > 0 ? (
          tasks.map((task) => (
            <div 
              key={task.id} 
              onClick={() => window.location.href = task.url}
              className="bg-zinc-900/40 border border-zinc-800/50 p-7 rounded-[2.5rem] active:scale-[0.97] transition-all cursor-pointer group hover:border-[#00ff00]/30"
            >
              <div className="flex justify-between items-start mb-6">
                <span className="bg-[#00ff00]/10 text-[#00ff00] text-[9px] font-black px-3 py-1 rounded-lg border border-[#00ff00]/20 uppercase tracking-widest">
                  SURVEY
                </span>
                <span className="text-[#00ff00] font-black text-2xl italic tracking-tighter">{task.reward}</span>
              </div>
              <h3 className="text-xl font-bold mb-6 pr-6 leading-tight group-hover:text-[#00ff00] transition-colors">{task.title}</h3>
              <div className="flex items-center gap-4 text-zinc-500 text-[10px] font-black uppercase tracking-widest">
                <span className="flex items-center gap-1">⏱ {task.time}</span>
                <span className="flex items-center gap-1 text-[#00ff00]">★ 4.5</span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 text-zinc-600 font-bold uppercase tracking-widest">No Tasks Found</div>
        )}
      </div>

      {/* ナビゲーション */}
      <nav className="fixed bottom-8 left-6 right-6 z-50">
        <div className="bg-zinc-900/90 backdrop-blur-3xl border border-zinc-800/50 p-2 rounded-full flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <button className="text-[#00ff00] px-6 py-3 rounded-full text-[10px] font-black bg-[#00ff00]/10">Tasks</button>
          <button className="text-zinc-600 px-6 py-3 text-[10px] font-black hover:text-white transition-colors">Search</button>
          <button className="text-zinc-600 px-6 py-3 text-[10px] font-black hover:text-white transition-colors">History</button>
          <button className="text-zinc-600 px-6 py-3 text-[10px] font-black hover:text-white transition-colors">Profile</button>
        </div>
      </nav>
    </div>
  );
}