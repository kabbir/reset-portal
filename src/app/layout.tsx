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
  title: "Reset your mind. Control your life. | @ourlife.reset",
  description:
    "A 112-page guided manual to confront your blind spots, kill reactivity, and rebuild daily discipline. 10 minutes a day on your phone or in your notebook. By @ourlife.reset.",
  openGraph: {
    title: "Reset your mind. Control your life. — @ourlife.reset",
    description:
      "A 112-page guided manual to confront your blind spots, kill reactivity, and rebuild daily discipline. 10 minutes a day on your phone or in your notebook.",
    images: ["/hero-mockup-luxury.jpg"],
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
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} dark overflow-x-hidden w-full max-w-full`}
    >
      <body className="bg-[#050507] text-[#f4f4f5] antialiased selection:bg-[#d4af37] selection:text-black overflow-x-hidden w-full max-w-full">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
