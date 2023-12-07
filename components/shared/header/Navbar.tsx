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
import ModeToggle from "./ModeToggle";
import logo from "../../../public/autoheven_logo.svg";
import { Label } from "@/components/ui/label";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useEffect, useMemo, useState } from "react";

export function Navbar() {
  const [modalState, setModalState] = useState("country");
  const [cityList, setCityList] = useState<string[]>([]);
  const handleCountrySelect = (countryName: string) => {
    setSelectedCountry(countryName);
    setCityList(euCountriesCities[countryName])
    console.log(countryName, euCountriesCities[countryName], euCountriesCities)
    setModalState("city");
  };
  const handleCitySelect = (cityName: string) => {
    setLocation({ ...location, city: cityName });
    setModalState("none");
    toggleRegionModal();
  };
  const [lang, setLang] = useState(true); // false: CZ, true: UK
  const [openPopover, setOpenPopover] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [regionModalOpen, setRegionModalOpen] = useState(false),
    toggleRegionModal = () => setRegionModalOpen(!regionModalOpen);
  const handleLanguageToggle = () => {
    setOpenPopover(false);
    setTimeout(() => {
      setLang(!lang);
    }, 300);
  };

  const [location, setLocation] = useState({ country: "", city: "" });
  const [cities, setCities] = useState([]);
  const [token, setToken] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

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

  const handlePopoverToggle = () => {
    setOpenPopover(!openPopover);
  };

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
            href="/"
            className="px-4 flex items-center bg-background text-secondary-foreground space-x-2 h-10 border rounded-lg"
            passHref
          >
            <ChevronLeft width={20} height={20} />
            <Label className="text-bold text-lg cursor-pointer">Home</Label>
          </Link>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Image src={logo} height={30} width={64} alt="" />
            </Link>

            <div className="flex items-center border rounded-md pl-2 h-10 w-full">
              <SearchIcon className="w-5 h-5 text-gray-500" />
              <InputField
                className="bg-transparent border-none outline-none text-black ml-2 flex-grow rounded-r-md text-muted-foreground"
                placeholder="Search"
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
                  <DialogTitle>Choose a Country</DialogTitle>
                  <div className="grid grid-cols-3 gap-4">
                    {euCountries.map((country) => (
                      <button
                        key={country.code}
                        onClick={() => handleCountrySelect(country.code)}
                        className="p-2 border rounded hover:bg-gray-100"
                      >
                        {country.name}
                      </button>
                    ))}
                  </div>
                </DialogContent> : 
                <DialogContent>
                <DialogTitle>Choose a City</DialogTitle>
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
          Select Country
        </Button>
      </div>
              </DialogContent>}   
              </Dialog>
              {token ? (   <> <Popover open={openPopover}>
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
    {/* Notification section */}

     <Button className="flex flex-row justify-between items-center p-2 space-x-2" variant='ghost'> <Label className="text-foreground text-l">Notifs</Label><Bell width={16} height={16} /></Button>
     <Button className="flex flex-row justify-between items-center p-2 space-x-2" variant='ghost'>
    <Label className="text-foreground text-l">  Make Ad</Label>
      <MegaphoneIcon className="ml-2 w-4 h-4" />
    </Button>
    <Link
onClick={handleLogout} className="flex flex-row justify-between items-center p-2 space-x-2"
      href="/login"
    >
     <Label className="text-foreground text-l">Logout</Label>
      <LogOutIcon width={16} height={16} />
    </Link>
 

  </PopoverContent>
</Popover>
            </>
          ) : (
            <Link
              href="/login"
              className={buttonVariants({ size: "icon", variant: "outline" })}
            >
              <LogInIcon className="w-4 h-4" />
              <span className="sr-only">Login</span>
            </Link>
          )}
          {/* <Popover open={openPopover}>
            <PopoverTrigger
              // className="color-primary h-full border p-3 rounded-lg"
              onClick={handlePopoverToggle}
              asChild
            >
              <Button variant="outline" size="icon">
                <SvgIcon
                  width={16}
                  height={16}
                  alt="Translate Icon"
                  filepath={!lang ? "/icons/UK_Flag.svg" : "/icons/CZ_Flag.svg"}
                />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="px-1 py-2">
              <Button variant="ghost" onClick={handleLanguageToggle}>
                <SvgIcon
                  width={16}
                  height={16}
                  alt="Translate Icon"
                  className="mr-2"
                  filepath={lang ? "/icons/UK_Flag.svg" : "/icons/CZ_Flag.svg"}
                />
                {lang ? "English" : "Czech"}
              </Button>
            </PopoverContent>
          </Popover> */}

          {/* {!isNavbarV2 && (
            <>
              
              <Link
                href="/login"
                className={buttonVariants({ size: "icon", variant: "outline" })}
              >
                <LogInIcon className="w-4 h-4" />
                <span className="sr-only">Login</span>
              </Link>
              <Button>
                Advertise
                <MegaphoneIcon className="ml-2 w-4 h-4" />
              </Button>
              
            </>
          )} */}
        </div>
      </div>
    </NavigationMenu>
  );
}
