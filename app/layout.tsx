import type { Metadata } from "next";
// インポートパスを現在のフォルダ構成（./components/...）に合わせて修正しました
import MiniKitProvider from "./components/MiniKitProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "CYBERRR",
  description: "Verify World ID to Unlock Premium Tasks",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        {/* アプリ全体をMiniKitProviderで包むことで、ログイン機能が有効になります */}
        <MiniKitProvider>
          {children}
        </MiniKitProvider>
      </body>
    </html>
  );
}