"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const missions = [
    {
      id: 1,
      title: "Consumer Trend Survey",
      reward: "1.50",
      time: "5 min",
      rating: "4.8",
      category: "SURVEY",
      color: "#00ff00"
    },
    {
      id: 2,
      title: "App Experience Feedback",
      reward: "2.00",
      time: "8 min",
      rating: "4.9",
      category: "OFFER",
      color: "#00ff00"
    },
    {
      id: 3,
      title: "Daily Brand Check-in",
      reward: "0.50",
      time: "2 min",
      rating: "4.5",
      category: "DAILY",
      color: "#00ff00"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32">
      <header className="flex justify-between items-center mb-10 pt-4">
        <div>
          <h1 className="text-3xl font-black italic tracking-tighter text-[#00ff00]">CYBERRR</h1>
          <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mt-1">Premium Mission Hub</p>
        </div>
        <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-800">👤</div>
      </header>

      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 no-scrollbar">
        {["ALL", "SURVEY", "OFFER", "DAILY"].map((tab) => (
          <button key={tab} className={`px-6 py-2 rounded-full text-[10px] font-black tracking-widest ${tab === "ALL" ? 'bg-[#00ff00] text-black' : 'bg-zinc-900 text-zinc-500 border border-zinc-800'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-5">
        {missions.map((mission) => (
          <div key={mission.id} className="bg-zinc-900 border border-zinc-800 p-7 rounded-[2.5rem] relative group active:scale-[0.98] transition-all">
            <div className="flex justify-between items-start mb-6">
              <span className="text-[10px] font-black text-[#00ff00] uppercase tracking-widest bg-[#00ff00]/10 px-3 py-1 rounded-full border border-[#00ff00]/20">
                {mission.category}
              </span>
              <div className="text-right">
                <span className="text-[#00ff00] text-2xl font-black">{mission.reward}</span>
                <span className="text-zinc-600 text-[10px] block font-bold">USDC</span>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-8 pr-4 leading-tight">{mission.title}</h3>
            
            <div className="flex items-center gap-6 mb-8">
              <span className="text-zinc-500 text-xs font-bold flex items-center gap-1.5">⏱ {mission.time}</span>
              <span className="text-zinc-500 text-xs font-bold flex items-center gap-1.5">★ {mission.rating}</span>
            </div>

            <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-sm active:scale-95 transition-all shadow-xl">
              START MISSION
            </button>
          </div>
        ))}
      </div>

      <nav className="fixed bottom-8 left-6 right-6">
        <div className="bg-zinc-900/80 backdrop-blur-3xl border border-zinc-800/50 p-2 rounded-full flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <button className="bg-[#00ff00] text-black px-8 py-3 rounded-full text-xs font-black shadow-lg">TASKS</button>
          <button className="text-zinc-500 text-xs font-black px-4 py-3">WALLET</button>
          <button className="text-zinc-500 text-xs font-black px-4 py-3">PROFILE</button>
        </div>
      </nav>
    </div>
  );
}