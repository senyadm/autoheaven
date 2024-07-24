import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../GlobalRedux/provider";
import { Navbar } from "@/components/shared/header/Navbar";
import Footer from "@/components/Footer";
import { Locale, defaultLocale } from "@/src/app/i18n.config";
import { Toaster } from "@/components/ui/sonner";
import { getlocales } from "../actions";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale; country: string; city: string };
}) {
  const dict = await getlocales(params.lang);
  return (
    <html lang={params.lang ?? defaultLocale} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers dict={dict} params={params}>
          <div className="h-screen flex flex-col justify-between">
            <div className='h-full'>
            <Navbar params={params} />

{children}
            </div>

            <Footer lang={params.lang ?? defaultLocale} />
          </div>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
