import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { TourProvider } from "@/components/Tour";
import CommandPalette from "@/components/CommandPalette";

const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });
const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Arin Mallanna Tumbagi — Systems Engineer",
    template: "%s",
  },
  description:
    "Arin Tumbagi builds identity systems at Saviynt: a ~20-hour audit check rebuilt to minutes, bounded S3 uploads with explicit commit semantics, evidence-checked agents. IIT Madras. LeetCode Guardian / Codeforces Expert.",
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
    <html
      lang="en"
      className={`${sans.variable} ${mono.variable} ${display.variable}`}
    >
      <body className="min-h-screen bg-void text-paper antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(localStorage.getItem('arin-theme')==='dark')document.documentElement.classList.add('dark')}catch(e){}",
          }}
        />
        <TourProvider>
          <a href="#main" className="skip-link">
            skip to content
          </a>
          <div className="bg-grid" aria-hidden />
          <div className="bg-orbs" aria-hidden />
          <div className="bg-scan" aria-hidden />
          <Navbar />
          <main id="main" className="relative z-10">
            {children}
          </main>
          <Footer />
          <CommandPalette />
        </TourProvider>
      </body>
    </html>
  );
}
