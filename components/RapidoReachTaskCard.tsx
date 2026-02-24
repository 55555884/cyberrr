// RapidoReachタスク表示カードコンポーネント
// アンケートの報酬額・所要時間・参加リンクを表示する

"use client";
import { useRouter } from "next/navigation";
import type { RapidoReachSurvey } from "@/lib/types";

interface RapidoReachTaskCardProps {
  survey: RapidoReachSurvey; // 表示するアンケートデータ
}

export default function RapidoReachTaskCard({ survey }: RapidoReachTaskCardProps) {
  const router = useRouter();

  // アンケート参加ボタンのクリックハンドラー
  // entry_linkをSurveyページのiframeで開く
  const handleStart = () => {
    const surveyUrl = encodeURIComponent(survey.entry_link);
    router.push(`/survey?url=${surveyUrl}`);
  };

  return (
    <div
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: "16px",
        padding: "16px",
        boxShadow: "0 8px 30px rgba(17,17,17,0.06)",
        border: "1px solid rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {/* カードヘッダー：カテゴリバッジと報酬額 */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 600,
            color: "#06C755",
            border: "1px solid #06C755",
            borderRadius: "999px",
            padding: "3px 10px",
          }}
        >
          {survey.category ?? "SURVEY"}
        </span>
        {/* 報酬額の表示（USD） */}
        <span style={{ fontSize: "18px", fontWeight: "bold", color: "#06C755" }}>
          ${survey.cpi.toFixed(2)}
        </span>
      </div>

      {/* アンケートタイトル（設定されている場合） */}
      {survey.title && (
        <p style={{ fontSize: "14px", fontWeight: 600, color: "#111111", margin: 0 }}>
          {survey.title}
        </p>
      )}

      {/* タスク詳細：所要時間・アンケート番号 */}
      <div style={{ display: "flex", gap: "16px" }}>
        {/* 所要時間 */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "13px" }}>⏱</span>
          <span style={{ fontSize: "12px", color: "#666666" }}>
            {survey.loi} 分
          </span>
        </div>
        {/* アンケート番号 */}
        <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
          <span style={{ fontSize: "13px" }}>📋</span>
          <span style={{ fontSize: "12px", color: "#666666" }}>
            #{survey.survey_number}
          </span>
        </div>
        {/* 対象者率（設定されている場合） */}
        {survey.ir !== undefined && (
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "13px" }}>🎯</span>
            <span style={{ fontSize: "12px", color: "#666666" }}>
              IR: {survey.ir}%
            </span>
          </div>
        )}
      </div>

      {/* 参加ボタン：entry_linkをiframeで開く */}
      <button
        onClick={handleStart}
        style={{
          width: "100%",
          padding: "12px",
          borderRadius: "999px",
          background: "linear-gradient(135deg, #06C755, #04a344)",
          color: "#FFFFFF",
          fontSize: "13px",
          fontWeight: 600,
          border: "none",
          cursor: "pointer",
        }}
      >
        アンケートに参加する
      </button>
    </div>
  );
}
