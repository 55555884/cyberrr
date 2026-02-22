"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [loading, setLoading] = useState(false);
  const [surveyUrl, setSurveyUrl] = useState("");

  useEffect(() => {
    // ページ読み込み時に署名済みURLを事前に取得しておく
    async function prepareSurvey() {
      const profile = JSON.parse(localStorage.getItem("profile") || "{}");
      const userId = localStorage.getItem("worldid_address") || "user_test";
      
      const res = await fetch(
        `/api/rapidoreach-uid?userId=${userId}&gender=${profile.gender}&birthYear=${profile.birthYear}&zip=${profile.zip}`
      );
      const data = await res.json();
      if (data.url) setSurveyUrl(data.url);
    }
    prepareSurvey();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-black font-sans pb-24">
      {/* 合計獲得額表示エリア (image 13のスタイル) */}
      <div className="bg-[#1A1A1A] text-white p-8 rounded-b-[3rem] mb-8">
        <p className="text-zinc-500 text-[10px] font-bold uppercase mb-2">Total Earned</p>
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-black">$0.00</span>
          <span className="text-[#00ff00] font-bold text-sm">USDC</span>
        </div>
        <p className="text-zinc-500 text-[10px] mt-4 font-medium">Complete tasks to earn rewards</p>
      </div>

      <div className="px-6">
        <h2 className="text-xl font-bold mb-1">Available Tasks</h2>
        <p className="text-zinc-400 text-[10px] mb-6 font-medium tracking-tight">Powered by RapidoReach</p>

        {/* 案件表示カード (ここに一気に案件が出るようにします) */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-zinc-100 relative overflow-hidden">
            <div className="flex justify-between items-start mb-6">
              <span className="bg-zinc-100 text-zinc-400 text-[9px] font-black px-3 py-1 rounded-full uppercase">Survey</span>
              <span className="text-black text-xl font-black">$1.00+ <span className="text-[10px]">USDC</span></span>
            </div>
            
            <h3 className="text-lg font-bold mb-2">Available Surveys</h3>
            <p className="text-zinc-400 text-sm mb-8 leading-relaxed">複数のアンケートから選択して即座に報酬を獲得</p>
            
            <button 
              onClick={() => { if(surveyUrl) window.location.href = surveyUrl; }}
              className="w-full bg-[#1A1A1A] text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 active:scale-95 transition-all"
            >
              案件リストを表示 <span className="text-xl">→</span>
            </button>
          </div>

          {/* ロックされている案件 (image 13再現) */}
          {["Offer", "Video"].map((item) => (
            <div key={item} className="bg-white/50 p-6 rounded-[2.5rem] border border-zinc-100 flex justify-between items-center opacity-60">
              <div>
                <span className="text-[9px] font-black text-zinc-300 uppercase">{item}</span>
                <h4 className="font-bold text-zinc-400">Coming Soon</h4>
              </div>
              <div className="w-8 h-8 bg-zinc-100 rounded-full flex items-center justify-center text-xs">🔒</div>
            </div>
          ))}
        </div>
      </div>

      {/* フッターナビ (image 13再現) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-100 px-8 py-4 flex justify-around">
        <div className="flex flex-col items-center gap-1 text-black font-bold">
          <span className="text-xl">📋</span>
          <span className="text-[9px]">Tasks</span>
          <div className="w-1 h-1 bg-black rounded-full mt-0.5"></div>
        </div>
        <div className="flex flex-col items-center gap-1 text-zinc-300 font-bold">
          <span className="text-xl">🔍</span>
          <span className="text-[9px]">Search</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-zinc-300 font-bold">
          <span className="text-xl">🕒</span>
          <span className="text-[9px]">History</span>
        </div>
        <div className="flex flex-col items-center gap-1 text-zinc-300 font-bold">
          <span className="text-xl">👤</span>
          <span className="text-[9px]">Profile</span>
        </div>
      </nav>
    </div>
  );
}