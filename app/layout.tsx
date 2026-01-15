import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./componenta/Footer";
import IframeGTM from "./GoogleTagManager/IframeGTM";
import HeadScript from "./GoogleTagManager/HeadScript";
export const dynamic = 'force-dynamic'

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Italian Pizza Catering",
  description: "Scopri l'autentica pizza Italiana a Sydney! Offriamo catering per eventi privati e aziendali con ingredienti freschi e un impasto a lunga fermentazione. Prenota ora e gusta la vera pizza italiana!",
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
