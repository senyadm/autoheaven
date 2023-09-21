"use client";

import * as React from "react";
import Link from "next/link";
import {
  EnterIcon,
  MagnifyingGlassIcon,
  DragHandleHorizontalIcon,
} from "@radix-ui/react-icons"; // Import Radix UI icons
import { cn } from "@/lib/utils";
import { InputField } from "@/components/ui/input-field";
import { Logo } from "@/icons/logo";
import { TfiAnnouncement } from "react-icons/tfi";
import { HiOutlineTranslate } from "react-icons/hi";
import { Popover, PopoverTrigger, PopoverContent } from "./ui/popover";

import { NavigationMenu } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/button";
import SvgIcon from "./SvgIcon";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export function Navbar() {
  const [lang, setLang] = React.useState(false); // false: CZ, true: UK
  const [openPopover, setOpenPopover] = React.useState(false);

  const handleLanguageToggle = () => {
    setOpenPopover(false);
    setTimeout(() => {
      setLang(!lang);
    }, 300);
  };

  const handlePopoverToggle = () => {
    setOpenPopover(!openPopover);
  };

  const pathname = usePathname();
  const isLoginPage = pathname === "/login";

  return (
    <NavigationMenu className="flex items-center py-3 bg-indigo-50 border-b sticky top-0 z-20 h-[64px]">
      <div
        className="container mx-auto px-4 flex items-center justify-between"
        style={{ maxWidth: "1140px" }}
      >
        {/* Left side */}
        {isLoginPage ? (
          <Link
            href="/"
            className="px-4 flex items-center bg-background text-secondary-foreground space-x-2 h-10 border rounded-lg"
            passHref
          >
            <ChevronLeft width={16} height={12} />
            Back Home
          </Link>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/">
              <SvgIcon
                width={78}
                height={36}
                alt=""
                filepath="logotype_draft.svg"
                className="w-18 h-10"
              />
            </Link>

            <div className="flex items-center border rounded-md px-2 h-10 w-full">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
              <InputField
                className="bg-transparent border-none outline-none text-black ml-2 flex-grow"
                placeholder="Search"
              />
            </div>
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <Popover open={openPopover}>
            <PopoverTrigger>
              <Button
                variant="outline"
                className="color-primary h-full"
                onClick={handlePopoverToggle}
              >
                <HiOutlineTranslate style={{ marginLeft: "4px" }} />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              style={{ width: "40px", height: "20px", padding: "0" }}
            >
              <Button
                variant="outline"
                className="h-full w-full p-0"
                onClick={handleLanguageToggle}
              >
                <SvgIcon
                  width={60}
                  height={30}
                  alt="Translate Icon"
                  filepath={lang ? "icons/UK_Flag.svg" : "icons/CZ_Flag.svg"}
                />
              </Button>
            </PopoverContent>
          </Popover>

          {!isLoginPage && (
            <>
              <Button variant="default" className="h-full">
                Advertise <TfiAnnouncement style={{ marginLeft: "4px" }} />
              </Button>
              <Link href="/login" className="h-full flex items-center" passHref>
                <EnterIcon className="mr-1" /> Login
              </Link>
            </>
          )}
        </div>
      </div>
    </NavigationMenu>
  );
}
