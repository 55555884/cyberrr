import type { Metadata } from "next";
import MiniKitProvider from "@/components/MiniKitProvider"; // エイリアスを使用
import "./globals.css";

export const metadata: Metadata = { title: "CYBERRR" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <MiniKitProvider>{children}</MiniKitProvider>
      </body>
    </html>
  );
}