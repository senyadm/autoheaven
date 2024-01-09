"use client";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../ui/button";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { useTheme } from "next-themes";
import { getLanguageLS, setLanguageLS } from "../../utils/preferences";
import { Language } from "../../interfaces/Language";
import { usePathname, useRouter } from "next/navigation";
import { Locale } from "@/i18n.config";
import { getlocales } from "@/app/actions";
import { ProfileSettingsDictionary } from "@/types";
import { RootState } from "@/app/GlobalRedux/store";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "@/app/GlobalRedux/profile/profileSlice";
import { setProfileNavigationMenuItemName } from "../../app/GlobalRedux/profile/profileNavigationMenuSlice";
const languages: Record<Language, string> = {
  en: "English",
  cz: "Czech",
  de: "German",
  es: "Spanish",
  fr: "French",
  it: "Italian",
  pl: "Polish",
  pt: "Portuguese",
  nl: "Dutch",
  ro: "Romanian",
};
const ProfileSettings = ({ lang }: { lang: Locale }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const router = useRouter();
  const email = useSelector((state: RootState) => state?.user?.email);
  const [dict, setDict] = useState<ProfileSettingsDictionary | null>(null);
  const { toast } = useToast();
  const [language, setLanguage] = React.useState(getLanguageLS());

  useEffect(() => {
    setLanguageLS(lang);
    setLanguage(lang);
  }, [lang]);
  const [isTimerActive, setIsTimerActive] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const { profile } = await getlocales(language);
        setDict(profile);
      } catch (error) {
        console.error("Error fetching tools data:", error);
      }
    }

    if (!dict) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language]);

  const { setTheme, theme } = useTheme();
  const isThemeDark = theme === "dark";
  const toggleTheme = () => {
    setTheme(isThemeDark ? "light" : "dark");
  };
  const [authorized, setAuthorized] = useState<boolean>(true);
  const token = localStorage.getItem("access_token");
  const createNewPathWithLanguage = (lang: Language): string => {
    if (!pathName) return "/";

    const segments = pathName.split("/");
    if (segments.length > 1) {
      segments[1] = lang;
    } else {
      segments.unshift(lang);
    }
    return segments.join("/");
  };

  const handleLanguageChange = (val: Language) => {
    setLanguageLS(val);
    setLanguage(val);
    const newPath = createNewPathWithLanguage(val);
    localStorage.setItem("language", val);
    router.replace(newPath);
  };

  const handleResend = () => {
    sendEmail(email)
      .then((res) => {
        toast({
          description: `The confirmation email has been sent to ${email}`,
        });
        setIsTimerActive(true);
        setTimeout(() => setIsTimerActive(false), 30000);
      })
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: "There was a problem with your request.",
        });
        console.error(err);
      });
  };

  return (
    <div className=" flex flex-col h-full overflow-hidden w-full px-8 py-5">
      <div className="flex items-start mb-10 text-large text-foreground">
        <Label className="text-xl font-bold">Settings</Label>
      </div>

      <div className=" items-start space-y-5  ">
        <Separator />
        <div className="flex  gap-x-[96px]">
          <div className="flex flex-col w-[260px]">
            <Label className="text-foreground font-inter text-lg font-semibold leading-relaxed">
              {dict?.myProfile}
            </Label>
          </div>
          <div className="flex items-center space-x-2 justify-end flex-1">
            <Button
              className="bg-white text-primary-foreground bg-primary hover:bg-gray-300 space-x-2"
              onClick={() => dispatch(setProfileNavigationMenuItemName("edit"))}
            >
              <Trash2 size={16} />
              <Label className="font-semibold leading-relaxed cursor-pointer">
                {dict?.editMyProfile}
              </Label>
            </Button>
          </div>
        </div>

        <Separator />

        <div className="flex items-start  gap-x-[96px] ">
          <div className="flex flex-col w-[260px]">
            <Label className="text-foreground font-inter text-lg font-semibold leading-relaxed">
              {dict?.darkTheme}
            </Label>
          </div>
          <div className="flex items-center space-x-2 justify-end flex-1">
            <Switch onCheckedChange={toggleTheme} checked={isThemeDark} />
          </div>
        </div>

        <Separator />

        <div className="flex items-start  gap-x-[96px] ">
          <div className="flex flex-col w-[260px] ">
            <Label className="text-foreground font-inter text-lg font-semibold leading-relaxed">
              {dict?.language}
            </Label>
          </div>
          <div className="flex items-center space-x-2 justify-end flex-1">
            <Select
              onValueChange={(val: Language) => handleLanguageChange(val)}
            >
              <SelectTrigger className="mb-2">
                {languages[language]}
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
        <Separator />
        <div className="flex items-start gap-x-[96px] ">
          <div className="flex flex-col w-[260px]">
            <Label className="text-foreground font-inter text-lg font-semibold leading-relaxed">
              {dict?.privacy}
            </Label>
            <Label className="text-muted-foreground font-inter text-xs w-[350px]">
              {dict?.privacySubtext}
            </Label>
          </div>
          <div className="flex items-center space-x-2 justify-end flex-1">
            <Switch />
          </div>
        </div>
        {authorized && (
          <>
            <Separator />
            <div className="flex items-start gap-x-[96px] mt-5 mb-4">
              <div className="flex flex-col w-[260px]">
                <Label className="text-foreground font-inter text-lg font-semibold leading-relaxed">
                  {dict?.emailConfirmation}
                </Label>
                <Label className="text-muted-foreground font-inter text-xs w-[350px]">
                  {dict?.emailConfirmationSubtext}
                </Label>
              </div>
              <div className="flex items-center space-x-2 justify-end flex-1">
                <Button
                  disabled={isTimerActive}
                  onClick={() => {
                    handleResend();
                  }}
                  className="bg-white text-primary-foreground bg-primary hover:bg-gray-300 space-x-2"
                >
                  <Send size={16} />{" "}
                  <Label className="font-semibold text-xs">
                    {dict?.resendActivationLink}
                  </Label>
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileSettings;
