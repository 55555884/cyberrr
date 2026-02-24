// ヘッダーコンポーネント：ロゴとナビゲーションアイコンを表示
import Image from "next/image";

interface HeaderProps {
  title?: string; // カスタムタイトル（省略時はロゴ画像を表示）
  showIcons?: boolean; // 通知・プロフィールアイコンの表示フラグ
}

export default function Header({ title, showIcons = true }: HeaderProps) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 16px 12px",
        backgroundColor: "#ECECEC",
      }}
    >
      {/* ロゴまたはカスタムタイトル */}
      {title ? (
        <h1 style={{ fontSize: "22px", fontWeight: 900, color: "#111111", margin: 0 }}>
          {title}
        </h1>
      ) : (
        <Image
          src="/logo.png"
          alt="CYBERRR"
          width={160}
          height={32}
          style={{ objectFit: "contain" }}
          priority
        />
      )}

      {/* ナビゲーションアイコン（通知・プロフィール） */}
      {showIcons && (
        <div style={{ display: "flex", gap: "12px" }}>
          <span style={{ fontSize: "20px", cursor: "pointer" }} aria-label="通知">
            🔔
          </span>
          <span style={{ fontSize: "20px", cursor: "pointer" }} aria-label="プロフィール">
            👤
          </span>
        </div>
      )}
    </div>
  );
}
