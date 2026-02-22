"use client";
import { useState, useEffect, useRef } from "react";

const tabs = ["ALL", "SURVEY", "OFFER", "VIDEO"];

export default function TasksPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [activeNav, setActiveNav] = useState("Tasks");
  const [showSurvey, setShowSurvey] = useState(false);
  const scriptLoaded = useRef(false);

  const appId = "PVnxv7sZMH2";

  const userId = typeof window !== "undefined"
    ? "user_" + (localStorage.getItem("worldid_verified") || "anonymous").slice(0, 10)
    : "anonymous";

  useEffect(() => {
    if (showSurvey && !scriptLoaded.current) {
      const container = document.getElementById("rapidoreach-offerwall");
      if (!container) return;

      const script = document.createElement("script");
      script.src = "https://www.rapidoreach.com/ofw/rapidoreach-widget.min.js";
      script.setAttribute("data-app-id", appId);
      script.setAttribute("data-end-user-id", userId);
      script.setAttribute("data-container", "#rapidoreach-offerwall");
      script.setAttribute("data-height", "720px");
      script.setAttribute("data-loader-text", "Finding surveys for you…");
      script.async = true;
      document.body.appendChild(script);
      scriptLoaded.current = true;
    }
  }, [showSurvey]);

  if (showSurvey) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "#ECECEC", fontFamily: "'DM Sans', sans-serif" }}>
        <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700;900&display=swap');`}</style>
        <div style={{ background: "#fff", padding: "16px 20px", display: "flex", alignItems: "center", gap: "12px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 10 }}>
          <button
            onClick={() => setShowSurvey(false)}
            style={{ background: "#ECECEC", border: "none", borderRadius: "10px", padding: "8px 14px", fontWeight: "700", cursor: "pointer", fontSize: "14px" }}
          >
            ← 戻る
          </button>
          <span style={{ fontWeight: "800", fontSize: "15px", color: "#111" }}>アンケート一覧</span>
        </div>
        <div style={{ padding: "20px" }}>
          <div id="rapidoreach-offerwall" style={{ width: "100%", minHeight: "720px", borderRadius: "16px", overflow: "hidden" }} />
        </div>
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

        <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {(activeTab === "ALL" || activeTab === "SURVEY") && (
            <div
              className="card"
              onClick={() => setShowSurvey(true)}
              style={{ background: "#fff", borderRadius: "24px", padding: "22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", cursor: "pointer" }}
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
          )}

          {["OFFER", "VIDEO"].map(type => (
            (activeTab === "ALL" || activeTab === type) && (
              <div key={type} style={{ background: "#fff", borderRadius: "24px", padding: "22px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", opacity: 0.5 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ background: "#ECECEC", borderRadius: "10px", padding: "6px 10px", display: "inline-block", marginBottom: "10px" }}>
                      <span style={{ fontSize: "10px", fontWeight: "800", color: "#555" }}>{type}</span>
                    </div>
                    <p style={{ fontSize: "15px", fontWeight: "700", color: "#111" }}>Coming Soon</p>
                  </div>
                  <span style={{ fontSize: "20px" }}>🔒</span>
                </div>
              </div>
            )
          ))}
        </div>
      </main>

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