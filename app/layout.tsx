import type { Metadata } from "next";
import "./globals.css";

import createStore from 'react-auth-kit/createStore';
import Providers from "./components/Provider";


export const metadata: Metadata = {
  title: "Chat app",
  description: "Chat with your wingies!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <html lang="en">
        <body>{children}</body>
      </html>
    </Providers>
  );
}
