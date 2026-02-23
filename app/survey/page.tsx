"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function SurveyPage() {
  const router = useRouter();
  const [surveyUrl, setSurveyUrl] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const url = params.get("url");
    if (url) setSurveyUrl(url);
  }, []);

  return (
    <div style={{
      backgroundColor: "#111111",
      display: "flex",
      flexDirection: "column",
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}>
      {/* ヘッダーバー */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "12px",
        padding: "12px 16px",
        backgroundColor: "#111111",
        flexShrink: 0,
        borderBottom: "1px solid #222222",
        minHeight: "52px",
      }}>
        <button
          onClick={() => router.back()}
          style={{
            background: "none",
            border: "none",
            color: "#FFFFFF",
            fontSize: "22px",
            cursor: "pointer",
            lineHeight: 1,
            padding: "4px 8px",
          }}
        >
          ←
        </button>
        <span style={{ color: "#FFFFFF", fontSize: "13px", fontWeight: 700 }}>RapidoReach Survey</span>
      </div>

      {/* iframe */}
      {surveyUrl ? (
        <iframe
          src={surveyUrl}
          style={{ flex: 1, width: "100%", border: "none", display: "block" }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <p style={{ color: "#666666", fontSize: "14px" }}>Loading...</p>
        </div>
      )}
    </div>
  );
}
