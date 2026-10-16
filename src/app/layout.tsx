import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
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
  title: "Reset Your Mind. Master Your Life. | @ourlife.reset",
  description:
    "The operational blueprint for private discipline, emotional armor, and sovereign execution. Official digital systems by @ourlife.reset.",
  openGraph: {
    title: "The Reset OS & The Sovereign Manual — @ourlife.reset",
    description:
      "The operational blueprint for internal sovereignty, emotional armor, and high-stakes execution.",
    images: ["/og-image.jpg"],
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
      </body>
    </html>
  );
}
