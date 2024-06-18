import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "../GlobalRedux/provider";
import { ThemeProvider } from "@/components/global/ThemeProvider";
import { Navbar } from "@/components/shared/header/Navbar";
import Footer from "@/components/Footer";
import { Locale, defaultLocale } from "@/src/app/i18n.config";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale; country: string; city: string };
}) {
  return (
    <html lang={params.lang ?? defaultLocale} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div className="h-screen flex flex-col ">
              <Navbar params={params} />

              {children}

              <Toaster />
              <Footer lang={params.lang ?? defaultLocale} />
            </div>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
