import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MyContextProvider } from "../app/context/MyContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ElectroCheck Shoes",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MyContextProvider>
      <html lang="pt-br">
        <body className={inter.className}>{children}</body>
      </html>
    </MyContextProvider>
  );
}
