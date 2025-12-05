import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prixily - Best Deals on Electronics, Appliances & Gadgets",
  description: "Discover the best deals on electronics, home appliances, and tech gadgets. Prixily helps you find the most competitive prices online worldwide.",
  keywords: "electronics, appliances, gadgets, deals, discounts, technology, smartphones, TV, computers, best prices",
  authors: [{ name: "Prixily" }],
  openGraph: {
    title: "Prixily - Best Deals on Electronics & Gadgets",
    description: "Discover the best deals on electronics, home appliances, and tech gadgets worldwide.",
    url: "https://prixily.com",
    siteName: "Prixily",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
