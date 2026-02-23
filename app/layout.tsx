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
      "Authentic Italian pizza catering in Sydney. Perfect for weddings, corporate events, and private parties. Fresh ingredients and Italian tradition.",
    url: "https://www.italianpizzacatering.com.au/",
    siteName: "Italian Pizza Catering",
    locale: "en_AU",
    type: "website",
    
  },
  twitter: {
    card: "summary_large_image",
    title: "Italian Pizza Catering Sydney | Authentic Italian Pizza",
    description:
      "Authentic Italian pizza for events in Sydney. Premium catering with Italian ingredients and slow-rising dough.",
   
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
        <JsonLd />
      </head>
      <body className={inter.className}>
         <IframeGTM/>
          {children}
        <Footer/>
      </body>
    </html>
  );
}
