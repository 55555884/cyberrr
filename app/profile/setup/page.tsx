"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileSetup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gender: "男性",
    birthYear: "1990",
    birthMonth: "01",
    birthDay: "15",
    zipCode: "",
    city: "",
    country: "Japan"
  });

  const inputStyle = "w-full bg-[#141414] border border-[#222] text-white rounded-[12px] p-[14px] focus:outline-none focus:border-[#06C755]";

  const saveProfile = () => {
    localStorage.setItem("profile", JSON.stringify(formData));
    router.push("/tasks");
  };

  return (
    <div className="min-h-screen bg-[#ECECEC] p-6 font-['DM_Sans']">
      <h2 className="text-2xl font-black mb-8">SET UP PROFILE</h2>
      
      <div className="space-y-4">
        <div>
          <label className="text-[10px] font-bold text-zinc-400 uppercase mb-1 block">Zip Code (7 digits)</label>
          <input 
            type="text" maxLength={7} className={inputStyle}
            onChange={(e) => setFormData({...formData, zipCode: e.target.value.replace(/\D/g,'')})}
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-zinc-400 uppercase mb-1 block">City</label>
          <input 
            type="text" className={inputStyle}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
          />
        </div>

        <div>
          <label className="text-[10px] font-bold text-zinc-400 uppercase mb-1 block">Country</label>
          <select className={inputStyle} value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})}>
            <option value="Japan">Japan</option>
            <option value="USA">USA</option>
          </select>
        </div>
      </div>

      <button 
        onClick={saveProfile}
        className="w-full mt-10 bg-[#111] text-[#06C755] py-5 rounded-2xl font-black text-lg active:scale-95 transition-all"
      >
        COMPLETE SETUP
      </button>
    </div>
  );
}