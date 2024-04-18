import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getGlobalData, getGlobalPageMetadata } from "@/data/loaders";
import { Header } from "@/components/ui/custom/Header";
import { Footer } from "@/components/ui/custom/Footer";

const inter = Inter({ subsets: ["latin"] });

  export async function generateMetadata(): Promise<Metadata> {
    const metadata = await getGlobalPageMetadata();    
    return {
      title: metadata?.title,
      description: metadata?.description,     
      
    };
  
  }

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globaldata = await getGlobalData();
    return (
    <html lang="en">
      <body className={inter.className}>
        <Header data={globaldata.header} />
        <div>{children}</div></body>
        <Footer data={globaldata.footer} />
    </html>
  );
}
