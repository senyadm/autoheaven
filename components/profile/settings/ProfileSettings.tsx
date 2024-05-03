"use client";
import { Label } from "@radix-ui/react-label";
import { Separator } from "@/components/ui/separator";
import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "../../ui/button";
import { Switch } from "../../ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../../ui/select";
import { useTheme } from "next-themes";
import {
  getLanguageLS,
  setLanguageLS,
} from "../../../shared/utils/preferences";
import { Language } from "../../../interfaces/Language";
import { usePathname, useRouter } from "next/navigation";
import { Locale } from "@/i18n.config";
import { getlocales } from "@/app/actions";
import { ProfileSettingsDictionary } from "@/types";
import { RootState } from "@/app/GlobalRedux/store";
import { useDispatch, useSelector } from "react-redux";
import { sendEmail } from "@/app/GlobalRedux/profile/profileSlice";
import { setProfileNavigationMenuItemName } from "../../../app/GlobalRedux/profile/profileNavigationMenuSlice";
import LanguageSelect from "../../shared/LanguageSelect";

interface SettingsTextBlockProps {
  mainText: string | undefined;
  subtext: string | undefined;
}
const SettingsTextBlock = ({ mainText, subtext }: SettingsTextBlockProps) => {
  return (
    <div className="flex flex-col">
      <Label className="text-foreground text-lg font-semibold leading-relaxed">
        {mainText}
      </Label>
      <Label className="text-muted-foreground text-xs max-w-[350px]">
        {subtext}
      </Label>
    </div>
  );
};
const styleClasses = {
  gap: "gap-x-[8vw]",
};
const ProfileSettings = ({ lang, dict }: { lang: Locale }) => {
  const dispatch = useDispatch();
  const pathName = usePathname();
  const router = useRouter();
  const email = useSelector((state: RootState) => state?.user?.email);
  const { toast } = useToast();
  const [language, setLanguage] = React.useState(getLanguageLS());
  const [isTimerActive, setIsTimerActive] = useState(false);

  const { setTheme, theme } = useTheme();
  const isThemeDark = theme === "dark";
  const toggleTheme = () => {
    setTheme(isThemeDark ? "light" : "dark");
  };
  const [authorized, setAuthorized] = useState<boolean>(true);
  const token = localStorage.getItem("access_token");

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
        <div className={`flex ${styleClasses.gap}`}>
          <div className="flex flex-col w-[260px]">
            <Label className="text-foreground font-inter text-lg font-semibold leading-relaxed">
              {dict?.myProfile}
            </Label>
          </div>
          <div className="flex items-center space-x-2 justify-end flex-1">
            <Button
              className="bg-white text-primary-foreground bg-primary hover:bg-gray-300 space-x-2 p-2"
              onClick={() => dispatch(setProfileNavigationMenuItemName("edit"))}
            >
              <Trash2 size={16} />
              <Label className="md:font-semibold leading-relaxed cursor-pointer">
                {dict?.editMyProfile}
              </Label>
            </Button>
          </div>
        </div>

        <Separator />

        <div className={`flex ${styleClasses.gap}`}>
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

        <LanguageSelect
          langStr={dict?.language}
          currentLang={lang}
          orientation="horizontal"
        />
        <Separator />
        <div className={`flex ${styleClasses.gap}`}>
          <SettingsTextBlock
            mainText={dict?.privacy}
            subtext={dict?.privacySubtext}
          />
          <div className="flex items-center space-x-2 justify-end flex-1">
            <Switch />
          </div>
        </div>
        {authorized && (
          <>
            <Separator />
            <div className="flex items-center gap-x-[8vw] mt-5 mb-4">
              <SettingsTextBlock
                mainText={dict?.emailConfirmation}
                subtext={dict?.emailConfirmationSubtext}
              />
              <div className="flex items-center space-x-2 justify-end flex-1 min-h-full">
                <Button
                  disabled={isTimerActive}
                  onClick={() => {
                    handleResend();
                  }}
                  className="bg-white text-primary-foreground bg-primary hover:bg-gray-300 space-x-2"
                >
                  <Send size={16} />{" "}
                  <Label className="md:font-semibold text-xs">
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
