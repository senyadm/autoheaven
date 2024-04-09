"use client";
import React, { Suspense, useEffect, useState } from "react";
import ProfileNavigationMenu from "@/components/profile/ProfileNavigationMenu";
import { Separator } from "@/components/ui/separator";
import SvgIcon from "@/components/SvgIcon";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../GlobalRedux/store";
import { Locale } from "@/i18n.config";
import { SideBarItemsDictionary } from "@/types";
import { getlocales } from "@/app/actions";
import Loading from "./loading";
import { fetchUserData } from "../../GlobalRedux/profile/userSlice";

const Layout = ({
  params: { lang },
  children,
}: {
  params: { lang: Locale };
}) => {
  const [fullName, setFullName] = useState<string>("");

  const dispatch = useAppDispatch();
  const userName = useSelector(
    (state: RootState) => state?.user?.user_info?.name
  );

  if (!userName) {
    dispatch(fetchUserData());
  }
  const userSurname = useSelector(
    (state: RootState) => state?.user
  );

  useEffect(() => {
    console.log("userSurname", userSurname);

    setFullName(`${userName} ${userSurname}`);
  }, [userName, userSurname]);

  const userEmail = useSelector((state: RootState) => state?.user?.email);

  const [dict, setDict] = useState<SideBarItemsDictionary | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { sidebarItems } = await getlocales(lang);
        setDict(sidebarItems);
      } catch (error) {
        console.error("Error fetching tools data:", error);
      }
    }

    if (!dict) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  return (
    <main className="flex justify-center items-start flex-grow py-4 bg-topography-light">
      <div className="flex space-x-4 max-w-screen-xl w-full">
        <section className="border rounded-lg h-full p-3 w-[230px] h-[530px] flex flex-col items-start gap-2.5 flex-shrink-0 bg-background">
          <div className="flex items-center mb-4">
            <Suspense fallback={<Loading />}>
              <div className="mr-4 flex-shrink-0">
                <SvgIcon
                  filepath="/icons/profile.svg"
                  alt="Logo"
                  width={48}
                  height={48}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold ">{fullName}</span>
                <span className="text-foreground text-sm text-muted-foreground">
                  {userEmail}
                </span>
              </div>
            </Suspense>
          </div>
          <Separator />
          <div className="mt-4">
            <ProfileNavigationMenu dict={dict} />
          </div>
        </section>
        <section className="border rounded-lg w-full h-[calc(100vh-100px)] overflow-y-auto flex-grow bg-background">
          {children}
        </section>
      </div>
    </main>
  );
};

export default Layout;
