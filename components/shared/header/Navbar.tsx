"use client";

import { ChevronDown, LogOutIcon } from "lucide-react";
import * as React from "react";
import Link from "next/link";
import { InputField } from "@/components/ui/input-field";
import { Popover, PopoverTrigger, PopoverContent } from "../../ui/popover";
import Image from "next/image";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import SvgIcon from "../../SvgIcon";
import { usePathname } from "next/navigation";
import { euCountries, euCountriesCities } from "./countries";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { CountrySelectDialog } from "./RegionModal";
import {
  ChevronLeft,
  LogInIcon,
  MegaphoneIcon,
  SearchIcon,
  ZoomInIcon,
  MapPin,
  Bell,
} from "lucide-react";
import {AT, BE, BG, CY, CZ, DE, DK, EE, ES, FI, FR, GR, HR, HU, IE, IT, LT, LU, LV, MT, NL, PL, PT, RO, SE, SI, SK} from 'country-flag-icons/react/3x2'
import logo from "../../../public/autoheven_logo.svg";
import { Label } from "@/components/ui/label";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useEffect, useMemo, useState } from "react";
import { getlocales } from '@/app/actions'
import { Locale } from "@/i18n.config";
import { NavbarData } from "@/types";

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
  SK: SK
};


export function Navbar({ lang }: { lang: Locale }) {

  const [menu, setMenu] = useState<NavbarData | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const { navbar } = await getlocales(lang)
        setMenu(navbar)
      } catch (error) {
        console.error('Error fetching tools data:', error)
      }
    }

    if (!menu) {
      fetchData()
    }
  }, [lang, menu])

  const [modalState, setModalState] = useState("country");
  const [cityList, setCityList] = useState<string[]>([]);
  const handleCountrySelect = (countryName: string) => {
    setSelectedCountry(countryName);
    setCityList(euCountriesCities[countryName])
    setModalState("city");
  };
  const handleCitySelect = (cityName: string) => {
    setLocation({ ...location, city: cityName });
    setModalState("none");
    toggleRegionModal();
  };

  const [openPopover, setOpenPopover] = useState(false);
  const [regionModalOpen, setRegionModalOpen] = useState(false),
    toggleRegionModal = () => setRegionModalOpen(!regionModalOpen);
  const [location, setLocation] = useState({ country: "", city: "" });
  const [token, setToken] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {

    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
    console.log(storedToken)
  }, []);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // Fetch IP address
        const ipResponse = await fetch("https://api.ipify.org?format=json");
        const ipData = await ipResponse.json();
        const ip = ipData.ip;

        // Fetch location data using IP address
        const locationResponse = await fetch(`http://ip-api.com/json/${ip}`);
        const locationData = await locationResponse.json();
        setLocation({ country: locationData.country, city: locationData.city });
      } catch (error) {
        console.error("Failed to fetch location", error);
      }
    };

    fetchLocation();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const pathname = usePathname();
  const isNavbarV2 = pathname === "/login" || pathname === "/profile";

  const handleClose = () => {
    setRegionModalOpen(!regionModalOpen);
  };

  return (
    <NavigationMenu className="flex items-center py-3 bg-background border-b sticky top-0 z-20 h-[64px]">
      <div
        className="container mx-auto px-4 flex items-center justify-between"
        style={{ maxWidth: "1140px" }}
      >
        {isNavbarV2 ? (
          <Link
            href={`/${lang}`}
            className="px-4 flex items-center bg-background text-secondary-foreground space-x-2 h-10 border rounded-lg"
            passHref
          >
            <ChevronLeft width={20} height={20} />
            <Label className="text-bold text-lg cursor-pointer">  {menu?.home}</Label>
          </Link>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href={`/${lang}`}>
              <Image src={logo} height={30} width={64} alt="" />
            </Link>

            <div className="flex items-center border rounded-md pl-2 h-10 w-full">
              <SearchIcon className="w-5 h-5 text-gray-500" />
              <InputField
                className="bg-transparent border-none outline-none text-black ml-2 flex-grow rounded-r-md text-muted-foreground"
                placeholder={menu?.search}
              />
            </div>
          </div>
        )}

        <div className="flex items-center space-x-4">
          {/*         <ModeToggle />  */}
  
            
              <Dialog open={regionModalOpen} onOpenChange={handleClose}>
                <DialogTrigger asChild>
                  <Button
                    onClick={toggleRegionModal}
                    variant="outline"
                    size="icon"
                    className="w-full p-2 items-center space-x-3 border-none shadow-none"
                  >
                    <MapPin width={16} height={16} />
                    <Label className="text-foreground text-l">
                      {location.city}
                    </Label>
                  </Button>
                </DialogTrigger>
             {modalState === 'country' ? <DialogContent className="overflow-y-auto max-h-[80vh]">
                  <DialogTitle>{menu?.country}</DialogTitle>
                  <div className="grid grid-cols-3 gap-4">
                    {euCountries.map((country) => {
                      const FlagIcon = flagComponents[country.code];

                      return (                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country.code)}
                        className="flex items-center space-x-2 pl-4 p-1 border rounded hover:bg-gray-100"
                      >
                         <FlagIcon className="w-5 h-auto" />
                        <span>{country.name}</span>
                      </button>)

})}
                  </div>
                </DialogContent> : 
                <DialogContent className="overflow-y-auto max-h-[80vh]">
                <DialogTitle>{menu?.city}</DialogTitle>
                <div className="grid grid-cols-3 gap-4">
                  {cityList?.map((city) => (
                    <button
                      key={city}
                      onClick={() => handleCitySelect(city)}
                      className="p-2 border rounded hover:bg-gray-100"
                    >
                      {city}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
        <Button
          variant="default"
          onClick={() => setModalState('country')}
          className="p-2 border rounded"
        >
          {menu?.country_select}
        </Button>
      </div>
              </DialogContent>}   
              </Dialog>
              {token ? (   <> 
                <Button className="flex flex-row justify-between items-center p-2 space-x-2" variant='ghost'><Bell width={16} height={16} /></Button>
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
  <Link href={`/${lang}/profile`} className="flex flex-row justify-between items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer">
    <Label className="text-foreground text-l">{menu?.profile || "Profile"}</Label>
    <SvgIcon
        className="ml-2 w-4 h-4" 
        filepath="/icons/profile.svg"
        alt="Profile"
      />
    </Link>
     <Link className="flex flex-row justify-between items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer" href={`/${lang}/sell`}>
    <Label className="text-foreground text-l">{menu?.make_ad || "Make Add"}</Label>
      <MegaphoneIcon className="ml-2 w-4 h-4" />
    </Link>
    <Link
    
      onClick={handleLogout} className="flex flex-row justify-between items-center p-2 space-x-2 hover:bg-gray-100 cursor-pointer"
      href={`/${lang}/login`}
    >
     <Label className="text-foreground text-l">{menu?.logout || "Log Out"}</Label>
      <LogOutIcon width={16} height={16} />
    </Link>
 

  </PopoverContent>
</Popover>
            </>
          ) : (
            <Link
              href={`/${lang}/login`}
              className={buttonVariants({ size: "icon", variant: "outline" })}
            >
              <LogInIcon className="w-4 h-4" />
              <span className="sr-only">{menu?.login || "Login"}</span>
            </Link>
          )}
        </div>
      </div>
    </NavigationMenu>
  );
}
