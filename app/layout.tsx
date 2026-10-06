import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollEffects from "../components/ScrollEffects";
import Header from "../components/Header";
import Footer from "../components/Footer";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zuvex Hub | One Hub, Many Solutions",
  description:
    "Zuvex Hub empowers businesses, researchers, and innovators with integrated solutions in technology, research, design, and digital transformation.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <ScrollEffects />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}