"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const tabs = ["ALL", "SURVEY", "OFFER", "VIDEO"];

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [activeNav, setActiveNav] = useState("Tasks");
  const [showSurvey, setShowSurvey] = useState(false);
  const router = useRouter();

  const appId = process.env.NEXT_PUBLIC_RAPIDOREACH_APP_ID;

  // プロフィール取得
  const profile = typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("profile") || "{}")
    : {};

  const userId = typeof window !== "undefined"
    ? localStorage.getItem("worldid_verified") ? "user_" + btoa(localStorage.getItem("worldid_verified") || "").slice(0, 10) : "anonymous"
    : "anonymous";

  const rapidoUrl = `https://survey.rapidoreach.com/?app_key=${appId}&user_id=${userId}&fname=${profile.gender || ""}&lname=user&email=${userId}@cyberrr.app&birth_date=${profile.birthYear || "2000"}-${profile.birthMonth || "01"}-${profile.birthDay || "01"}&gender=${profile.gender === "男性" ? "male" : profile.gender === "女性" ? "female" : "other"}&country=JP&zip=${profile.zip || "100-0001"}&city=${profile.city || "Tokyo"}`;

  if (showSurvey) {
    return (
      <div style={{ position: "fixed", inset: 0, background: "#ECECEC", zIndex: 999, display: "flex", flexDirection: "column" }}>
        <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
          <button
            onClick={() => setShowSurvey(false)}
            style={{ background: "#ECECEC", border: "none", borderRadius: "10px", padding: "8px 14px", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
          >
            ← 戻る
          </button>
          <span style={{ fontWeight: "800", fontSize: "15px", color: "#111" }}>アンケート</span>
        </div>
        <iframe
          src={rapidoUrl}
          style={{ flex: 1, border: "none", width: "100%" }}
          allow="camera; microphone"
        />
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ECECEC", fontFamily: "'DM Sans', sans-serif", paddingBottom: "90px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .card:active { transform: scale(0.97); }
      `}</style>

      {/* ヘッダー */}
      <header style={{ padding: "52px 24px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: "11px", fontWeight: "700", color: "#999", letterSpacing: "0.15em", marginBottom: "4px" }}>WELCOME BACK</p>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#111", letterSpacing: "-0.03em" }}>CYBERRR</h1>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ width: "42px", height: "42px", borderRadius: "14px", background: "#fff", border: "none", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>🔔</button>
          <button style={{ width: "42px", height: "42px", borderRadius: "14px", background: "#111", border: "none", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center" }}>👤</button>
        </div>
      </header>

      {/* 収益バナー */}
      <div style={{ margin: "0 24px 28px", background: "linear-gradient(135deg, #111 0%, #333 100%)", borderRadius: "24px", padding: "24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(6,199,85,0.15)" }} />
        <p style={{ fontSize: "11px", color: "#666", letterSpacing: "0.12em", marginBottom: "8px" }}>TOTAL EARNED</p>
        <p style={{ fontSize: "36px", fontWeight: "900", color: "#fff", letterSpacing: "-0.03em", marginBottom: "4px" }}>$0.00 <span style={{ fontSize: "14px", color: "#06C755", fontWeight: "700" }}>USDC</span></p>
        <p style={{ fontSize: "12px", color: "#555" }}>Complete tasks to earn rewards</p>
      </div>

      <main style={{ padding: "0 24px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#111", letterSpacing: "-0.02em" }}>Available Tasks</h2>
          <p style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}>Powered by RapidoReach</p>
        </div>

        {/* タブ */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", overflowX: "auto", paddingBottom: "4px" }}>
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 18px",
                borderRadius: "99px",
                border: "none",
                cursor: "pointer",
                fontSize: "11px",
                fontWeight: "800",
                letterSpacing: "0.1em",
                whiteSpace: "nowrap",
                background: activeTab === tab ? "#111" : "#fff",
                color: activeTab === tab ? "#fff" : "#999",
                boxShadow: activeTab === tab ? "0 4px 12px rgba(0,0,0,0.2)" : "0 2px 6px rgba(0,0,0,0.06)",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* RapidoReachカード */}
        <div
          className="card"
          onClick={() => setShowSurvey(true)}
          style={{ background: "#fff", borderRadius: "24px", padding: "22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer", marginBottom: "14px" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ background: "#ECECEC", borderRadius: "10px", padding: "6px 10px" }}>
                <span style={{ fontSize: "10px", fontWeight: "800", color: "#555", letterSpacing: "0.1em" }}>SURVEY</span>
              </div>
              <span style={{ fontSize: "11px", color: "#bbb", fontWeight: "500" }}>RapidoReach</span>
            </div>
            <div style={{ textAlign: "right" }}>
              <p style={{ fontSize: "22px", fontWeight: "900", color: "#111", letterSpacing: "-0.02em", lineHeight: 1 }}>$1.00+</p>
              <p style={{ fontSize: "10px", color: "#06C755", fontWeight: "700" }}>USDC</p>
            </div>
          </div>
          <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "16px" }}>Available Surveys</h3>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>複数のアンケートから選択</span>
            <button style={{ background: "#111", color: "#fff", border: "none", borderRadius: "12px", padding: "8px 18px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
              Start →
            </button>
          </div>
        </div>

        {/* Coming Soon カード */}
        {["OFFER", "VIDEO"].map(type => (
          <div key={type} style={{ background: "#fff", borderRadius: "24px", padding: "22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", marginBottom: "14px", opacity: 0.5 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ background: "#ECECEC", borderRadius: "10px", padding: "6px 10px", display: "inline-block", marginBottom: "10px" }}>
                  <span style={{ fontSize: "10px", fontWeight: "800", color: "#555" }}>{type}</span>
                </div>
                <p style={{ fontSize: "15px", fontWeight: "700", color: "#111" }}>Coming Soon</p>
              </div>
              <span style={{ fontSize: "12px", color: "#bbb", fontWeight: "600" }}>🔒</span>
            </div>
          </div>
        ))}
      </main>

      {/* ボトムナビ */}
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", borderTop: "1px solid #eee", padding: "12px 8px 24px", display: "flex", justifyContent: "space-around" }}>
        {[
          { icon: "📋", label: "Tasks" },
          { icon: "🔍", label: "Search" },
          { icon: "🕐", label: "History" },
          { icon: "👤", label: "Profile" },
        ].map(item => (
          <button
            key={item.label}
            onClick={() => setActiveNav(item.label)}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", background: "none", border: "none", cursor: "pointer", padding: "4px 16px" }}
          >
            <span style={{ fontSize: "20px" }}>{item.icon}</span>
            <span style={{ fontSize: "10px", fontWeight: "700", color: activeNav === item.label ? "#111" : "#bbb", letterSpacing: "0.05em" }}>{item.label}</span>
            {activeNav === item.label && <div style={{ width: "4px", height: "4px", borderRadius: "50%", background: "#06C755" }} />}
          </button>
        ))}
      </nav>
    </div>
  );
}