import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./componenta/Footer";
import IframeGTM from "./GoogleTagManager/IframeGTM";
import HeadScript from "./GoogleTagManager/HeadScript";
// import { GoogleTagManager } from "@next/third-parties/google";
import JsonLd from "./componenta/JsonLd";
// import Script from "next/script";


const inter = Inter({ subsets: ["latin"] });
export const viewport = {
    width: "device-width",
    initialScale: 1,
  }



export const metadata: Metadata = {
  title: {
    default: "Italian Pizza Catering Sydney |Pizza Italiana per Eventi",
    template: "%s | Italian Pizza Catering Sydney",
  },
  description:
    "Italian Pizza Catering in Sydney for private and corporate events. Authentic Wood Fired  Italian Pizza, crafted in Sydney. Catering for weddings, parties and corporate events. Book now!",
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
    title: "Italian Pizza Catering Sydney – Authentic Italian Pizza for Events",
    description:
      "Catering di pizza italiana autentica a Sydney. Perfetto per matrimoni, eventi aziendali e feste private. Ingredienti freschi e tradizione italiana.",
    url: "https://www.italianpizzacatering.com.au/",
    siteName: "Italian Pizza Catering",
    locale: "en_AU",
    type: "website",
    
  },
  twitter: {
    card: "summary_large_image",
    title: "Italian Pizza Catering Sydney | Pizza Italiana Autentica",
    description:
      "Pizza italiana autentica per eventi a Sydney. Catering premium con ingredienti italiani e impasto a lunga lievitazione.",
   
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
  // const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  return (
    <html lang="en">
      <head>
        <HeadScript/>
        {/* {gtmId && <GoogleTagManager gtmId={gtmId} />} */}
      </head>
      <body className={inter.className}>
         <IframeGTM/>
         <JsonLd />
          {children}
        <Footer/>
      </body>
    </html>
  );
}
