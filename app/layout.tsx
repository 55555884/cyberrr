import type { Metadata } from "next";
import MiniKitProvider from "@/components/MiniKitProvider"; // 正しいフォルダ構成に対応
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
        <MiniKitProvider>
          {children}
        </MiniKitProvider>
      </body>
    </html>
  );
}