"use server";

import { Locale, i18n } from "@/src/app/i18n.config";
import { PageData } from "@/types";

const dictionaries: { [key in Locale]: Promise<PageData> } = {
  en: import("@/locales/en.json").then((module) => module.default as PageData),
  fr: import("@/locales/fr.json").then((module) => module.default as PageData),
  de: import("@/locales/de.json").then((module) => module.default as PageData),
  es: import("@/locales/es.json").then((module) => module.default as PageData),
  it: import("@/locales/it.json").then((module) => module.default as PageData),
  nl: import("@/locales/nl.json").then((module) => module.default as PageData),
  pl: import("@/locales/pl.json").then((module) => module.default as PageData),
  pt: import("@/locales/pt.json").then((module) => module.default as PageData),
  cz: import("@/locales/cz.json").then((module) => module.default as PageData),
  ro: import("@/locales/ro.json").then((module) => module.default as PageData),
  ru: import("@/locales/ru.json").then((module) => module.default as PageData),
};

export const getlocales = async (locale: Locale): Promise<PageData> => {
  try {
    const dictionary = await dictionaries[locale];
    if (!dictionary) {
      console.warn(
        `Dictionary not found for locale '${locale}', falling back to default locale '${i18n.defaultLocale}'`
      );
      return await dictionaries[i18n.defaultLocale];
    }
    return dictionary;
  } catch (error) {
    console.error(`Error loading dictionary for locale '${locale}': ${error}`);
    return await dictionaries[i18n.defaultLocale];
  }
};
