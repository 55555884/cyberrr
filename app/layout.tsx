import type { Metadata } from "next";
import MiniKitProvider from "@/components/MiniKitProvider"; // フォルダ構成ミスを修正済み
import "./globals.css";

export const metadata: Metadata = {
  title: "CYBERRR | Official",
  description: "Native Login with World ID",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <MiniKitProvider>{children}</MiniKitProvider>
      </body>
    </html>
  );
}