import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { StockProvider } from "@/context/StockContext";
import FooterGate from "@/components/FooterGate";
import OrganizationSchema from "@/components/OrganizationSchema";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "Tarialan cup - 2026",
    template: "%s | Tarialan cup - 2026",
  },
  description: "images description, аврах багаж хэрэгсэл, ажлын байрны тохилог орчны бүтээгдэхүүнийг чанартай, найдвартай байдлаар нийлүүлнэ.",
  icons: {
    icon: "/images/main-logo.png",
    shortcut: "/images/main-logo.png",
    apple: "/images/main-logo.png",
  },
  keywords: [
    
    "Tarialan cup - 2026",
  ],
  authors: [{ name: "Tarialan cup - 2026" }],
  creator: "Tarialan cup - 2026",
  publisher: "Tarialan cup - 2026",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://tarialancup.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "mn_MN",
    url: "/",
    siteName: "Tarialan cup - 2026",
    title: "Tarialan cup - 2026",
    description: "Tarialan cup - 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tarialan cup - 2026",
    description: "Tarialan cup - 2026",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <OrganizationSchema />
        <CartProvider>
          <StockProvider>
            {children}
          </StockProvider>
        </CartProvider>
        <FooterGate />
      </body>
    </html>
  );
}
