"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";

export default function TasksPage() {
  const [surveyUrl, setSurveyUrl] = useState("");
  const [loading, setLoading] = useState(true);

    <div className="min-h-screen bg-[#ECECEC] text-[#111111] pb-40">
      <div className="max-w-3xl mx-auto px-6 pt-8">
        <div className="mb-8">
          <h2 className="text-3xl font-extrabold mb-1 tracking-tight">Available Tasks</h2>
          <p className="text-sm text-[#666666] font-semibold uppercase">Official RapidoReach Feed</p>
        </div>
    async function fetchUrl() {
      try {
        <div className="max-w-3xl mx-auto px-6">
        {/* Loading skeleton */}
        {loading ? (
          <div className="space-y-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse bg-white rounded-2xl shadow-sm p-6 mb-2">
                <div className="flex justify-between items-center mb-4">
                  <div className="w-24 h-3 bg-gray-200 rounded-full"></div>
                  <div className="w-16 h-5 bg-gray-200 rounded-full"></div>
                </div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* 🚀 本物の案件へ飛ばすメインカード */}
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 mb-6">
        const res = await fetch(`/api/rapidoreach-uid?userId=${uid}&gender=${p.gender}&birthYear=${p.birthYear}&zip=${p.zip}`);
        const data = await res.json();
              <span className="text-black text-2xl font-black italic">$1.00+</span>
      } finally {
        setLoading(false);
      }
    }
    fetchUrl();
  }, []);

  return (
            className={`w-full py-5 rounded-2xl font-black text-sm shadow-xl transition-all ${loading ? 'bg-zinc-200 text-zinc-400' : 'bg-gradient-to-tr from-[#06C755] to-[#04a344] text-white active:scale-95'}`}
      <div className="bg-[#ECECEC] text-[#111111] p-8 rounded-b-[3rem] mb-10 shadow-2xl">
        <p className="text-[#666666] text-[10px] font-black uppercase mb-2">Total Earned</p>
        <div className="flex items-baseline gap-2">
          <span className="text-5xl font-black italic">$0.00</span>
          </>
        )}
      </div>

      <Navbar />
          <span className="text-[#06C755] font-bold text-sm">USDC</span>
        </div>
      </div>

      <div className="px-6">
        <h2 className="text-2xl font-black mb-1 italic tracking-tighter">Available Tasks</h2>
        <p className="text-[#777777] text-[10px] font-bold mb-8 uppercase">Official RapidoReach Feed</p>

        {/* 🚀 本物の案件へ飛ばすメインカード */}
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-zinc-100 mb-6">
          <div className="flex justify-between items-center mb-8">
            <span className="bg-[#06C755]/10 text-[#06C755] text-[9px] font-black px-4 py-1 rounded-full">ACTIVE</span>
            <span className="text-black text-2xl font-black italic">$1.00+</span>
          </div>
          <h3 className="text-xl font-bold mb-2">プレミアムアンケート</h3>
          <p className="text-zinc-400 text-xs mb-10 leading-relaxed">
            プロフィールを自動連携済み。初期入力をスキップして直接案件を開始します。
          </p>
          <button 
            onClick={() => { if(surveyUrl) window.location.href = surveyUrl; }}
            disabled={loading || !surveyUrl}
            className={`w-full py-5 rounded-2xl font-black text-sm shadow-xl transition-all ${loading ? 'bg-zinc-200 text-zinc-400' : 'bg-gradient-to-tr from-[#06C755] to-[#04a344] text-white active:scale-95'}`}
          >
            {loading ? "API CONNECTING..." : "案件リストを表示する →"}
          </button>
        </div>
      </div>
    </div>
  );
}