// export const setDarkMode = (darkMode: boolean) => {
//   localStorage.setItem("darkMode", JSON.stringify(darkMode));
// };
// export const getDarkMode = () => {
//   const darkMode = localStorage.getItem("darkMode");
//   if (darkMode) {
//     return JSON.parse(darkMode);
//   }
//   return false;
// };
// export const toggleDarkMode = () => {
//   const darkMode = getDarkMode();
//   setDarkMode(!darkMode);

import { Language } from "../../interfaces/Language";

// };
export const setLanguageLS = (language: Language) => {
  localStorage.setItem("language", language);
};
export const getLanguageLS = (): Language => {
  const language = localStorage.getItem("language");
  if (language) {
    return language as any as Language;
  }
  return "en";
};
