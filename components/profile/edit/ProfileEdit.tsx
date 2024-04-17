import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import SvgIcon from "../../SvgIcon";
import { Separator } from "../../ui/separator";
import { Label } from "../../ui/label";
import { Button } from "../../ui/button";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-number-input";
import { Trash2 } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import "react-phone-number-input/style.css";
import { useAppDispatch, useAppSelector } from "../../../app/GlobalRedux/store";
import EditButton from "./ProfileEditButton";
import {
  setCredentials,
  setPublicProfile,
} from "../../../app/GlobalRedux/profile/profileSlice";
import { Locale } from "@/i18n.config";
import { getlocales } from "@/app/actions";
import { ProfileEdit } from "@/types";
import "./ProfileEdit.css";

interface LeftTextBlockProps {
  title: string | undefined;
  subtext?: string | undefined;
}
const LeftTextBlock = ({ title, subtext }: LeftTextBlockProps) => {
  return (
    <div className="flex flex-col max-w-[160px]">
      <Label className="text-foreground font-inter text-lg font-semibold leading-relaxed">
        {title}
      </Label>
      {subtext && (
        <Label className="text-muted-foreground font-inter text-xs font-normal leading-relaxed">
          {subtext}
        </Label>
      )}
    </div>
  );
};

const ProfileEditBlock = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-start flex-col md:flex-row w-full max-w-[650px] min-w-[300px] gap-x-[8vw] mt-5 mb-4">
      {children}
    </div>
  );
};

const ProfileEdit = ({ lang }: { lang: Locale }) => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.user);
  const profileInfo = useAppSelector((state) => state.profile);

  const [isDisabledPP, setIsDisabledPP] = useState(true);
  const [isDisabledCred, setIsDisabledCred] = useState(true);
  const toggleDisabledPP = () => {
    setIsDisabledPP(!isDisabledPP);
  };
  const toggleDisabledCred = () => {
    setIsDisabledCred(!isDisabledCred);
  };
  const [name, setName] = useState(profileInfo.name);
  const [surname, setSurname] = useState(profileInfo.surname);
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>(
    profileInfo.name
  );
  const [email, setEmail] = useState(profileInfo.email);
  const [dict, setDict] = useState<ProfileEdit | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { profileEdit } = await getlocales(lang);
        setDict(profileEdit);
      } catch (error) {
        console.error("Error fetching tools data:", error);
      }
    }

    if (!dict) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    dispatch(
      setPublicProfile({
        name: userInfo.user_info?.name || "",
        surname: userInfo.user_info?.surname || "",
        phoneNumber: userInfo.user_info?.phone_number || "",
      })
    );
    dispatch(
      setCredentials({
        email: userInfo.email || "",
        password: "",
      })
    );

    setName(userInfo.user_info?.name || "");
    setSurname(userInfo.user_info?.surname || "");
    setPhoneNumber(userInfo.user_info?.phone_number || "");
    setEmail(userInfo.email || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);

  const handleEditPP = () => {
    toggleDisabledPP();
  };
  const handleEditCred = () => {
    toggleDisabledCred();
  };
  const handleCancelCred = () => {
    toggleDisabledCred();
    setEmail(profileInfo.email);
  };
  const handleCancelPP = () => {
    toggleDisabledPP();
    setName(profileInfo.name);
    setSurname(profileInfo.surname);
    setPhoneNumber(profileInfo.phoneNumber);
  };
  const handleSaveCred = () => {
    if (!email) return;
    toggleDisabledCred();
    dispatch(setCredentials({ email, password: "" }));
  };
  const handleSavePP = () => {
    if (!phoneNumber) return;
    toggleDisabledPP();
    dispatch(setPublicProfile({ name, surname, phoneNumber }));
  };
  return (
    <div className="h-full">
      <Card className="w-full  border-none bg-primary-foreground">
        <CardHeader className="relative">
          <div className="bg-secondary h-[100px]"></div>

          <div className="flex items-center px-16 space-x-4 absolute top-1/2 transform translate-y-1/4">
            <div className="mr-4 flex-shrink-0">
              <SvgIcon
                filepath="/icons/profile.svg"
                alt="Logo"
                width={96}
                height={96}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold">
                {userInfo.user_info?.name} {userInfo.user_info?.surname}
              </span>
              <span className="text-foreground text-sm text-muted-foreground">
                {userInfo.email}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-20 flex items-center px-16 space-x-4 flex-col text-large text-foreground">
          <Separator />
          <ProfileEditBlock>
            <LeftTextBlock
              title={dict?.publicProfile}
              subtext={dict?.publicProfileSubtext}
            />
            <div className="flex flex-col space-y-4 flex-1">
              <div className="flex flex-row space-x-2">
                <Input
                  className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  disabled={isDisabledPP}
                />
                <Input
                  className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
                  value={surname}
                  onChange={(e) => {
                    setSurname(e.target.value);
                  }}
                  disabled={isDisabledPP}
                />
              </div>
              <PhoneInput
                international
                defaultCountry="US"
                value={phoneNumber}
                onChange={setPhoneNumber}
                style={{ paddingLeft: "5px" }}
                disabled={isDisabledPP}
              />
              <EditButton
                saveText={dict?.save || "Save"}
                cancelText={dict?.cancel || "Cancel"}
                editText={dict?.edit || "Edit"}
                onSave={handleSavePP}
                onEdit={handleEditPP}
                onCancel={handleCancelPP}
                disabledState={isDisabledPP}
              />
            </div>
          </ProfileEditBlock>

          <Separator />

          <ProfileEditBlock>
            <LeftTextBlock
              title={dict?.credentials}
              subtext={dict?.credentialsSubtext}
            />
            <div className="flex flex-col space-y-4 flex-1">
              <Input
                type="text"
                className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
                placeholder="Email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                disabled={isDisabledCred}
              />

              <div className="flex items-center space-x-2">
                <Input
                  type="password"
                  className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
                  placeholder="Password"
                  disabled={isDisabledCred}
                />
              </div>

              <EditButton
                saveText={dict?.save || "Save"}
                cancelText={dict?.cancel || "Cancel"}
                editText={dict?.edit || "Edit"}
                onSave={handleSaveCred}
                onEdit={handleEditCred}
                onCancel={handleCancelCred}
                disabledState={isDisabledCred}
              />
            </div>
          </ProfileEditBlock>

          <Separator />

          <ProfileEditBlock>
            <LeftTextBlock title={dict?.privacy} />
            <div className="">
              <div className="flex items-center space-x-4 justify-end flex-1">
                <Checkbox className="rounded-full " />
                <Label className="text-foreground font-inter font-semibold leading-relaxed">
                  {dict?.agreeMarketResearch}
                </Label>
              </div>
              <Label>
                <a
                  href="/documents/privacy_policy.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground leading-relaxed"
                >
                  {dict?.privacyPolicy}
                </a>
              </Label>
            </div>
          </ProfileEditBlock>
          <Separator />
          <ProfileEditBlock>
            <LeftTextBlock
              title={dict?.deleteAccount}
              subtext={dict?.deleteAccountSubtext}
            />
            <div className="flex items-center space-x-2 justify-end flex-1">
              <Button className="bg-primary-foreground text-secondary-foreground hover:bg-destructive space-x-2 border border-destructive ">
                <Label className="font-semibold leading-relaxed cursor-pointer">
                  {dict?.deleteAccountButton}
                </Label>
                <Trash2 size={16} />
              </Button>
            </div>
          </ProfileEditBlock>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileEdit;
