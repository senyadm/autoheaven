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

interface ProfileNavigationMenuItemProps {
  title: string;
  itemInfo: itemInfoModel;
}

const ProfileNavigationMenuItem = ({
  title,
  itemInfo,
}: ProfileNavigationMenuItemProps) => {
  const dispatch = useDispatch();
  const profileNavigationMenuState = useAppStore(
    (state) => state.profileNavigationMenu
  );
  // useEffect(() => {
  //   console.log(profileNavigationMenuState);
  // }, [profileNavigationMenuState]);
  return (
    <NavigationMenuItem
      className="w-full mb-4 flex flex-row"
      onClick={() =>
        dispatch(setProfileNavigationMenuItemName(itemInfo.componentName))
      }
      key={itemInfo.componentName}
    >
      <Button
        className={`w-full text-foreground cursor-pointer hover:bg-gray-300 shadow-none flex justify-start ${
          itemInfo.componentName === profileNavigationMenuState[0]?.menuItemName
            ? "bg-primary text-primary-foreground"
            : "bg-white"
        }`}
      >
        {itemInfo.icon}
        <Label className="ml-3 cursor-pointer">{title}</Label>
      </Button>
    </NavigationMenuItem>
  );
};

export default ProfileNavigationMenuItem;
