"use client";

import { ChevronDown } from "lucide-react";
import * as React from "react";
import Link from "next/link";
import { InputField } from "@/components/ui/input-field";
import { Popover, PopoverTrigger, PopoverContent } from "../../ui/popover";
import Image from "next/image";
import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import SvgIcon from "../../SvgIcon";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  LogInIcon,
  MegaphoneIcon,
  SearchIcon,
  ZoomInIcon,
  MapPin
} from "lucide-react";
import ModeToggle from "./ModeToggle";
import logo from "../../../public/autoheven_logo.svg";
import { Label } from "@/components/ui/label";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export function Navbar() {
  const [lang, setLang] = React.useState(true); // false: CZ, true: UK
  const [openPopover, setOpenPopover] = React.useState(false);

  const handleLanguageToggle = () => {
    setOpenPopover(false);
    setTimeout(() => {
      setLang(!lang);
    }, 300);
  };

  const [location, setLocation] = useState({ country: '', city: '' });
  const [cities, setCities] = useState([]);
  const [token, setToken] = useState<string | null>();
  useEffect(() => {
    const tok = localStorage.getItem("token");
    setToken(tok ? tok : null);
    // Function to fetch location data
    const fetchLocation = async () => {
      try {
        const response = await fetch('/api/location'); // Replace with your API endpoint
        const data = await response.json();
        setLocation({ country: data.country, city: data.city });
        // Optionally, fetch cities based on the country
        const citiesResponse = await fetch(`/api/cities?country=${data.country}`);
        const citiesData = await citiesResponse.json();
        setCities(citiesData.cities);
      } catch (error) {
        console.error('Failed to fetch location', error);
      }
    };

    fetchLocation();
  }, []);

  useEffect(() => {
    console.log(location);
  }, [location])

  const handlePopoverToggle = () => {
    setOpenPopover(!openPopover);
  };

  const pathname = usePathname();
  const isNavbarV2 = pathname === "/login" || pathname === "/profile";

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
            <Label className="text-bold text-lg">Home</Label>
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
          <ModeToggle />
        {token ? <Popover open={openPopover}>
            <PopoverTrigger
              asChild
            >
              <Button onClick={() => setOpenPopover(!openPopover)} variant="outline" size="icon" className="w-full p-2 items-center">

              <SvgIcon
                filepath="/icons/profile.svg"
                alt="Logo"
                width={24}
                height={24}
              />
 
            <ChevronDown width={16} height={16} />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full px-1 py-2 space-y-2 flex flex-col">
              <Link href="/login" onClick={handleLanguageToggle} className="flex flex-row justify-center items-center p-2 space-x-2">
                <Label className="text-foreground text-l">Logout</Label>
                <LogInIcon className="w-4 h-4" />
              </Link>
              <Button>
                Advertise
                <MegaphoneIcon className="ml-2 w-4 h-4" />
              </Button>
            </PopoverContent>
          </Popover> : (
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
