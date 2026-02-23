"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ProfileGuard from "@/components/ProfileGuard";

interface Profile {
  gender?: string;
  birthYear?: string;
  birthMonth?: string;
  birthDay?: string;
  zipCode?: string;
  city?: string;
  country?: string;
}

export default function TasksPage() {
  const [surveyUrl, setSurveyUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [showSurvey, setShowSurvey] = useState(false);

  useEffect(() => {
    async function fetchUrl() {
      try {
        const profileRaw = localStorage.getItem("profile");
        const p: Profile = profileRaw ? JSON.parse(profileRaw) : {};
        const uid = "user_cyberrr_001";
        const params = new URLSearchParams({
          userId:     uid,
          gender:     p.gender     ?? "",
          birthYear:  p.birthYear  ?? "",
          birthMonth: p.birthMonth ?? "",
          birthDay:   p.birthDay   ?? "",
          zipCode:    p.zipCode    ?? "1000001",
          city:       p.city       ?? "Tokyo",
          country:    p.country    ?? "JP",
        });
        const res = await fetch(`/api/rapidoreach-uid?${params}`);
        const data = await res.json();
        setSurveyUrl(data.url ?? "");
      } catch {
        setSurveyUrl("");
      } finally {
        setLoading(false);
      }
    }
    fetchUrl();
  }, []);

  return (
    <ProfileGuard>
      {/* ── アプリ内 iframe オーバーレイ ── */}
      {showSurvey && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 1000,
          display: "flex", flexDirection: "column",
          backgroundColor: "#000",
        }}>
          {/* ヘッダーバー */}
          <div style={{
            display: "flex", alignItems: "center", gap: "12px",
            padding: "12px 16px",
            backgroundColor: "#111111", flexShrink: 0,
          }}>
            <button
              onClick={() => setShowSurvey(false)}
              style={{ background: "none", border: "none", color: "#FFFFFF", fontSize: "20px", cursor: "pointer", lineHeight: 1 }}
            >
              ←
            </button>
            <span style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 700 }}>RapidoReach Survey</span>
          </div>

          {/* iframe 本体 */}
          <iframe
            src={surveyUrl}
            style={{ flex: 1, width: "100%", border: "none" }}
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      )}

      {/* ── タスク一覧画面 ── */}
      <div style={{ backgroundColor: "#ECECEC", minHeight: "100vh", paddingBottom: "120px", color: "#111111" }}>

        {/* ヘッダー */}
        <div style={{ padding: "32px 24px 20px" }}>
          <p style={{ fontSize: "10px", fontWeight: 900, color: "#666666", letterSpacing: "0.12em", marginBottom: "6px" }}>TOTAL EARNED</p>
          <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
            <span style={{ fontSize: "48px", fontWeight: 900, fontStyle: "italic", lineHeight: 1 }}>$0.00</span>
            <span style={{ fontSize: "14px", fontWeight: 700, color: "#06C755" }}>USDC</span>
          </div>
        </div>

        <div style={{ padding: "0 24px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 900, fontStyle: "italic", letterSpacing: "-0.03em", marginBottom: "4px" }}>Available Tasks</h2>
          <p style={{ fontSize: "10px", fontWeight: 700, color: "#777777", letterSpacing: "0.1em", marginBottom: "28px" }}>OFFICIAL RAPIDOREACH FEED</p>

          {/* ローディングスケルトン */}
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {[0, 1, 2].map((i) => (
                <div key={i} style={{ backgroundColor: "#FFFFFF", borderRadius: "24px", padding: "24px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                    <div style={{ width: "64px", height: "12px", backgroundColor: "#E8E8E8", borderRadius: "99px" }} />
                    <div style={{ width: "48px", height: "20px", backgroundColor: "#E8E8E8", borderRadius: "99px" }} />
                  </div>
                  <div style={{ height: "18px", backgroundColor: "#E8E8E8", borderRadius: "8px", width: "75%", marginBottom: "10px" }} />
                  <div style={{ height: "12px", backgroundColor: "#E8E8E8", borderRadius: "8px", width: "50%" }} />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* メインカード */}
              <div style={{ backgroundColor: "#FFFFFF", padding: "32px", borderRadius: "40px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.04)", marginBottom: "16px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                  <span style={{ backgroundColor: "rgba(6,199,85,0.1)", color: "#06C755", fontSize: "9px", fontWeight: 900, padding: "4px 12px", borderRadius: "99px", letterSpacing: "0.1em" }}>ACTIVE</span>
                  <span style={{ fontSize: "24px", fontWeight: 900, fontStyle: "italic", color: "#111111" }}>$1.00+</span>
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "8px", color: "#111111" }}>プレミアムアンケート</h3>
                <p style={{ fontSize: "12px", color: "#999999", lineHeight: 1.7, marginBottom: "32px" }}>
                  プロフィールを自動連携済み。初期入力をスキップして直接案件を開始します。
                </p>
                <button
                  onClick={() => { if (surveyUrl) setShowSurvey(true); }}
                  disabled={!surveyUrl}
                  style={{
                    width: "100%", padding: "20px", borderRadius: "20px", border: "none",
                    cursor: surveyUrl ? "pointer" : "default",
                    background: surveyUrl ? "linear-gradient(135deg, #06C755, #04a344)" : "#E0E0E0",
                    color: surveyUrl ? "#FFFFFF" : "#AAAAAA",
                    fontSize: "13px", fontWeight: 900, letterSpacing: "0.04em",
                    boxShadow: surveyUrl ? "0 8px 24px rgba(6,199,85,0.3)" : "none",
                    transition: "all 0.2s",
                  }}
                >
                  {surveyUrl ? "案件リストを表示する →" : "API CONNECTING..."}
                </button>
              </div>

              <p style={{ fontSize: "10px", color: "#AAAAAA", textAlign: "center", lineHeight: 1.7, padding: "0 16px" }}>
                案件の報酬はRapidoReachの承認後、USDCにて即時送金されます。
              </p>
            </>
          )}
        </div>

        <Navbar />
      </div>
    </ProfileGuard>
  );
}
