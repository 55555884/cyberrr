"use client";
import { useState, useEffect } from "react";

export default function TasksPage() {
  const [profile, setProfile] = useState<any>(null);
  
  // 審査通過済みのAppID
  const RAPIDREACH_ID = "PVnxv7sZMH2"; 

  useEffect(() => {
    const saved = localStorage.getItem("profile");
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  // RapidReachとの互換性を保つためのURL生成ロジック
  const getRapidReachUrl = () => {
    // ユーザー識別用のID（World ID認証済みならそのアドレス、なければランダム生成）
    const userId = localStorage.getItem("worldid_verified_address") || "user_" + Math.random().toString(36).substring(7);
    
    let url = `https://www.rapidreach.com/u/${RAPIDREACH_ID}?user_id=${userId}`;
    
    if (profile) {
      // 1. 性別の互換性変換 (RapidReach: 1=Male, 2=Female, 0=Other)
      let genderCode = "0";
      if (profile.gender === "男性") genderCode = "1";
      if (profile.gender === "女性") genderCode = "2";

      // 2. 生年月日の抽出 (YYYY-MM-DD から YYYY を取得)
      const birthYear = profile.birthYear || (profile.birth ? profile.birth.split("-")[0] : "");

      // URLにパラメータを連結
      url += `&gender=${genderCode}`;
      if (birthYear) url += `&birth_year=${birthYear}`;
    }
    
    return url;
  };

  return (
    <div className="min-h-screen bg-black text-white p-6 pb-32">
      <header className="mb-10 pt-4">
        <h1 className="text-3xl font-black italic tracking-tighter text-[#00ff00]">CYBERRR</h1>
        <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest mt-1 text-glow">Premium Mission Hub</p>
      </header>

      {/* RapidReach 案件カード */}
      <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-[2.5rem] mb-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 bg-[#00ff00] text-black text-[10px] font-black px-4 py-1 rounded-bl-2xl">
          BEST MATCH
        </div>
        <h2 className="text-2xl font-black mb-2">アンケートを開始</h2>
        <p className="text-zinc-500 text-sm mb-8 leading-relaxed">
          {profile ? `プロファイル（${profile.gender} / ${profile.job}）に最適な案件を読み込みました。` : "読み込み中..."}
        </p>
        
        <a 
          href={getRapidReachUrl()} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block w-full bg-[#00ff00] text-black py-5 rounded-2xl font-black text-center text-sm active:scale-95 transition-all shadow-[0_0_30px_rgba(0,255,0,0.2)]"
        >
          ミッションサイトへ移動
        </a>
      </div>

      <div className="space-y-4 opacity-40 select-none">
        <h3 className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] pl-2">Daily Quests</h3>
        <div className="bg-zinc-900/40 border border-zinc-800 p-6 rounded-3xl flex justify-between items-center italic">
          <span className="text-zinc-500 font-bold">More tasks coming soon...</span>
        </div>
      </div>

      {/* ナビゲーション */}
      <nav className="fixed bottom-8 left-6 right-6">
        <div className="bg-zinc-900/80 backdrop-blur-3xl border border-zinc-800/50 p-2 rounded-full flex justify-around items-center">
          <button className="bg-[#00ff00] text-black px-8 py-3 rounded-full text-xs font-black shadow-lg">TASKS</button>
          <button className="text-zinc-500 text-xs font-black px-8 py-3">WALLET</button>
          <button className="text-zinc-500 text-xs font-black px-8 py-3">PROFILE</button>
        </div>
      </nav>
    </div>
  );
}