"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import { getLanguageLS, setLanguageLS } from "../../shared/utils/preferences";
import { usePathname, useRouter } from "next/navigation";
import { Language } from "../../interfaces/Language";
const languages: Record<Language, string> = {
  en: "English",
  cz: "Čeština",
  de: "Deutsch",
  es: "Español",
  fr: "Français",
  it: "Italiano",
  ru: "Русский",
  pl: "Polski",
  pt: "Português",
  nl: "Nederlands",
  ro: "Română",
};
const LanguageSelect = ({ langStr, currentLang, orientation = "vertical" }) => {
  const router = useRouter();
  const pathname = usePathname();
  const createNewPathWithLanguage = (lang: Language): string => {
    if (!pathname) return "/";

    const segments = pathname.split("/");
    if (segments.length > 1) {
      segments[1] = lang;
    } else {
      segments.unshift(lang);
    }
    return segments.join("/");
  };

  const handleLanguageChange = (val: Language) => {
    if (val) {
      setLanguageLS(val);
      const newPath = createNewPathWithLanguage(val);
      router.replace(newPath);
    }
  };
  return (
    <div
      className={`flex ${orientation === "vertical" ? "flex-col" : "flex-row"}`}
    >
      <div className={`flex  w-[260px] `}>
        <Label className="text-foreground font-inter text-lg font-semibold leading-relaxed">
          {langStr}
        </Label>
      </div>
      <div className="flex items-center space-x-2 justify-end flex-1 max-w-48">
        <Select onValueChange={(val: Language) => handleLanguageChange(val)}>
          <SelectTrigger className="mb-2">
            {languages[currentLang]}
          </SelectTrigger>
          <SelectContent>
            {Object.keys(languages).map((item, index: number) => (
              <SelectItem key={index} value={item}>
                {languages[item as Language]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LanguageSelect;
