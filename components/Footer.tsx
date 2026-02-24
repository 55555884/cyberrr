// フッターコンポーネント：著作権表示などのシンプルなフッター
export default function Footer() {
  return (
    <footer
      style={{
        textAlign: "center",
        padding: "16px",
        fontSize: "11px",
        color: "#AAAAAA",
      }}
    >
      {/* 著作権表示 */}
      <p style={{ margin: 0 }}>© 2026 CYBERRR. All rights reserved.</p>
      {/* 利用規約・プライバシーポリシーリンク */}
      <p style={{ margin: "4px 0 0" }}>
        <a href="#" style={{ color: "#888888", textDecoration: "none" }}>
          利用規約
        </a>
        {" · "}
        <a href="#" style={{ color: "#888888", textDecoration: "none" }}>
          プライバシーポリシー
        </a>
      </p>
    </footer>
  );
}
