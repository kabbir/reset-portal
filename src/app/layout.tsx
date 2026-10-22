import type { Metadata } from "next";
import { Inter, Cinzel, Playfair_Display } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
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
    "A 112-page guided manual to stop overthinking, master emotional composure, and rebuild daily discipline. Read 1 page, write 1 page. By @ourlife.reset.",
  openGraph: {
    title: "Reset your mind. Control your life. — @ourlife.reset",
    description:
      "A 112-page guided manual to stop overthinking, master emotional composure, and rebuild daily discipline.",
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
      className={`${inter.variable} ${cinzel.variable} ${playfair.variable} overflow-x-hidden w-full max-w-full`}
    >
      <body className="bg-[#111d15] text-[#f7f6f2] font-sans antialiased selection:bg-[#34533e] selection:text-white overflow-x-hidden w-full max-w-full">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

