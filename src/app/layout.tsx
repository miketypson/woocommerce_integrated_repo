import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageWrapper from "@/components/layout/PageWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fortress Technologies | Privacy-Focused Products & Services",
  description: "Open-source privacy solutions for everyone. Take control of your digital life with trusted, transparent technology.",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/images/fortress-logo.svg" type="image/svg+xml" />
      </head>
      <body className={inter.className}>
        <Navbar />
        <PageWrapper>
          <main>{children}</main>
        </PageWrapper>
        <Footer />
      </body>
    </html>
  );
}
