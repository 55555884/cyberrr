"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

const JOBS = ["会社員", "公務員", "経営者/役員", "フリーランス", "学生", "主婦/主夫", "アルバイト/パート", "無職", "その他"];
const LANGUAGES = ["日本語", "English", "中文", "한국어", "Español", "Français", "Deutsch", "Português"];
const COUNTRIES = [
  { label: "Japan", value: "JP" },
  { label: "United States", value: "US" },
  { label: "United Kingdom", value: "GB" },
  { label: "Australia", value: "AU" },
  { label: "Canada", value: "CA" },
  { label: "Germany", value: "DE" },
  { label: "France", value: "FR" },
  { label: "South Korea", value: "KR" },
  { label: "China", value: "CN" },
  { label: "Other", value: "OTHER" },
];

export default function ProfileSetup() {
  const router = useRouter();
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [language, setLanguage] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("JP");
  const [checking, setChecking] = useState(true);

  // 入力済みの場合はタスク画面へ（再編集不可）
  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = localStorage.getItem("profile");
    if (existing) {
      router.replace("/tasks");
    } else {
      setChecking(false);
    }
  }, [router]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => String(currentYear - 10 - i));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));

  const isComplete = gender && job && language && birthYear && birthMonth && birthDay && zipCode && city && country;

  const handleSubmit = () => {
    if (!isComplete) return;
    localStorage.setItem("profile", JSON.stringify({
      gender, job, language,
      birthYear, birthMonth, birthDay,
      zipCode, city, country,
    }));
    router.replace("/tasks");
  };

  const selectStyle = (selected: boolean) => ({
    padding: "12px 18px",
    borderRadius: "99px",
    border: `2px solid ${selected ? "#06C755" : "#CCCCCC"}`,
    background: selected ? "#06C75520" : "#FFFFFF",
    color: selected ? "#06C755" : "#333333",
    fontWeight: "700" as const,
    fontSize: "13px",
    cursor: "pointer",
  });

  const inputStyle = {
    width: "100%",
    padding: "14px 16px",
    borderRadius: "12px",
    background: "#FFFFFF",
    border: "2px solid #E6E6E6",
    color: "#111111",
    fontSize: "14px",
    boxSizing: "border-box" as const,
    outline: "none",
  };

  if (checking) return null;

  return (
    <div style={{ backgroundColor: "#ECECEC", minHeight: "100vh", padding: "48px 24px 100px", color: "#111111" }}>
      <h1 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "8px" }}>プロフィール設定</h1>
      <p style={{ color: "#666666", fontSize: "13px", marginBottom: "16px" }}>より多くの案件を受け取るために教えてください</p>

      {/* 一度きり注意書き */}
      <div style={{ backgroundColor: "#FFF8E1", borderRadius: "12px", padding: "12px 16px", marginBottom: "32px", border: "1px solid #FFD54F" }}>
        <p style={{ fontSize: "12px", fontWeight: "700", color: "#B8860B", margin: "0 0 2px 0" }}>⚠️ 一度設定したら変更できません</p>
        <p style={{ fontSize: "11px", color: "#9A7D0A", margin: 0 }}>入力内容はアンケートのマッチングに使用されます。慎重に選択してください。</p>
      </div>

      {/* 性別 */}
      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "13px", color: "#666666", marginBottom: "12px" }}>性別</p>
        <div style={{ display: "flex", gap: "12px" }}>
          {["男性", "女性", "その他"].map(g => (
            <button key={g} onClick={() => setGender(g)} style={{ ...selectStyle(gender === g), flex: 1 }}>{g}</button>
          ))}
        </div>
      </div>

      {/* 生年月日 */}
      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "12px" }}>生年月日</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <select value={birthYear} onChange={e => setBirthYear(e.target.value)} style={{ flex: 2, padding: "14px", borderRadius: "12px", background: "#FFFFFF", border: "2px solid #E6E6E6", color: birthYear ? "#111111" : "#777777", fontSize: "14px" }}>
            <option value="">年</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select value={birthMonth} onChange={e => setBirthMonth(e.target.value)} style={{ flex: 1, padding: "14px", borderRadius: "12px", background: "#FFFFFF", border: "2px solid #E6E6E6", color: birthMonth ? "#111111" : "#777777", fontSize: "14px" }}>
            <option value="">月</option>
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={birthDay} onChange={e => setBirthDay(e.target.value)} style={{ flex: 1, padding: "14px", borderRadius: "12px", background: "#FFFFFF", border: "2px solid #E6E6E6", color: birthDay ? "#111111" : "#777777", fontSize: "14px" }}>
            <option value="">日</option>
            {days.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      {/* 郵便番号 */}
      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "13px", color: "#666666", marginBottom: "12px" }}>郵便番号（数字7桁・ハイフンなし）</p>
        <input
          type="text"
          inputMode="numeric"
          maxLength={7}
          placeholder="例: 1000001"
          value={zipCode}
          onChange={e => setZipCode(e.target.value.replace(/[^\d]/g, "").slice(0, 7))}
          style={inputStyle}
        />
      </div>

      {/* 都市名 */}
      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "13px", color: "#666666", marginBottom: "12px" }}>都市名</p>
        <input
          type="text"
          placeholder="例: Tokyo"
          value={city}
          onChange={e => setCity(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* 国 */}
      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "13px", color: "#666666", marginBottom: "12px" }}>国</p>
        <select value={country} onChange={e => setCountry(e.target.value)} style={{ width: "100%", padding: "14px", borderRadius: "12px", background: "#FFFFFF", border: "2px solid #E6E6E6", color: "#111111", fontSize: "14px" }}>
          {COUNTRIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
      </div>

      {/* 職業 */}
      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "13px", color: "#666666", marginBottom: "12px" }}>職業</p>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "10px" }}>
          {JOBS.map(j => (
            <button key={j} onClick={() => setJob(j)} style={selectStyle(job === j)}>{j}</button>
          ))}
        </div>
      </div>

      {/* 使用言語 */}
      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontSize: "13px", color: "#666666", marginBottom: "12px" }}>使用言語</p>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "10px" }}>
          {LANGUAGES.map(l => (
            <button key={l} onClick={() => setLanguage(l)} style={selectStyle(language === l)}>{l}</button>
          ))}
        </div>
      </div>

      {/* 報酬について */}
      <div style={{ backgroundColor: "#FFFFFF", borderRadius: "16px", padding: "16px", marginBottom: "32px", borderLeft: "3px solid #06C755" }}>
        <p style={{ color: "#06C755", fontSize: "12px", fontWeight: "700", margin: "0 0 4px 0" }}>報酬について</p>
        <p style={{ color: "#666666", fontSize: "12px", margin: 0 }}>案件完了後、USDCにて報酬をお支払いします</p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isComplete}
        style={{ width: "100%", padding: "18px", borderRadius: "99px", background: isComplete ? "linear-gradient(135deg, #06C755, #04a344)" : "#E6E6E6", color: isComplete ? "#fff" : "#999999", fontWeight: "700", fontSize: "14px", border: "none", cursor: isComplete ? "pointer" : "default" }}
      >
        タスクを始める
      </button>
    </div>
  );
}
