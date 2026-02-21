import MiniKitProvider from "@/components/MiniKitProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <MiniKitProvider>{children}</MiniKitProvider>
      </body>
    </html>
  );
}