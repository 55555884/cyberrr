"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [surveyUrl, setSurveyUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUrl() {
      try {
        const p = JSON.parse(localStorage.getItem("profile") || "{}");
        const uid = localStorage.getItem("worldid_address") || "user_official_001";
        const res = await fetch(`/api/rapidoreach-uid?userId=${uid}&gender=${p.gender}&birthYear=${p.birthYear}&zip=${p.zip}`);
        const data = await res.json();
        if (data.url) setSurveyUrl(data.url);
      } finally {
        setLoading(false);
      }
    }
    fetchUrl();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-black pb-32">
      <div className="bg-[#1A1A1A] text-white p-8 rounded-b-[3rem] mb-10 shadow-2xl">
        <p className="text-zinc-500 text-[10px] font-black uppercase mb-2">Total Earned</p>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black italic">$0.00</span>
          <span className="text-[#00ff00] font-bold text-sm">USDC</span>
        </div>
      </div>

      <div className="px-6">
        <h2 className="text-2xl font-black mb-1 italic tracking-tighter">Available Tasks</h2>
        <p className="text-zinc-400 text-[10px] font-bold mb-8 uppercase">Official RapidoReach Feed</p>

        {/* 🚀 本物の案件へ飛ばすメインカード */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 mb-6">
          <div className="flex justify-between items-center mb-8">
            <span className="bg-[#00ff00]/10 text-[#00ff00] text-[9px] font-black px-4 py-1 rounded-full">ACTIVE</span>
            <span className="text-black text-2xl font-black italic">$1.00+</span>
          </div>
          <h3 className="text-xl font-bold mb-2">プレミアムアンケート</h3>
          <p className="text-zinc-400 text-xs mb-10 leading-relaxed">
            プロフィールを自動連携済み。初期入力をスキップして直接案件を開始します。
          </p>
          <button 
            onClick={() => { if(surveyUrl) window.location.href = surveyUrl; }}
            disabled={loading || !surveyUrl}
            className={`w-full py-5 rounded-2xl font-black text-sm shadow-xl transition-all ${loading ? 'bg-zinc-100 text-zinc-300' : 'bg-black text-white active:scale-95'}`}
          >
            {loading ? "API CONNECTING..." : "案件リストを表示する →"}
          </button>
        </div>
      </div>
    </div>
  );
}