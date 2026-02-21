"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleStartMission = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("worldid_address") || "user_888";
      
      // 自作APIを叩く
      const res = await fetch(
        `/api/rapidoreach-uid?userId=${userId}&gender=${profile?.gender}&birthYear=${profile?.birthYear}`
      );
      
      const data = await res.json();

      if (data.url) {
        // 成功したら本番URLへリダイレクト
        window.location.href = data.url; 
      } else {
        alert("接続に失敗しました。Vercelの環境変数を確認してください。");
      }
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans flex flex-col items-center">
      <header className="w-full flex justify-between items-center mb-12 pt-4">
        <h1 className="text-4xl font-black italic tracking-tighter text-[#00ff00]">CYBERRR</h1>
        <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center">👤</div>
      </header>

      <div className="w-full flex-1 flex flex-col justify-center">
        <div 
          onClick={handleStartMission}
          className="bg-zinc-900 border-2 border-zinc-800 p-8 rounded-[3rem] relative active:scale-95 transition-all cursor-pointer overflow-hidden shadow-2xl"
        >
          <div className="flex justify-between items-center mb-8">
            <span className="bg-[#00ff00] text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase">Premium Survey</span>
            <span className="text-[#00ff00] text-xl font-black italic">WIN USDC</span>
          </div>

          <h2 className="text-3xl font-black mb-4 leading-tight">RapidReach 案件リスト</h2>
          <p className="text-zinc-500 text-sm mb-12 leading-relaxed">
            認証済み公式APIに接続。プロフィールに基づいた高単価案件を自動取得します。
          </p>
          
          <div className={`w-full py-5 rounded-2xl font-black text-center text-lg transition-all ${loading ? 'bg-zinc-800 text-zinc-600' : 'bg-white text-black'}`}>
            {loading ? "API 接続中..." : "今すぐミッションを開始"}
          </div>

          {loading && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-[#00ff00] border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-[#00ff00] font-black text-xs">SIGNING URL...</p>
            </div>
          )}
        </div>
      </div>

      <nav className="fixed bottom-10 left-6 right-6">
        <div className="bg-zinc-900/90 backdrop-blur-3xl border border-zinc-800 p-2 rounded-full flex justify-around items-center">
          <button className="bg-[#00ff00] text-black px-12 py-3.5 rounded-full text-xs font-black">Tasks</button>
          <button className="text-zinc-600 text-xs font-black px-12 py-3.5">Profile</button>
        </div>
      </nav>
    </div>
  );
}