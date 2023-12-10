import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import SvgIcon from "../SvgIcon";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import PhoneInput from "react-phone-number-input";
import { PenSquare, Eye, Trash2 } from "lucide-react";
import { Checkbox } from "../ui/checkbox";
import { set } from "react-hook-form";
import "react-phone-number-input/style.css";
import flags from "react-phone-number-input/flags";
import { fetchUserData } from "../../app/GlobalRedux/profile/userSlice";
import { useDispatch } from "react-redux";
import { useAppDispatch, useAppSelector } from "../../app/GlobalRedux/store";
import EditButton from "./ProfileEditButton";
import { setPublicProfile } from "../../app/GlobalRedux/profile/profileSlice";
import { Locale } from "@/i18n.config";
import { getlocales } from "@/app/actions";
import { ProfileEdit } from "@/types";

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
  const [phoneNumber, setPhoneNumber] = useState<string>(profileInfo.name);
  const [email, setEmail] = useState<string>(userInfo.email);
  const [dict, setDict] = useState<ProfileEdit | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const { profileEdit } = await getlocales(lang)
        setDict(profileEdit)
      } catch (error) {
        console.error('Error fetching tools data:', error)
      }
    }

    if (!dict) {
      fetchData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  useEffect(() => {
    console.log("fetching user data");
    dispatch(fetchUserData());
  }, []);
  useEffect(() => {
    dispatch(
      setPublicProfile({
        name: userInfo.user_info?.name || "",
        surname: userInfo.user_info?.surname || "",
        phoneNumber: userInfo.user_info?.phone_number || "",
      })
    );
    setName(userInfo.user_info?.name || "");
    setSurname(userInfo.user_info?.surname || "");
    setPhoneNumber(userInfo.user_info?.phone_number || "");
  }, [userInfo]);

  const handleEditPP = () => {
    toggleDisabledPP();
  };
  const handleCancelPP = () => {
    toggleDisabledPP();
    setName(profileInfo.name);
    setSurname(profileInfo.surname);
    setPhoneNumber(profileInfo.phoneNumber);
  };
  const handleSavePP = () => {
    toggleDisabledPP();
    dispatch(setPublicProfile({ name, surname, phoneNumber }));
  };
  return (
    <div className="h-full">
      <Card className="w-full h-full  border-none">
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
          <div className="flex items-start w-[650px] gap-x-[96px] mt-5 mb-4">
            <div className="flex flex-col w-[160px]">
              <Label className="text-foreground font-inter text-lg font-semibold leading-relaxed">
                {dict?.publicProfile}
              </Label>
              <Label className="text-muted-foreground font-inter text-xs font-normal leading-relaxed">
                {dict?.publicProfileSubtext}
              </Label>
            </div>
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
          </div>

          <Separator />

          <div className="flex items-start w-[650px] gap-x-[96px] mt-5 mb-4">
            <div className="flex flex-col w-[160px]">
              <Label className="text-foreground font-inter text-lg font-semibold leading-relaxed">
                {dict?.credentials}
              </Label>
              <Label className="text-muted-foreground font-inter text-xs font-normal leading-3">
                {dict?.credentialsSubtext}
              </Label>
            </div>
            <div className="flex flex-col space-y-4 flex-1">
              <Input
                type="text"
                className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
                placeholder="Email"
              />

              <div className="flex items-center space-x-2">
                <Input
                  type="password"
                  className="border border-muted-foreground bg-background rounded-md focus:border-none focus:ring-0 flex-1"
                  placeholder="Password"
                />
                <Button className="bg-white hover:bg-gray-300 text-secondary-foreground border-r border-gray-300 rounded-r-md flex justify-center items-center w-10 h-10 p-2">
                  <Eye size={16} />
                </Button>{" "}
              </div>

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
          </div>

          <Separator />

          <div className="flex items-start w-[650px] gap-x-[96px] mt-5 mb-4">
            <div className="flex flex-col w-[160px]">
              <Label className="text-foreground font-inter text-lg font-semibold leading-relaxed">
                {dict?.privacy}
              </Label>
            </div>
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
          </div>
          <Separator />
          <div className="flex items-start w-[650px] gap-x-[96px] mt-5 mb-4">
            <div className="flex flex-col w-[260px]">
              <Label className="text-foreground font-inter text-lg font-semibold leading-relaxed">
                {dict?.deleteAccount}
              </Label>
              <Label className="text-muted-foreground font-inter text-xs font-normal leading-relaxed">
                {dict?.deleteAccountSubtext}
              </Label>
            </div>
            <div className="flex items-center space-x-2 justify-end flex-1">
              <Button className="bg-white text-secondary-foreground hover:bg-gray-300 space-x-2 border border-destructive">
                {" "}
                <Label className="font-semibold leading-relaxed">
                  {dict?.deleteAccountButton}
                </Label>
                <Trash2 size={16} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileEdit;
