import React from "react";
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
import { menuItemType } from "@/interfaces/profile/ProfileMenuItem";

import {
  Car,
  FolderHeart,
  Mail,
  PenSquare,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "../ui/button";
import ProfileNavigationMenuItem from "./ProfileNavigationMenuItem";
import { Label } from "../ui/label";
import { SideBarItemsDictionary } from "@/types";

export interface itemInfoModel {
  title: string;
  componentName: menuItemType;
  icon: JSX.Element;
}

const navigationMenuGeneralItemsInfo: itemInfoModel[] = [
  {
    title: "Overview",
    componentName: "overview",
    icon: <LayoutDashboard size={16} />,
  },
  {
    title: "Edit my profile",
    componentName: "edit",
    icon: <PenSquare size={16} />,
  },
  {
    title: "Settings",
    componentName: "settings",
    icon: <Settings size={16} />,
  },
];
const navigationMenuVehiclesItemsInfo: itemInfoModel[] = [
  {
    title: "My cars",
    componentName: "cars",
    icon: <Car size={16} />,
  },
  {
    title: "Messages",
    componentName: "messages",
    icon: <Mail size={16} />,
  },
  {
    title: "Liked ads",
    componentName: "ads",
    icon: <FolderHeart size={16} />,
  },
];

interface ProfileNavigationMenuProps {
  dict: SideBarItemsDictionary | null;
}

const ProfileNavigationMenu = ({ dict }: ProfileNavigationMenuProps) => {
  return (
    <NavigationMenu>
      <div className="flex flex-col space-y-4 list-none">
        <div className="flex flex-col mb-4 mt-4">
          <Label className="text-sm font-medium leading-none text-muted-foreground mb-2">
            General
          </Label>
          {navigationMenuGeneralItemsInfo.map((itemInfo) => (
            <ProfileNavigationMenuItem
              title={dict?.[itemInfo.componentName] || itemInfo.title}
              itemInfo={itemInfo}
              key={itemInfo.componentName}
            />
          ))}
        </div>

        <div className="flex flex-col">
          <Label className="text-sm font-medium leading-none text-muted-foreground mb-2">
            Vehicles
          </Label>
          {navigationMenuVehiclesItemsInfo.map((itemInfo) => (
            <ProfileNavigationMenuItem
              title={dict?.[itemInfo.componentName] || itemInfo.title}
              itemInfo={itemInfo}
              key={itemInfo.componentName}
            />
          ))}
        </div>
      </div>
    </NavigationMenu>
  );
};

export default ProfileNavigationMenu;
