"use client";
import React, { useEffect, useState } from "react";
import ProfileNavigationMenu from "@/components/profile/ProfileNavigationMenu";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "../../GlobalRedux/store";
import { Locale } from "@/i18n.config";
import { SideBarItemsDictionary } from "@/types";
import { getlocales } from "@/app/actions";
import { Tabs, TabsList } from "@/components/ui/tabs";
import { TabsTrigger } from "@radix-ui/react-tabs";
import { menuItemType } from "@/interfaces/profile/ProfileMenuItem";

import {
  Car,
  FolderHeart,
  Mail,
  PenSquare,
  Settings,
  LayoutDashboard,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import MenuHeader from "../../../components/profile/MenuHeader";

export interface itemInfoModel {
  title: string;
  componentName: menuItemType;
  icon: JSX.Element;
}

const navigationMenuGeneralItemsInfo: itemInfoModel[] = [
  {
    title: "Overview",
    componentName: "overview",
    icon: <LayoutDashboard size={24} />,
  },
  {
    title: "Edit my profile",
    componentName: "edit",
    icon: <PenSquare size={24} />,
  },
  {
    title: "Settings",
    componentName: "settings",
    icon: <Settings size={24} />,
  },
];
const navigationMenuVehiclesItemsInfo: itemInfoModel[] = [
  {
    title: "My cars",
    componentName: "cars",
    icon: <Car size={24} />,
  },
  {
    title: "Messages",
    componentName: "messages",
    icon: <Mail size={24} />,
  },
  {
    title: "Liked ads",
    componentName: "ads",
    icon: <FolderHeart size={24} />,
  },
];

const ProfileLayout = ({
  params: { lang },
  children,
}: {
  params: { lang: Locale };
}) => {
  const dictionary = useAppSelector((state) => state.pageData.dict);
  const dict = dictionary?.sidebarItems;

  const pathname = usePathname();
  const router = useRouter();
  const pathArr = pathname?.split("/") || [];

  return (
    <main className="flex justify-center h-full items-start flex-grow bg-topography-light">
      <div className="flex md:space-x-4 flex-col md:w-[1280px] md:flex-row h-full p-2">
        <section className="border md:flex hidden rounded-lg h-full p-3 w-[230px] h-full md:h-[570px] flex flex-col items-start gap-2.5 flex-shrink-0 bg-background">
          <MenuHeader />
          <Separator />
          <div className="mt-4">
            <ProfileNavigationMenu dict={dict} />
          </div>
        </section>
        <div className="flex md:hidden w-full justify-center mb-1 pb-2">
          <Tabs defaultValue="cars">
            <TabsList className="w-full gap-6 justify-center items-center">
              {navigationMenuGeneralItemsInfo.map((itemInfo) => (
                <TabsTrigger
                  className="flex-grow w-[35px]"
                  onClick={() =>
                    router.push(
                      itemInfo.componentName === "overview"
                        ? `/${pathArr[1]}/profile`
                        : `/${pathArr[1]}/profile/${itemInfo.componentName}`
                    )
                  }
                  value={itemInfo.componentName}
                  key={itemInfo.componentName}
                >
                  {itemInfo.icon}
                </TabsTrigger>
              ))}

              {navigationMenuVehiclesItemsInfo.map((itemInfo) => (
                <TabsTrigger
                  className="flex-grow w-[40px]"
                  onClick={() =>
                    router.push(
                      itemInfo.componentName === "overview"
                        ? `/${pathArr[1]}/profile`
                        : `/${pathArr[1]}/profile/${itemInfo.componentName}`
                    )
                  }
                  value={itemInfo.componentName}
                  key={itemInfo.componentName}
                >
                  {itemInfo.icon}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <section className="border rounded-lg h-full overflow-y-auto flex-grow bg-background p-2">
          {children}
        </section>
      </div>
    </main>
  );
};

export default ProfileLayout;
