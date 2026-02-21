import type { Metadata } from "next";
import MiniKitProvider from "@/components/MiniKitProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "CYBERRR",
  description: "Official Native Login System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <MiniKitProvider>{children}</MiniKitProvider>
      </body>
    </html>
  );
}