import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Neurolytics | AI & Neural Analytics Engine",
  description: "Next-gen neural data processing and AI automation agency.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.className} bg-[#020617] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}