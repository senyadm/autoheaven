"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Locale } from "@/src/app/i18n.config";
import {
  AT,
  BE,
  BG,
  CH,
  CY,
  CZ,
  DE,
  DK,
  EE,
  ES,
  FI,
  FR,
  GR,
  HR,
  HU,
  IE,
  IS,
  IT,
  LI,
  LT,
  LU,
  LV,
  MT,
  NL,
  NO,
  PL,
  PT,
  RO,
  SE,
  SI,
  SK,
  UA,
} from "country-flag-icons/react/3x2";
import Logo from "@/public/img/logo/AutoHeaven.svg";
import {
  Bell,
  ChevronDown,
  LogInIcon,
  LogOutIcon,
  MegaphoneIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import SvgIcon from "../../SvgIcon";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { RootState, useAppSelector } from "../../../app/GlobalRedux/store";
import {
  getLocationRedirectURL,
} from "../../../src/entities/location";
import LocationSelect from "@/src/entities/location/ui/LocationSelect";
import LoadingSpinner from "../LoadingSpinner";
import Image from "next/image";

const flagComponents: Record<string, any> = {
  AT: AT,
  BE: BE,
  BG: BG,
  CY: CY,
  CZ: CZ,
  DE: DE,
  DK: DK,
  EE: EE,
  ES: ES,
  FI: FI,
  FR: FR,
  GR: GR,
  HR: HR,
  HU: HU,
  IE: IE,
  IT: IT,
  LT: LT,
  LU: LU,
  LV: LV,
  MT: MT,
  NL: NL,
  PL: PL,
  PT: PT,
  RO: RO,
  SE: SE,
  SI: SI,
  SK: SK,
  IS: IS,
  LI: LI,
  NO: NO,
  CH: CH,
  UA: UA,
};

const locationAllButtons = [
  {
    name: "All countries",
    code: "all",
  },
  {
    name: "All cities",
    code: "all",
  },
];

export function Navbar({ params }: { params: { lang: Locale } }) {
  const { lang } = params;
 const dict = useAppSelector((state: RootState) => state.pageData.dict);
 const menu = dict?.navbar; 
   const userLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  const [openPopover, setOpenPopover] = useState(false);

  const location = useAppSelector((state) => state.location);
  const handleLogout = () => {
    setOpenPopover(false);
    localStorage.removeItem("token");
    window.location.reload();
  };

  const pathname = usePathname();

  const backHomeShown = pathname === "/login" || pathname === "/profile";

  const homeLink = useRef(`/${lang}`);
  useEffect(() => {
    homeLink.current = `/${lang}${getLocationRedirectURL(
      location.city,
     location.country
    )}`;
  }, [lang, location.city, location.country]);

  return (
    <NavigationMenu className="flex items-center py-3 bg-background border-b sticky top-0 z-20 h-[64px]">
      <div
        className="container mx-auto px-4 flex items-center justify-between"
        style={{ maxWidth: "1140px" }}
      >
        

          <Link
            href={homeLink.current}
            className="flex items-center bg-background h-full text-secondary-foreground"
            passHref
          >
                         <Logo height={30} width={64} viewBox="0 0 128 60" alt=""/>
          </Link>
        

        <div className="flex items-center space-x-4">
             <Suspense fallback={<LoadingSpinner/>}>

<LocationSelect />
</Suspense>
          {userLoggedIn ? (
            <>
              <Button
                className="flex flex-row justify-between items-center p-2 space-x-2"
                variant="ghost"
              >
                <Bell width={16} height={16} />
              </Button>
              <Popover open={openPopover}>
                <PopoverTrigger asChild>
                  <Button
                    onClick={() => setOpenPopover(!openPopover)}
                    variant="outline"
                    size="icon"
                    className="w-full p-2 items-center space-x-3 border-none shadow-none"
                  >
                    <SvgIcon
                      filepath="/icons/profile.svg"
                      alt="Profile"
                      width={24}
                      height={24}
                    />
                    <ChevronDown width={16} height={16} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full px-1 py-2 space-y- flex flex-col">
                  <Link
                    href={`/${lang}/profile`}
                    onClick={() => setOpenPopover(!openPopover)}
                    className="flex flex-row justify-between items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer"
                  >
                    <Label className="text-foreground text-l cursor-pointer">
                      {menu?.profile || "Profile"}
                    </Label>
                    <SvgIcon
                      className="ml-2 w-4 h-4"
                      filepath="/icons/profile.svg"
                      alt="Profile"
                    />
                  </Link>
                  <Link
                    className="flex flex-row justify-between items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer"
                    href={`/${lang}/sell`}
                    onClick={() => setOpenPopover(!openPopover)}
                  >
                    <Label className="text-foreground text-l cursor-pointer">
                      {menu?.make_ad || "Make Ad"}
                    </Label>
                    <MegaphoneIcon className="ml-2 w-4 h-4" />
                  </Link>
                  <Link
                    onClick={handleLogout}
                    className="flex flex-row justify-between items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer"
                    href={`/${lang}/login`}
                  >
                    <Label className="text-foreground text-l cursor-pointer">
                      {menu?.logout || "Log Out"}
                    </Label>
                    <LogOutIcon width={16} height={16} />
                  </Link>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Link
                href={`/${lang}/login`}
                className={buttonVariants({ size: "icon", variant: "outline" })}
              >
                <LogInIcon className="w-4 h-4" />
                <span className="sr-only">{menu?.login || "Login"}</span>
              </Link>
              {/* <ModeToggle /> */}
            </>
          )}
        </div>
      </div>
    </NavigationMenu>
  );
}
