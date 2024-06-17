"use client";

import { getlocales } from "@/app/actions";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InputField } from "@/components/ui/input-field";
import { Label } from "@/components/ui/label";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Locale } from "@/src/app/i18n.config";
import { NavbarData } from "@/types";
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
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  LogInIcon,
  LogOutIcon,
  MapPin,
  MegaphoneIcon,
  SearchIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "@/public/img/logo/AutoHeaven.svg";
import SvgIcon from "../../SvgIcon";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import {
  euCountries,
  euCountriesCities,
} from "@/src/entities/location/model/countries-cities";
import { useAppSelector } from "../../../app/GlobalRedux/store";
import { validateToken } from "@/src/shared/utils/auth";
import { useDispatch } from "react-redux";
import { logOut } from "@/src/entities/user/api/userSlice";
import { set } from "zod";
import { getNewLocationURL } from "../../../src/entities/location";

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

export function Navbar({ lang }: { lang: Locale }) {
  const { replace } = useRouter();
  const [menu, setMenu] = useState<NavbarData | null>(null);
  const userLoggedIn = useAppSelector((state) => state.user.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    const validate = async () => {
      const doesExist = await validateToken();

      if (!doesExist) {
        dispatch(logOut());
      }
    };

    validate();
  }, [dispatch]);

  useEffect(() => {
    localStorage.removeItem;

    async function fetchData() {
      try {
        const { navbar } = await getlocales(lang);
        setMenu(navbar);
      } catch (error) {
        console.error("Error fetching tools data:", error);
      }
    }

    if (!menu) {
      fetchData();
    }
  }, [lang, menu]);

  const [modalState, setModalState] = useState("country");
  const [cityList, setCityList] = useState<string[]>([]);
  const handleCountrySelect = (countryName: string) => {
    setSelectedCountry(countryName);
    setCityList(euCountriesCities[countryName]);
    setModalState("city");
  };
  const handleCitySelect = (cityName: string) => {
    const country = euCountries.find((c) => c.code === selectedCountry);
    if (!country) return;
    setLocationAndRedirect(country.name, cityName);

    setModalState("none");
    toggleRegionModal();
  };

  const [openPopover, setOpenPopover] = useState(false);
  const [regionModalOpen, setRegionModalOpen] = useState(false),
    toggleRegionModal = () => setRegionModalOpen(!regionModalOpen);
  const [location, setLocation] = useState({ country: "", city: "" });

  const [selectedCountry, setSelectedCountry] = useState("");

  const fetchLocation = async (attempt = 1) => {
    try {
      const ipResponse = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipResponse.json();
      const ip = ipData.ip;

      const locationResponse = await fetch(`http://ip-api.com/json/${ip}`);
      const locationData = await locationResponse.json();
      setLocationAndRedirect(locationData.country, locationData.city);
    } catch (error) {
      console.error(`Attempt ${attempt}: Failed to fetch location`, error);
      if (attempt < 10) {
        setTimeout(() => fetchLocation(attempt + 1), 2000);
      } else {
        throw new Error("Failed to obtain location after 10 attempts");
      }
    }
  };

  useEffect(() => {
    fetchLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    setOpenPopover(false);
    localStorage.removeItem("token");
    window.location.reload();
  };

  const pathname = usePathname();
  const searchParams = useSearchParams();
  function setLocationAndRedirect(country: string, city: string) {
    const url = getNewLocationURL(
      pathname,
      searchParams?.toString(),
      city,
      country
    );
    console.log("🚀 ~ setLocationAndRedirect ~ url:", url);
    setLocation({ country, city });
    replace(url);
    // setLocation({ country, city });
    // const url = [lang, country, city].join("/");
    // router.push(`/${lang}/countr`);
  }
  const backHomeShown = pathname === "/login" || pathname === "/profile";
  const handleClose = () => {
    setRegionModalOpen(!regionModalOpen);
  };

  return (
    <NavigationMenu className="flex items-center py-3 bg-background border-b sticky top-0 z-20 h-[64px]">
      <div
        className="container mx-auto px-4 flex items-center justify-between"
        style={{ maxWidth: "1140px" }}
      >
        {backHomeShown ? (
          <Link
            href={`/${lang}`}
            className="px-4 flex items-center bg-background text-secondary-foreground space-x-2 h-10 border rounded-lg"
            passHref
          >
            <ChevronLeft width={20} height={20} />
            <Label className="text-bold text-lg cursor-pointer">
              {menu?.home}
            </Label>
          </Link>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href={`/${lang}`}>
              <Logo height="30px" width="64px" viewBox="0 0 131 50" />
            </Link>

            <div className="flex items-center border rounded-md pl-2 h-10">
              <SearchIcon className="w-5 h-5 text-gray-500" />
              <InputField
                className="bg-transparent border-none outline-none text-black ml-2 flex-grow rounded-r-md text-muted-foreground w-[150px] w-full"
                placeholder={menu?.search}
              />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4">
          <Dialog open={regionModalOpen} onOpenChange={handleClose}>
            <DialogTrigger asChild>
              <Button
                onClick={toggleRegionModal}
                variant="outline"
                size="icon"
                className="w-full p-2 items-center space-x-3 border-none shadow-none"
              >
                <MapPin width={16} height={16} />
                <Label className="hidden md:block text-foreground text-l">
                  {location.city}
                </Label>
              </Button>
            </DialogTrigger>
            {modalState === "country" ? (
              <DialogContent className="overflow-y-auto">
                <DialogTitle className="flex justify-between items-center p-4">
                  {" "}
                  <Label className="text-lg font-bold">{menu?.country}</Label>
                  <Label className="md:hidden me-4 md:me-0 text-foreground text-l">
                    Current location - {location.city}
                  </Label>
                </DialogTitle>
                <div className="grid grid-cols-2 h-[500px] pb-5 md:h-full md:grid-cols-3 gap-4">
                  {euCountries.map((country) => {
                    const FlagIcon = flagComponents[country.code];

                    return (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country.code)}
                        className="flex items-center space-x-2 pl-4 p-1 border rounded hover:bg-gray-100"
                      >
                        <FlagIcon className="w-5 h-auto" />
                        <span>{country.name}</span>
                      </button>
                    );
                  })}
                </div>
              </DialogContent>
            ) : (
              <DialogContent className="overflow-y-auto max-h-[80vh]">
                <DialogTitle className="flex justify-between items-center p-4">
                  <Label className="text-lg font-bold">{menu?.city}</Label>
                  <Button
                    variant="default"
                    onClick={() => setModalState("country")}
                    className="p-2 border rounded me-4 md:me-0"
                  >
                    {menu?.country_select}
                  </Button>
                </DialogTitle>
                <div className="grid grid-cols-3 gap-4">
                  {cityList?.map((city) => (
                    <button
                      key={city + "button"}
                      onClick={() => handleCitySelect(city)}
                      className="p-2 border rounded hover:bg-gray-100"
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </DialogContent>
            )}
          </Dialog>
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
                    <Label className="text-foreground text-l">
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
                    <Label className="text-foreground text-l">
                      {menu?.make_ad || "Make Ad"}
                    </Label>
                    <MegaphoneIcon className="ml-2 w-4 h-4" />
                  </Link>
                  <Link
                    onClick={handleLogout}
                    className="flex flex-row justify-between items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer"
                    href={`/${lang}/login`}
                  >
                    <Label className="text-foreground text-l">
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
