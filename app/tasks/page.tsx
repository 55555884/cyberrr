"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const missions = [
  { id: 1, title: "Consumer Trend Survey", reward: "1.50", time: "5 min", rating: "4.5", category: "SURVEY", company: "Nielsen" },
  { id: 2, title: "Daily Lifestyle Feedback", reward: "0.75", time: "3 min", rating: "4.2", category: "SURVEY", company: "Ipsos" },
  { id: 3, title: "Tech Product Review", reward: "2.00", time: "8 min", rating: "4.8", category: "OFFER", company: "Google" },
  { id: 4, title: "Food Preference Study", reward: "1.25", time: "5 min", rating: "4.3", category: "SURVEY", company: "Kantar" },
];

const tabs = ["ALL", "SURVEY", "OFFER", "VIDEO"];

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [activeNav, setActiveNav] = useState("Tasks");
  const router = useRouter();

  const filtered = activeTab === "ALL" ? missions : missions.filter(m => m.category === activeTab);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ECECEC", fontFamily: "'DM Sans', sans-serif", paddingBottom: "90px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&family=DM+Mono:wght@500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .card { transition: transform 0.15s ease, box-shadow 0.15s ease; }
        .card:active { transform: scale(0.97); }
        .tab-btn { transition: all 0.2s ease; }
        .nav-item { transition: all 0.2s ease; }
      `}</style>

      {/* ヘッダー */}
      <header style={{ padding: "52px 24px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <p style={{ fontSize: "11px", fontWeight: "700", color: "#999", letterSpacing: "0.15em", marginBottom: "4px" }}>WELCOME BACK</p>
          <h1 style={{ fontSize: "28px", fontWeight: "900", color: "#111", letterSpacing: "-0.03em" }}>CYBERRR</h1>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button style={{ width: "42px", height: "42px", borderRadius: "14px", background: "#fff", border: "none", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>🔔</button>
          <button style={{ width: "42px", height: "42px", borderRadius: "14px", background: "#111", border: "none", cursor: "pointer", fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>👤</button>
        </div>
      </header>

      {/* 収益バナー */}
      <div style={{ margin: "0 24px 28px", background: "linear-gradient(135deg, #111 0%, #333 100%)", borderRadius: "24px", padding: "24px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-20px", right: "-20px", width: "120px", height: "120px", borderRadius: "50%", background: "rgba(6,199,85,0.15)" }} />
        <div style={{ position: "absolute", bottom: "-30px", right: "40px", width: "80px", height: "80px", borderRadius: "50%", background: "rgba(6,199,85,0.08)" }} />
        <p style={{ fontSize: "11px", color: "#666", letterSpacing: "0.12em", marginBottom: "8px" }}>TOTAL EARNED</p>
        <p style={{ fontSize: "36px", fontWeight: "900", color: "#fff", letterSpacing: "-0.03em", marginBottom: "4px" }}>$0.00 <span style={{ fontSize: "14px", color: "#06C755", fontWeight: "700" }}>USDC</span></p>
        <p style={{ fontSize: "12px", color: "#555" }}>Complete tasks to earn rewards</p>
      </div>

      <main style={{ padding: "0 24px" }}>
        {/* タイトル */}
        <div style={{ marginBottom: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "900", color: "#111", letterSpacing: "-0.02em" }}>Available Tasks</h2>
          <p style={{ fontSize: "12px", color: "#999", marginTop: "4px" }}>{filtered.length} tasks waiting for you</p>
        </div>

        {/* タブ */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "24px", overflowX: "auto", paddingBottom: "4px" }}>
          {tabs.map(tab => (
            <button
              key={tab}
              className="tab-btn"
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

        {/* カード */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {filtered.map(m => (
            <div
              key={m.id}
              className="card"
              style={{ background: "#fff", borderRadius: "24px", padding: "22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer" }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ background: "#ECECEC", borderRadius: "10px", padding: "6px 10px" }}>
                    <span style={{ fontSize: "10px", fontWeight: "800", color: "#555", letterSpacing: "0.1em" }}>{m.category}</span>
                  </div>
                  <span style={{ fontSize: "11px", color: "#bbb", fontWeight: "500" }}>{m.company}</span>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: "22px", fontWeight: "900", color: "#111", letterSpacing: "-0.02em", lineHeight: 1 }}>${m.reward}</p>
                  <p style={{ fontSize: "10px", color: "#06C755", fontWeight: "700" }}>USDC</p>
                </div>
              </div>

              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#111", marginBottom: "16px", lineHeight: 1.3 }}>{m.title}</h3>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: "flex", gap: "16px" }}>
                  <span style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>⏱ {m.time}</span>
                  <span style={{ fontSize: "12px", color: "#999", fontWeight: "600" }}>★ {m.rating}</span>
                </div>
                <button style={{ background: "#111", color: "#fff", border: "none", borderRadius: "12px", padding: "8px 18px", fontSize: "12px", fontWeight: "700", cursor: "pointer" }}>
                  Start →
                </button>
              </div>
            </div>
          ))}
        </div>
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
            className="nav-item"
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