"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [showSurvey, setShowSurvey] = useState(false);
  const [surveyUrl, setSurveyUrl] = useState("");

  useEffect(() => {
    async function prepareUrl() {
      const profile = JSON.parse(localStorage.getItem("profile") || "{}");
      const userId = localStorage.getItem("worldid_address") || "user_test";
      // 署名URLを取得
      const res = await fetch(`/api/rapidoreach-uid?userId=${userId}&gender=${profile.gender}&birthYear=${profile.birthYear}&zip=${profile.zip}`);
      const data = await res.json();
      if (data.url) setSurveyUrl(data.url);
    }
    prepareUrl();
  }, []);

  // 案件画面（外部ブラウザに飛ばさない）
  if (showSurvey && surveyUrl) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        <div className="p-4 border-b flex justify-between items-center bg-white text-black">
          <button onClick={() => setShowSurvey(false)} className="font-bold text-sm">← 戻る</button>
          <span className="font-black text-xs">アンケート一覧</span>
          <div className="w-10"></div>
        </div>
        <iframe src={surveyUrl} className="flex-1 w-full border-none" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32 font-sans">
      <header className="flex justify-between items-center mb-10 pt-4">
        <h1 className="text-3xl font-black italic tracking-tighter text-[#00ff00]">CYBERRR</h1>
        <div className="w-10 h-10 bg-zinc-900 rounded-full flex items-center justify-center">👤</div>
      </header>

      <h2 className="text-2xl font-black mb-6 uppercase tracking-widest">Available Tasks</h2>

      {/* 元のカードUIに戻しました */}
      <div className="grid gap-5">
        <div 
          onClick={() => setShowSurvey(true)}
          className="bg-zinc-900 border border-zinc-800 p-7 rounded-[2.5rem] relative active:scale-95 transition-all cursor-pointer"
        >
          <div className="flex justify-between items-start mb-6">
            <span className="bg-[#00ff00]/10 text-[#00ff00] text-[10px] font-black px-3 py-1 rounded-full border border-[#00ff00]/20">SURVEY</span>
            <span className="text-[#00ff00] text-2xl font-black">1.50+ <span className="text-[10px]">USDC</span></span>
          </div>
          <h3 className="text-xl font-bold mb-2">RapidoReach プレミアムアンケート</h3>
          <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
            プロフィールに最適化された案件を一覧表示します。
          </p>
          <div className="w-full bg-white text-black py-4 rounded-2xl font-black text-center text-sm">
            ミッションを開始
          </div>
        </div>

        {/* Coming Soon カード */}
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-[2rem] flex justify-between items-center opacity-40">
          <span className="text-zinc-500 font-bold uppercase text-xs tracking-widest">OFFER / VIDEO</span>
          <span className="text-zinc-600 font-black tracking-tighter uppercase text-xs italic">Coming Soon</span>
        </div>
      </div>

      <nav className="fixed bottom-8 left-6 right-6">
        <div className="bg-zinc-900/90 backdrop-blur-3xl border border-zinc-800/50 p-2 rounded-full flex justify-around items-center shadow-2xl">
          <button className="bg-[#00ff00] text-black px-8 py-3 rounded-full text-xs font-black">TASKS</button>
          <button className="text-zinc-600 text-xs font-black px-4 py-3">PROFILE</button>
        </div>
      </nav>
    </div>
  );
}