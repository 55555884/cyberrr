"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProfileSetup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gender: "",
    zipCode: "",
    city: "", 
    language: "ja",
  });

  const handleSave = () => {
    if (!formData.gender || !formData.zipCode || !formData.city) {
      alert("すべての項目を入力してください");
      return;
    }
    // プロフィールを保存
    localStorage.setItem("cyberrr_profile", JSON.stringify(formData));
    // 完了後、タスク一覧へ
    router.push("/tasks");
  };

  return (
    <div style={{ backgroundColor: "#F7F9FB", minHeight: "100vh", padding: "60px 24px" }}>
      <h1 style={{ fontSize: "36px", fontWeight: "900", letterSpacing: "-1.5px", color: "#111", marginBottom: "40px" }}>PROFILE</h1>

      <div style={{ backgroundColor: "#FFF", borderRadius: "32px", padding: "32px 24px", boxShadow: "0 4px 24px rgba(0,0,0,0.03)", display: "flex", flexDirection: "column", gap: "28px" }}>
        
        <div>
          <label style={{ fontSize: "13px", fontWeight: "800", color: "#111", marginLeft: "4px" }}>GENDER</label>
          <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
            {['male', 'female'].map(g => (
              <button key={g} onClick={() => setFormData({...formData, gender: g})}
                style={{ 
                  flex: 1, padding: "18px", borderRadius: "18px", border: "1px solid #EEE", fontWeight: "800",
                  backgroundColor: formData.gender === g ? "#111" : "#FAFAFA",
                  color: formData.gender === g ? "#FFF" : "#AAA", cursor: "pointer"
                }}>
                {g.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ fontSize: "13px", fontWeight: "800", color: "#111", marginLeft: "4px" }}>ZIP CODE (NNN-NNNN)</label>
          <input type="text" placeholder="862-0957" value={formData.zipCode}
            onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
            style={{ width: "100%", padding: "18px", borderRadius: "18px", border: "1px solid #EEE", backgroundColor: "#FAFAFA", marginTop: "12px", outline: "none", fontSize: "16px" }} />
        </div>

        <div>
          <label style={{ fontSize: "13px", fontWeight: "800", color: "#111", marginLeft: "4px" }}>CITY</label>
          <input type="text" placeholder="Kumamoto-shi" value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
            style={{ width: "100%", padding: "18px", borderRadius: "18px", border: "1px solid #EEE", backgroundColor: "#FAFAFA", marginTop: "12px", outline: "none", fontSize: "16px" }} />
        </div>

        <div>
          <label style={{ fontSize: "13px", fontWeight: "800", color: "#111", marginLeft: "4px" }}>LANGUAGE</label>
          <select value={formData.language} onChange={(e) => setFormData({...formData, language: e.target.value})}
            style={{ width: "100%", padding: "18px", borderRadius: "18px", border: "1px solid #EEE", backgroundColor: "#FAFAFA", marginTop: "12px", outline: "none", fontSize: "16px", appearance: "none" }}>
            <option value="ja">日本語 (Japanese)</option>
            <option value="en">English</option>
          </select>
        </div>

        <button onClick={handleSave} style={{ 
          width: "100%", padding: "20px", borderRadius: "99px", backgroundColor: "#06C755", 
          color: "#FFF", fontWeight: "900", border: "none", marginTop: "12px", fontSize: "16px",
          boxShadow: "0 8px 20px rgba(6, 199, 85, 0.25)", cursor: "pointer"
        }}>
          UPDATE & START
        </button>
      </div>
    </div>
  );
}