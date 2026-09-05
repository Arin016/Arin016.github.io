import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TourProvider } from "@/components/Tour";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arin Mallanna Tumbagi — Systems Engineer",
  description:
    "Arin Tumbagi builds distributed systems at Saviynt: a 21-hour audit check rebuilt to ~3 minutes, streaming exports with no upper bound at 7MB flat, exactly-once audit ingestion. IIT Madras. LeetCode Guardian / Codeforces Expert.",
  metadataBase: new URL("https://arinmallannagithubio.vercel.app"),
  openGraph: {
    title: "Arin Mallanna Tumbagi — Systems Engineer",
    description:
      "Distributed systems, streaming pipelines, evaluation engines. Saviynt · IIT Madras · Competitive programming.",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Arin Mallanna Tumbagi — Systems Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arin Mallanna Tumbagi — Systems Engineer",
    description:
      "Flat memory. Bounded agents. Every claim checked. Saviynt · IIT Madras.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable} dark`}>
      <body className="min-h-screen bg-void text-paper antialiased selection:bg-green-400/30 selection:text-white">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('arin-theme')==='light')document.documentElement.classList.add('light')}catch(e){}",
          }}
        />
        <TourProvider>
          <div className="bg-grid" aria-hidden />
          <div className="bg-orbs" aria-hidden />
          <div className="bg-scan" aria-hidden />
          <Navbar />
          <main className="relative z-10">{children}</main>
          <Footer />
        </TourProvider>
      </body>
    </html>
  );
}
