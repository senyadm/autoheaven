import React, { useEffect } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

import { Button } from "../ui/button";
import { setProfileNavigationMenuItemName } from "@/app/GlobalRedux/profile/profileNavigationMenuSlice";
import { useDispatch, useSelector } from "react-redux";
import SvgIcon from "../SvgIcon";
import { itemInfoModel } from "./ProfileNavigationMenu";
import { Label } from "../ui/label";
import { useAppStore } from "@/app/GlobalRedux/useStore";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface ProfileNavigationMenuItemProps {
  title: string;
  itemInfo: itemInfoModel;
}

const ProfileNavigationMenuItem = ({
  title,
  itemInfo,
}: ProfileNavigationMenuItemProps) => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const pathArr = pathname?.split("/");
  const currentLocale = pathArr ? pathArr[1] : "en";
  console.log(itemInfo.componentName);
  return (
    <NavigationMenuItem
      className="w-full mb-4 flex flex-row bg-background"
      key={itemInfo.componentName}
    >
      <Link
        className={`w-full text-foreground cursor-pointer shadow-none flex justify-start p-3 rounded-lg 
        hover:bg-primary hover:text-primary-foreground
        ${
          pathname?.includes(itemInfo.componentName)
            ? "bg-primary text-primary-foreground"
            : "bg-background "
        }`}
        href={
          itemInfo.componentName === "overview"
            ? `/${pathArr[1]}/profile`
            : `/${pathArr[1]}/profile/${itemInfo.componentName}`
        }
      >
        {itemInfo.icon}
        <Label className="ml-3 cursor-pointer">{title}</Label>
      </Link>
    </NavigationMenuItem>
  );
};

export default ProfileNavigationMenuItem;
