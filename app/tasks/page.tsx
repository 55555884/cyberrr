"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [surveyUrl, setSurveyUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initRapid() {
      try {
        const profile = JSON.parse(localStorage.getItem("profile") || "{}");
        const userId = localStorage.getItem("worldid_address") || "user_888";
        
        // 署名URLを取得
        const res = await fetch(
          `/api/rapidoreach-uid?userId=${userId}&gender=${profile.gender}&birthYear=${profile.birthYear}&zip=${profile.zip}`
        );
        const data = await res.json();
        if (data.url) setSurveyUrl(data.url);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    initRapid();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-black pb-32">
      {/* ステータスバーエリア (image.png 13:39再現) */}
      <div className="bg-[#1C1C1E] text-white p-8 rounded-b-[3.5rem] shadow-2xl">
        <p className="text-zinc-500 text-[10px] font-black uppercase tracking-tighter mb-2">Total Earned</p>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black italic tracking-tighter">$0.00</span>
          <span className="text-[#00FF00] font-black text-sm tracking-widest uppercase">USDC</span>
        </div>
      </div>

      <main className="px-6 mt-10">
        <h2 className="text-2xl font-black mb-1 italic tracking-tighter">Available Tasks</h2>
        <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-8">Official Partner: RapidoReach</p>

        {/* 🚀 メイン案件カード：ここから一気にリストへ飛ばします */}
        <div className="bg-white p-8 rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-zinc-100 relative overflow-hidden active:scale-[0.98] transition-all">
          <div className="flex justify-between items-center mb-10">
            <span className="bg-[#00FF00]/10 text-[#00FF00] text-[9px] font-black px-4 py-1.5 rounded-full border border-[#00FF00]/20">LIVE SURVEY</span>
            <span className="text-black text-2xl font-black italic">$1.00+</span>
          </div>
          
          <h3 className="text-2xl font-black mb-3">プレミアムアンケート</h3>
          <p className="text-zinc-400 text-sm mb-10 leading-relaxed font-medium">
            回答者の属性に合わせた案件をリアルタイムで表示。初期プロフィール入力は自動でスキップされます。
          </p>
          
          <button 
            onClick={() => { if(surveyUrl) window.location.href = surveyUrl; }}
            className="w-full bg-[#1C1C1E] text-white py-5 rounded-[1.5rem] font-black text-sm shadow-xl flex justify-center items-center gap-3"
          >
            {loading ? "API CONNECTING..." : "案件リストを表示する"}
            <span className="text-xl">→</span>
          </button>
        </div>

        {/* サブ案件（Coming Soon） */}
        <div className="mt-6 space-y-4 opacity-50">
          {["Video Rewards", "App Offers"].map((title) => (
            <div key={title} className="bg-white/60 border border-zinc-100 p-6 rounded-[2.5rem] flex justify-between items-center">
              <span className="text-zinc-400 font-black text-sm uppercase">{title}</span>
              <div className="w-8 h-8 bg-zinc-50 rounded-full flex items-center justify-center">🔒</div>
            </div>
          ))}
        </div>
      </main>

      {/* フッターナビゲーション */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-3xl border-t border-zinc-100 px-10 py-6 flex justify-around items-center">
        <div className="flex flex-col items-center gap-1.5 text-black">
          <div className="text-xl">📋</div>
          <span className="text-[9px] font-black uppercase tracking-tighter">Tasks</span>
          <div className="w-1 h-1 bg-black rounded-full"></div>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-zinc-300">
          <div className="text-xl">🔍</div>
          <span className="text-[9px] font-black uppercase tracking-tighter">Search</span>
        </div>
        <div className="flex flex-col items-center gap-1.5 text-zinc-300">
          <div className="text-xl">👤</div>
          <span className="text-[9px] font-black uppercase tracking-tighter">Profile</span>
        </div>
      </nav>
    </div>
  );
}