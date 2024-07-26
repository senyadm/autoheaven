import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../GlobalRedux/provider";
import { Navbar } from "@/components/shared/header/Navbar";
import Footer from "@/components/Footer";
import { Locale, defaultLocale } from "@/src/app/i18n.config";
import { Toaster } from "@/components/ui/sonner";
import { getlocales } from "../actions";
import Head from 'next/head';
import Script from 'next/script';

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale; country: string; city: string };
}) {
  const dict = await getlocales(params.lang);
  // we add supress hydration warning because of themes as it is recommended
  return (
    <html lang={params.lang ?? defaultLocale} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers dict={dict} params={params}>
          <div className="h-screen flex flex-col justify-between">
            <Navbar params={params} />

{children}

            <Footer lang={params.lang ?? defaultLocale} />
          </div>
        </Providers>
        <Toaster />
      </body>
      <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4749046969984937"></Script>
    </html>
  );
}
