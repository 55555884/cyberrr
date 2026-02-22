"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfileGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const verified = localStorage.getItem("worldid_verified");
    const profile = localStorage.getItem("profile");

    if (!verified) {
      router.replace("/");
      return;
    }
    if (!profile) {
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
