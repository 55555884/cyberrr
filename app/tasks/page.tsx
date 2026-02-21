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
      // localStorageから最新情報を取得
      const userId = localStorage.getItem("worldid_address") || "user_final";
      const p = JSON.parse(localStorage.getItem("profile") || "{}");
      
      // 作成済みのAPIルート「rapidoreach-uid」へ署名URLをリクエスト
      const res = await fetch(
        `/api/rapidoreach-uid?userId=${userId}&gender=${p.gender}&birthYear=${p.birthYear}`
      );
      const data = await res.json();

      if (data.url) {
        // 本物の案件画面へ強制遷移
        window.location.href = data.url; 
      } else {
        alert("APIエラーが発生しました。Vercelの環境変数設定を確認してください。");
      }
    } catch (e) {
      console.error("Connection failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans flex flex-col">
      <header className="flex justify-between items-center mb-10 pt-4">
        <h1 className="text-3xl font-black italic tracking-tighter text-[#00ff00]">CYBERRR</h1>
        <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center">👤</div>
      </header>

      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-xl font-black mb-6 uppercase tracking-widest text-center text-zinc-500">Active Mission</h2>

        {/* 🚀 本番 RapidReach 起動ボタンのみを表示 */}
        <div 
          onClick={handleStartMission}
          className="bg-zinc-900 border-2 border-[#00ff00]/30 p-8 rounded-[3rem] relative active:scale-95 transition-all cursor-pointer shadow-[0_0_50px_rgba(0,255,0,0.1)] overflow-hidden"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="bg-[#00ff00] text-black text-[10px] font-black px-4 py-1 rounded-full uppercase">
              Live Survey
            </span>
            <span className="text-[#00ff00] text-xl font-black italic">WIN USDC</span>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-white">RapidReach プレミアム案件</h3>
          <p className="text-zinc-500 text-sm mb-10 leading-relaxed">
            公式パートナーAPIに接続しました。回答完了後、即座に報酬が反映されます。
          </p>
          
          <div className="w-full bg-white text-black py-5 rounded-2xl font-black text-center text-base shadow-xl">
            {loading ? "API LOADING..." : "ミッションを開始"}
          </div>

          {loading && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
               <div className="w-12 h-12 border-4 border-[#00ff00] border-t-transparent rounded-full animate-spin mb-4"></div>
               <p className="text-[#00ff00] font-black text-xs animate-pulse">CONNECTING TO RAPIDREACH...</p>
            </div>
          )}
        </div>
      </div>

      <nav className="mt-10">
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/50 p-2 rounded-full flex justify-around items-center">
          <button className="bg-[#00ff00] text-black px-10 py-3 rounded-full text-xs font-black shadow-lg">Tasks</button>
          <button className="text-zinc-500 text-xs font-black px-10 py-3">Profile</button>
        </div>
      </nav>
    </div>
  );
}