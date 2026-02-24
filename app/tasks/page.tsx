// タスク表示画面：RapidoReach v2 APIからアンケート一覧を取得して表示する
// ProfileGuardでプロフィール完了を必須にする

"use client";
import { useState, useEffect, useCallback } from "react";
import ProfileGuard from "@/components/ProfileGuard";
import Navbar from "@/components/Navbar";
import RapidoReachTaskCard from "@/components/RapidoReachTaskCard";
import type { RapidoReachSurvey } from "@/lib/types";

export default function TasksPage() {
  // アンケート一覧の状態
  const [surveys, setSurveys] = useState<RapidoReachSurvey[]>([]);
  // ローディング状態
  const [isLoading, setIsLoading] = useState(true);
  // エラーメッセージの状態
  const [error, setError] = useState("");
  // ソート選択の状態（0=最高報酬順, 1=マッチ順, 2=最新順）
  const [sortTab, setSortTab] = useState(0);

  // アンケート一覧を取得する（useCallbackでメモ化してuseEffect依存配列に追加できるようにする）
  const fetchSurveys = useCallback(async () => {
    setIsLoading(true);
    setError("");

    // localStorageからユーザーIDとプロフィールを取得する
    const userId = localStorage.getItem("worldid_user_id");
    const profileData = localStorage.getItem("profile");

    if (!userId || !profileData) {
      setError("プロフィール情報が見つかりません");
      setIsLoading(false);
      return;
    }

    // プロフィールデータをパースする
    const profile = JSON.parse(profileData);

    // APIクエリパラメータを構築する（RapidoReach v2用）
    const query = new URLSearchParams({
      userId,
      gender: profile.gender, // "1"=男性, "2"=女性
      dob: profile.dob, // YYYY-MM-DD形式
      zip: profile.zipCode,
    });

    try {
      // サーバーサイドAPIを経由してRapidoReach v2からアンケートを取得する
      const res = await fetch(`/api/tasks?${query.toString()}`);

      if (!res.ok) {
        // HTTPエラー（429 rate limitなど）のハンドリング
        if (res.status === 429) {
          setError("リクエスト数の上限に達しました。しばらくしてから再試行してください。");
        } else {
          setError(`タスクの取得に失敗しました（エラー: ${res.status}）`);
        }
        setIsLoading(false);
        return;
      }

      const data = await res.json();
      setSurveys(data.surveys ?? []);
    } catch (err) {
      console.error("タスク取得エラー:", err);
      setError("接続エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 初回マウント時にアンケートを取得する
  useEffect(() => {
    fetchSurveys();
  }, [fetchSurveys]);

  // ソートタブに応じてアンケートをソートする
  const sortedSurveys = [...surveys].sort((a, b) => {
    if (sortTab === 0) return b.cpi - a.cpi; // 最高報酬順
    if (sortTab === 1) return (b.ir ?? 0) - (a.ir ?? 0); // マッチ率順
    return 0; // 最新順（APIのデフォルト順序を維持）
  });

  return (
    <ProfileGuard>
      <div style={{ backgroundColor: "#ECECEC", minHeight: "100vh", paddingBottom: "100px" }}>

        {/* ヘッダー */}
        <div style={{ padding: "24px 16px 12px" }}>
          <h2 style={{ fontSize: "22px", fontWeight: 900, color: "#111111", margin: 0 }}>
            AVAILABLE TASKS
          </h2>
        </div>

        {/* ソートタブ */}
        <div style={{ padding: "0 16px 16px", display: "flex", gap: "8px" }}>
          {["Highest Paying", "Best Match", "Recent"].map((tab, i) => (
            <button
              key={tab}
              onClick={() => setSortTab(i)}
              style={{
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "11px",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                background:
                  sortTab === i
                    ? "linear-gradient(135deg, #06C755, #04a344)"
                    : "#E0E0E0",
                color: sortTab === i ? "#FFFFFF" : "#888888",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* コンテンツエリア */}
        <div style={{ padding: "0 16px", display: "flex", flexDirection: "column", gap: "12px" }}>

          {/* ローディング状態 */}
          {isLoading && (
            <div style={{ display: "flex", justifyContent: "center", padding: "48px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  border: "3px solid #E0E0E0",
                  borderTopColor: "#06C755",
                  animation: "spin 0.8s linear infinite",
                }}
              />
            </div>
          )}

          {/* エラー状態 */}
          {!isLoading && error && (
            <div
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                padding: "20px",
                boxShadow: "0 8px 30px rgba(17,17,17,0.06)",
                border: "1px solid rgba(0,0,0,0.06)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>⚠️</div>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", color: "#111111", marginBottom: "6px" }}>
                Something went wrong
              </h3>
              <p style={{ fontSize: "12px", color: "#888888", marginBottom: "16px" }}>{error}</p>
              {/* 再試行ボタン */}
              <button
                onClick={fetchSurveys}
                style={{
                  padding: "10px 24px",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #06C755, #04a344)",
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                再試行する
              </button>
            </div>
          )}

          {/* アンケートなし（空状態） */}
          {!isLoading && !error && sortedSurveys.length === 0 && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "60px 32px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>📭</div>
              <h3 style={{ fontSize: "18px", fontWeight: "bold", color: "#111111", marginBottom: "8px" }}>
                No tasks available
              </h3>
              <p style={{ fontSize: "13px", color: "#888888", marginBottom: "24px", lineHeight: 1.6 }}>
                新しいタスクが追加されると<br />ここに表示されます。
              </p>
              {/* 更新ボタン */}
              <button
                onClick={fetchSurveys}
                style={{
                  padding: "12px 28px",
                  borderRadius: "999px",
                  background: "linear-gradient(135deg, #06C755, #04a344)",
                  color: "#FFFFFF",
                  fontSize: "13px",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                更新する
              </button>
            </div>
          )}

          {/* アンケート一覧：RapidoReachTaskCardで各アンケートを表示する */}
          {!isLoading && !error && sortedSurveys.map((survey) => (
            <RapidoReachTaskCard key={survey.survey_number} survey={survey} />
          ))}
        </div>

        {/* スピンアニメーション */}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

        {/* ボトムナビゲーション */}
        <Navbar />
      </div>
    </ProfileGuard>
  );
}