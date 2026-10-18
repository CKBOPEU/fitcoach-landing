import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "FitCoach — Make room for a stronger you",
  description:
    "A personal training website concept. Explore thoughtful coaching programmes, a balanced weekly routine and a local demo consultation form.",
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
