import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ourlifereset.com"),
  title: "The Self-Mastery Guide & Workbook | @ourlife.reset",
  description:
    "The 112-page archival publication and daily workbook for emotional control, solitary discipline, and sovereign execution. 47 master chapters and ruled ledgers by @ourlife.reset.",
  openGraph: {
    title: "The Self-Mastery Guide & Workbook — @ourlife.reset",
    description:
      "The 112-page archival blueprint for internal sovereignty, emotional armor, and high-stakes execution.",
    images: ["/book-spread-preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} dark`}
    >
      <body className="bg-[#050507] text-[#f4f4f5] antialiased selection:bg-[#d4af37] selection:text-black">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
