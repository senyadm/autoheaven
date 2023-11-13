"use client";
import React, { useEffect, useState } from "react";

import { Navbar } from "@/components/shared/header/Navbar";

import ProfileContent from "@/components/profile/ProfileContent";
import ProfileNavigationMenu from "@/components/profile/ProfileNavigationMenu";
import { Separator } from "@/components/ui/separator";
import SvgIcon from "@/components/SvgIcon";
import { usePathname, useRouter } from "next/navigation";
import { getToken, validateToken } from "@/utils/auth";
import useLoginRedirect from "@/hooks/useLoginRedirect";

const currentPageURL = "/profile/";
const Profile = () => {
  const redirectToLogin = useLoginRedirect();
  const router = useRouter();
  const pathname = usePathname();
  const accessToken = getToken();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const checkAuthentication = async () => {
      if (accessToken) {
        const isValid = await validateToken();
        if (!isValid) {
          redirectToLogin();
        }
        setIsAuthenticated(isValid);
      } else {
        redirectToLogin();
        setIsAuthenticated(false);
      }
    };
    checkAuthentication();
  }, [accessToken, pathname, redirectToLogin, router]);
  if (!isAuthenticated) {
    return <></>;
  }
  return (
    <main className="flex justify-center items-start flex-grow py-4 bg-topography-light">
      <div className="flex space-x-4 max-w-screen-xl">
        <section className="border rounded-lg h-full p-3 w-[230px] h-[530px] flex flex-col items-start gap-2.5 flex-shrink-0 bg-background">
          <div className="flex items-center mb-4">
            <div className="mr-4 flex-shrink-0">
              <SvgIcon
                filepath="/icons/profile.svg"
                alt="Logo"
                width={48}
                height={48}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold ">John Doe</span>
              <span className="text-foreground text-sm text-muted-foreground">
                johndoe@gmail.com
              </span>
            </div>
          </div>
          <Separator />
          <div className="mt-4">
            <ProfileNavigationMenu />
          </div>
        </section>
        <section className="border rounded-lg min-w-[778px] h-[calc(100vh-100px)] overflow-y-auto flex-grow bg-background">
          <ProfileContent />
        </section>
      </div>
    </main>
  );
};

export default Profile;
