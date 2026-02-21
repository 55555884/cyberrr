"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // 保存されたプロフィールを確実に取得
    const saved = localStorage.getItem("profile");
    if (saved) setProfile(JSON.parse(saved));
  }, []);

  const handleStartMission = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("worldid_address") || "user_888";
      
      // 作成済みの本番用APIルート「rapidoreach-uid」を呼び出す
      const res = await fetch(
        `/api/rapidoreach-uid?userId=${userId}&gender=${profile?.gender}&birthYear=${profile?.birthYear}`
      );
      const data = await res.json();

      if (data.url) {
        // デモではなく、署名済みの本番案件URLへ強制ジャンプ
        window.location.href = data.url; 
      } else {
        alert("APIエラー: URLが生成できませんでした。Vercelの環境変数を確認してください。");
      }
    } catch (e) {
      console.error("Connection failed", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 font-sans flex flex-col items-center">
      {/* ヘッダー */}
      <header className="w-full flex justify-between items-center mb-10 pt-4">
        <h1 className="text-3xl font-black italic tracking-tighter text-[#00ff00]">CYBERRR</h1>
        <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center">👤</div>
      </header>

      <div className="w-full">
        <h2 className="text-xl font-black mb-6 uppercase tracking-widest">Available Mission</h2>

        {/* 🚀 これが本番の案件起動カードです */}
        <div 
          onClick={handleStartMission}
          className="bg-zinc-900 border-2 border-zinc-800 p-8 rounded-[2.5rem] relative active:scale-95 transition-all cursor-pointer shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="bg-[#00ff00] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase">
              Premium Survey
            </span>
            <span className="text-[#00ff00] text-xl font-black italic">HIGH REWARD</span>
          </div>

          <h3 className="text-2xl font-bold mb-3 text-white">RapidReach 案件リスト</h3>
          <p className="text-zinc-500 text-sm mb-10 leading-relaxed">
            審査通過済み公式パートナーAPI。あなたのプロフィールに最適化された高単価アンケートを開始します。
          </p>
          
          <div className={`w-full py-5 rounded-2xl font-black text-center text-sm transition-colors ${loading ? 'bg-zinc-700 text-zinc-500' : 'bg-white text-black'}`}>
            {loading ? "API CONNECTING..." : "今すぐミッションを開始"}
          </div>

          {/* ローディングオーバーレイ */}
          {loading && (
            <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center">
               <div className="w-10 h-10 border-4 border-[#00ff00] border-t-transparent rounded-full animate-spin mb-4"></div>
               <p className="text-[#00ff00] font-bold text-xs">GENERATING SIGNED URL...</p>
            </div>
          )}
        </div>
      </div>

      {/* フッターナビ */}
      <nav className="fixed bottom-8 left-6 right-6">
        <div className="bg-zinc-900/90 backdrop-blur-xl border border-zinc-800/50 p-2 rounded-full flex justify-around items-center shadow-2xl">
          <button className="bg-[#00ff00] text-black px-10 py-3 rounded-full text-xs font-black">Tasks</button>
          <button className="text-zinc-600 text-xs font-black px-10 py-3">Profile</button>
        </div>
      </nav>
    </div>
  );
}