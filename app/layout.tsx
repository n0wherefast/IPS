import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./componenta/Footer";
import IframeGTM from "./GoogleTagManager/IframeGTM";
import HeadScript from "./GoogleTagManager/HeadScript";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Italian Pizza Catering Sydney | Autentica Pizza Italiana per Eventi",
    template: "%s | Italian Pizza Catering Sydney",
  },
  description:
    "Italian Pizza Catering a Sydney per eventi privati e aziendali. Pizza italiana autentica, impasto a lunga fermentazione e ingredienti italiani premium. Catering per matrimoni, feste e corporate events. Prenota ora!",
  keywords: [
    "Italian pizza catering Sydney",
    "pizza catering Sydney",
    "authentic Italian pizza",
    "pizza catering",
    "event catering Sydney",
    "corporate catering pizza",
    "wedding pizza catering",
  ],
  openGraph: {
    title: "Italian Pizza Catering Sydney – Autentica Pizza Italiana per Eventi",
    description:
      "Catering di pizza italiana autentica a Sydney. Perfetto per matrimoni, eventi aziendali e feste private. Ingredienti freschi e tradizione italiana.",
    url: "https://www.italianpizzacatering.com.au/",
    siteName: "Italian Pizza Catering",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "https://www.italianpizzacatering.com.au/og-pizza.jpg",
        width: 1200,
        height: 630,
        alt: "Italian Pizza Catering Sydney",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Italian Pizza Catering Sydney | Pizza Italiana Autentica",
    description:
      "Pizza italiana autentica per eventi a Sydney. Catering premium con ingredienti italiani e impasto a lunga lievitazione.",
    images: ["https://www.italianpizzacatering.com.au/og-pizza.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://www.italianpizzacatering.com.au",
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
        <HeadScript/>
      </head>
      <body className={inter.className}>
         <IframeGTM/>
          {children}
        <Footer/>
      </body>
    </html>
  );
}
