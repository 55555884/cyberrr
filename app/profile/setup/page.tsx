"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSetup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gender: "",
    birthYear: "1990",
    birthMonth: "01",
    birthDay: "15",
    zipCode: "",
    prefecture: "", // 郵便番号から自動取得
    city: "",       // 郵便番号から自動取得
  });

  const [isFetching, setIsFetching] = useState(false);

  // 郵便番号が7桁になったら住所を取得
  useEffect(() => {
    if (formData.zipCode.length === 7) {
      fetchAddress(formData.zipCode);
    }
  }, [formData.zipCode]);

  const fetchAddress = async (zip: string) => {
    setIsFetching(true);
    try {
      // 郵便番号APIを利用 (http形式でのリクエスト)
      const res = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zip}`);
      const data = await res.json();
      if (data.results) {
        const resData = data.results[0];
        setFormData(prev => ({
          ...prev,
          prefecture: resData.address1, // "東京都"
          city: resData.address2 + resData.address3 // "渋谷区" + "道玄坂"
        }));
      }
    } catch (error) {
      console.error("Address fetch error:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const isFormValid = formData.gender !== "" && formData.zipCode.length === 7 && formData.prefecture !== "";

  const inputStyle = "w-full bg-[#141414] border border-[#222] text-white rounded-[12px] p-[14px] focus:outline-none focus:border-[#06C755] transition-all";

  const saveProfile = () => {
    // 最終的な住所を結合して保存
    const fullAddress = formData.prefecture + formData.city;
    const finalData = { ...formData, city: fullAddress };
    localStorage.setItem("profile", JSON.stringify(finalData));
    router.push("/tasks");
  };

  return (
    <div className="min-h-screen bg-[#ECECEC] p-6 font-['DM_Sans'] flex flex-col">
      <h2 className="text-2xl font-black mb-8 text-[#111] italic">SET UP PROFILE</h2>
      
      <div className="space-y-6 flex-1">
        {/* 性別 */}
        <div>
          <label className="text-[10px] font-black text-zinc-400 uppercase mb-2 block tracking-widest">1. Gender</label>
          <select className={inputStyle} value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
            <option value="">Select Gender</option>
            <option value="男性">男性 (Male)</option>
            <option value="女性">女性 (Female)</option>
          </select>
        </div>

        {/* 郵便番号 */}
        <div>
          <label className="text-[10px] font-black text-zinc-400 uppercase mb-2 block tracking-widest">2. Zip Code</label>
          <input 
            type="text" placeholder="1234567" maxLength={7} className={inputStyle}
            value={formData.zipCode}
            onChange={(e) => setFormData({...formData, zipCode: e.target.value.replace(/\D/g,'')})}
          />
        </div>

        {/* 自動取得された住所の確認 */}
        <div className={formData.prefecture ? "opacity-100" : "opacity-30"}>
          <label className="text-[10px] font-black text-zinc-400 uppercase mb-2 block tracking-widest">3. Address (Auto-filled)</label>
          <div className="space-y-2">
            <input type="text" readOnly className={inputStyle} value={formData.prefecture} placeholder="Prefecture" />
            <input type="text" readOnly className={inputStyle} value={formData.city} placeholder="City / Area" />
          </div>
          {isFetching && <p className="text-[10px] text-[#06C755] mt-2 animate-pulse">Fetching address...</p>}
        </div>
      </div>

      <button 
        onClick={saveProfile}
        disabled={!isFormValid}
        className={`w-full py-5 rounded-2xl font-black text-lg transition-all ${
          isFormValid ? "bg-[#111] text-[#06C755] active:scale-95 shadow-xl" : "bg-zinc-300 text-zinc-500 cursor-not-allowed"
        }`}
      >
        {isFormValid ? "CONFIRM & START" : "ENTER ZIP CODE TO START"}
      </button>
    </div>
  );
}