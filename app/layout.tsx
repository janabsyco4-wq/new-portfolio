import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import ScrollToTop from "@/components/ScrollToTop";
import AdminPanelTrigger from "@/components/AdminPanelTrigger";

export const metadata: Metadata = {
  title: "Nasrullah - Mechanical Engineer | Portfolio",
  description: "Nasrullah - Mechanical Engineer specializing in CAD design, FEA simulation, and innovative engineering solutions",
  keywords: ['Mechanical Engineer', 'CAD Design', 'SolidWorks', 'ANSYS', 'FEA', 'Engineering Portfolio', 'Nasrullah', 'COMSATS'],
  authors: [{ name: 'Nasrullah' }],
  creator: 'Nasrullah',
  openGraph: {
    title: 'Nasrullah - Mechanical Engineer Portfolio',
    description: 'Professional mechanical engineering portfolio showcasing CAD design, FEA simulation, and innovative solutions',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>
        <Navbar />
        {children}
        <ScrollToTop />
        <AdminPanelTrigger />
      </body>
    </html>
  );
}
