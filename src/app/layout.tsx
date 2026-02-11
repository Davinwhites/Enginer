import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TrafficTracker from "@/components/public/TrafficTracker";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Engineer Portfolio | Professional Engineering Designs",
  description: "Showcase of professional engineering plans, blueprints, and architectural designs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" translate="no">
      <head>
        <meta name="google" content="notranslate" />
        <meta name="googlebot" content="notranslate" />
      </head>
      <body className={`${inter.className} bg-gray-950 text-gray-100 flex flex-col min-h-screen selection:bg-blue-500/30 selection:text-blue-200 notranslate`}>
        <TrafficTracker />
        {children}
      </body>
    </html>
  );
}
