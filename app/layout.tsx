import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./ThemeProvider/ThemeProvider";
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
      <body className={inter.className}>
        {/* <ThemeProvider> */}
          {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
