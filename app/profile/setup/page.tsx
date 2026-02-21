"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const JOBS = ["会社員", "公務員", "経営者/役員", "フリーランス", "学生", "主婦/主夫", "アルバイト/パート", "無職", "その他"];
const LANGUAGES = ["日本語", "English", "中文", "한국어", "Español", "Français", "Deutsch", "Português"];

export default function ProfileSetup() {
  const router = useRouter();
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [language, setLanguage] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => String(currentYear - 10 - i));
  const months = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, "0"));
  const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0"));

  const isComplete = gender && job && language && birthYear && birthMonth && birthDay;

  const handleSubmit = () => {
    if (!isComplete) return;
    localStorage.setItem("profile", JSON.stringify({ gender, job, language, birthYear, birthMonth, birthDay }));
    router.replace("/tasks");
  };

  const selectStyle = (selected: boolean) => ({
    padding: "12px 18px",
    borderRadius: "99px",
    border: `2px solid ${selected ? "#06C755" : "#222"}`,
    background: selected ? "#06C75520" : "#141414",
    color: selected ? "#06C755" : "#888",
    fontWeight: "700" as const,
    fontSize: "13px",
    cursor: "pointer",
  });

  return (
    <div style={{ backgroundColor: "#0A0A0A", minHeight: "100vh", padding: "48px 24px 100px", color: "#fff" }}>
      <h1 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "8px" }}>プロフィール設定</h1>
      <p style={{ color: "#555", fontSize: "13px", marginBottom: "40px" }}>より多くの案件を受け取るために教えてください</p>

      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "12px" }}>性別</p>
        <div style={{ display: "flex", gap: "12px" }}>
          {["男性", "女性", "その他"].map(g => (
            <button key={g} onClick={() => setGender(g)} style={{ ...selectStyle(gender === g), flex: 1 }}>
              {g}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "12px" }}>生年月日</p>
        <div style={{ display: "flex", gap: "10px" }}>
          <select value={birthYear} onChange={e => setBirthYear(e.target.value)} style={{ flex: 2, padding: "14px", borderRadius: "12px", background: "#141414", border: "2px solid #222", color: birthYear ? "#fff" : "#555", fontSize: "14px" }}>
            <option value="">年</option>
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <select value={birthMonth} onChange={e => setBirthMonth(e.target.value)} style={{ flex: 1, padding: "14px", borderRadius: "12px", background: "#141414", border: "2px solid #222", color: birthMonth ? "#fff" : "#555", fontSize: "14px" }}>
            <option value="">月</option>
            {months.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={birthDay} onChange={e => setBirthDay(e.target.value)} style={{ flex: 1, padding: "14px", borderRadius: "12px", background: "#141414", border: "2px solid #222", color: birthDay ? "#fff" : "#555", fontSize: "14px" }}>
            <option value="">日</option>
            {days.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "12px" }}>職業</p>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "10px" }}>
          {JOBS.map(j => (
            <button key={j} onClick={() => setJob(j)} style={selectStyle(job === j)}>
              {j}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "40px" }}>
        <p style={{ fontSize: "13px", color: "#888", marginBottom: "12px" }}>使用言語</p>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "10px" }}>
          {LANGUAGES.map(l => (
            <button key={l} onClick={() => setLanguage(l)} style={selectStyle(language === l)}>
              {l}
            </button>
          ))}
        </div>
      </div>

      <div style={{ backgroundColor: "#141414", borderRadius: "16px", padding: "16px", marginBottom: "32px", borderLeft: "3px solid #06C755" }}>
        <p style={{ color: "#06C755", fontSize: "12px", fontWeight: "700", margin: "0 0 4px 0" }}>報酬について</p>
        <p style={{ color: "#666", fontSize: "12px", margin: 0 }}>案件完了後、USDCにて報酬をお支払いします</p>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isComplete}
        style={{ width: "100%", padding: "18px", borderRadius: "99px", background: isComplete ? "linear-gradient(135deg, #06C755, #04a344)" : "#222", color: isComplete ? "#fff" : "#555", fontWeight: "700", fontSize: "14px", border: "none", cursor: isComplete ? "pointer" : "default" }}
      >
        タスクを始める
      </button>
    </div>
  );
}