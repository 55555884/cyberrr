// ProfileGuardコンポーネント：認証とプロフィール入力を保護するガード
// World ID認証済み＋プロフィール完了済みのユーザーのみコンテンツを表示する

"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // World ID認証済みユーザーIDを確認する
    const userId = localStorage.getItem("worldid_user_id");
    // プロフィール入力済みフラグを確認する
    const profileCompleted = localStorage.getItem("worldid_profile_completed");
    // localStorageのプロフィールキャッシュを確認する
    const profile = localStorage.getItem("profile");

    if (!userId) {
      // 未認証の場合はトップページへリダイレクト
      router.replace("/");
      return;
    }
    if (profileCompleted !== "true" || !profile) {
      // プロフィール未完了の場合はプロフィール入力ページへリダイレクト
      router.replace("/profile/setup");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div style={{ backgroundColor: "#ECECEC", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: "32px", height: "32px", borderRadius: "50%", border: "3px solid #E0E0E0", borderTopColor: "#111111", animation: "spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return <>{children}</>;
}

