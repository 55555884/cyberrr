"use client";
import ProfileGuard from "@/components/ProfileGuard";
import Navbar from "@/components/Navbar";

export default function HistoryPage() {
  const histories = [
    { id: 1, title: "Lifestyle Survey", date: "2026/02/21", amount: "+0.50 USDC", status: "完了" },
    { id: 2, title: "Crypto Feedback", date: "2026/02/20", amount: "+1.20 USDC", status: "承認待ち" },
  ];

  return (
    <ProfileGuard>
      <div style={{ backgroundColor: "#ECECEC", minHeight: "100vh", padding: "40px 24px 120px" }}>
        <h1 style={{ fontSize: "28px", fontWeight: 900, marginBottom: "30px" }}>HISTORY</h1>

        {/* 収益サマリー */}
        <div style={{ backgroundColor: "#FFFFFF", borderRadius: "24px", padding: "24px", color: "#111111", marginBottom: "32px", boxShadow: "0 8px 30px rgba(17,17,17,0.06)", border: "1px solid rgba(0,0,0,0.06)" }}>
          <p style={{ fontSize: "14px", color: "#666666" }}>総獲得報酬</p>
          <div style={{ fontSize: "36px", fontWeight: 900, color: "#06C755" }}>1.70 <span style={{ fontSize: "16px", color: "#111111" }}>USDC</span></div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {histories.map(h => (
            <div key={h.id} style={{ backgroundColor: "#FFF", padding: "20px", borderRadius: "20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
              <div>
                <div style={{ fontWeight: "bold", fontSize: "16px" }}>{h.title}</div>
                <div style={{ fontSize: "12px", color: "#AAA" }}>{h.date}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontWeight: "bold", color: "#111" }}>{h.amount}</div>
                <div style={{ fontSize: "10px", color: h.status === "完了" ? "#06C755" : "#F39C12" }}>{h.status}</div>
              </div>
            </div>
          ))}
        </div>

        <Navbar />
      </div>
    </ProfileGuard>
  );
}