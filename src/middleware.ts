import { NextRequest, NextResponse } from "next/server";
import Negotiator from "negotiator";
import { i18n } from "./app/i18n.config";
import { match } from "@formatjs/intl-localematcher";
import {
  getLocationRedirectURL,
  isValidCity,
  isValidCountry,
} from "./entities/location";

const defaultLocale = i18n.defaultLocale;
const locales: string[] = [...i18n.locales];

const getLocale = (request: NextRequest): string => {
  const headers = new Headers(request.headers);
  const acceptLanguage = headers.get("accept-language");

  if (acceptLanguage) {
    headers.set("accept-language", acceptLanguage.replaceAll("_", "-"));
  }

  const headersObject = Object.fromEntries(headers.entries());
  const languages = new Negotiator({ headers: headersObject }).languages();

  if (languages.includes("*")) {
    return defaultLocale;
  }

  return match(languages, locales, defaultLocale);
};

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const pathname = request.nextUrl.pathname;
  const [_, locale, country, city, ...rest] = pathname.split("/");
  if (pathname.startsWith("/api") || pathname.includes("/icons/")) {
    return NextResponse.next();
  }

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );
  const url = new URL(request.url);
  console.log("🚀 ~ middleware ~ url:", url);
  // Redirect if there is no locale
  if (
    pathnameIsMissingLocale ||
    !isValidCountry(country) ||
    !isValidCity(city, country)
  ) {
    const locale = getLocale(request);
    const locationURL = getLocationRedirectURL(city, country);
    // Preserving the original query parameters
    const searchParams = url.searchParams.toString();
    const restURL = rest.join("/");
    return NextResponse.redirect(
      new URL(
        `/${locale}${
          pathname.startsWith("/") ? "" : "/"
        }${locationURL}/${restURL}${searchParams ? "?" + searchParams : ""}`,
        request.url
      )
    );
  }

  if (request.nextUrl.pathname.startsWith("/api")) {
    response.headers.append("Access-Control-Allow-Origin", "*");
    response.headers.append(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    response.headers.append(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
  }
  //...
  return response;
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
