"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  // 案件開始ボタンの処理
  const handleStartMission = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("worldid_address") || "guest_user";
      
      // 作成済みのAPIルートから署名付きURLを取得
      const res = await fetch(
        `/api/rapidoreach-uid?userId=${userId}&gender=${profile?.gender}&birthYear=${profile?.birthYear}`
      );
      const data = await res.json();

      if (data.url) {
        // RapidReachの本番URLへリダイレクト
        window.location.href = data.url; 
      } else {
        alert("URLの生成に失敗しました。APIキーを確認してください。");
      }
    } catch (e) {
      console.error("Connection failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans">
      <header className="flex justify-between items-center mb-10 pt-4">
        <h1 className="text-3xl font-black italic tracking-tighter text-[#00ff00]">CYBERRR</h1>
        <div className="flex gap-4">
          <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center">🔔</div>
          <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center">👤</div>
        </div>
      </header>

      <h2 className="text-2xl font-black mb-6">AVAILABLE TASKS</h2>

      {/* 修正ポイント：ここを本番API連動のカードにします */}
      <div 
        onClick={handleStartMission}
        className={`bg-zinc-900 border ${loading ? 'border-[#00ff00]' : 'border-zinc-800'} p-7 rounded-[2.5rem] relative active:scale-95 transition-all cursor-pointer mb-6`}
      >
        <div className="flex justify-between items-start mb-4">
          <span className="bg-[#00ff00]/20 text-[#00ff00] text-[10px] font-black px-3 py-1 rounded-full border border-[#00ff00]/30">SURVEY</span>
          <span className="text-[#00ff00] text-xl font-black">HIGH REWARD</span>
        </div>
        <h3 className="text-xl font-bold mb-2">RapidReach プレミアムアンケート</h3>
        <p className="text-zinc-500 text-sm mb-6">プロフィールに基づいた最高単価の案件を開始します。</p>
        <div className="flex items-center gap-4">
          <span className="text-zinc-600 text-xs font-bold">⏱ 5-15 min</span>
          <span className="text-zinc-600 text-xs font-bold">★ 4.8</span>
        </div>
        
        {loading && (
          <div className="absolute inset-0 bg-black/60 rounded-[2.5rem] flex items-center justify-center font-black text-[#00ff00] animate-pulse">
            CONNECTING TO API...
          </div>
        )}
      </div>

      <nav className="fixed bottom-8 left-6 right-6">
        <div className="bg-zinc-900/80 backdrop-blur-3xl border border-zinc-800/50 p-2 rounded-full flex justify-around items-center">
          <button className="bg-[#00ff00] text-black px-8 py-3 rounded-full text-xs font-black shadow-lg">Tasks</button>
          <button className="text-zinc-500 text-xs font-black px-4 py-3">Search</button>
          <button className="text-zinc-500 text-xs font-black px-4 py-3">History</button>
          <button className="text-zinc-500 text-xs font-black px-4 py-3">Profile</button>
        </div>
      </nav>
    </div>
  );
}