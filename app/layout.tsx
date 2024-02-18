import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Wing chat app",
  description: "Chat with your wingies!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
