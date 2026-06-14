import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
const body = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const script = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "For My Fav Person - Najwa Aidah",
  description:
    "Sepucuk surat cinta full-stack untuk Najwa Aidah - dibangun dengan 8 bahasa pemrograman dan satu hati.",
};

export const viewport: Viewport = {
  themeColor: "#160a10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" data-theme="dark" className={`${display.variable} ${body.variable} ${script.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
