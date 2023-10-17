"use client";

import * as React from "react";
import Link from "next/link";
import { InputField } from "@/components/ui/input-field";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";

import { NavigationMenu } from "@/components/ui/navigation-menu";
import { Button, buttonVariants } from "@/components/ui/button";
import SvgIcon from "../SvgIcon";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  LogInIcon,
  MegaphoneIcon,
  SearchIcon,
  ZoomInIcon,
} from "lucide-react";
import ModeToggle from "./ModeToggle";

export function Navbar() {
  const [lang, setLang] = React.useState(true); // false: CZ, true: UK
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
  const isNavbarV2 = pathname === "/login" || pathname === "/profile";

  return (
    <NavigationMenu className="flex items-center py-3 bg-background border-b sticky top-0 z-20 h-[64px]">
      <div
        className="container mx-auto px-4 flex items-center justify-between"
        style={{ maxWidth: "1140px" }}
      >
        {/* Left side */}
        {isNavbarV2 ? (
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

            <div className="flex items-center border rounded-md pl-2 h-10 w-full">
              <SearchIcon className="w-5 h-5 text-gray-500" />
              <InputField
                className="bg-transparent border-none outline-none text-black ml-2 flex-grow rounded-r-md"
                placeholder="Search"
              />
            </div>
          </div>
        )}

        {/* Right side */}
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <Popover open={openPopover}>
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
                  filepath={!lang ? "icons/UK_Flag.svg" : "icons/CZ_Flag.svg"}
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
                  filepath={lang ? "icons/UK_Flag.svg" : "icons/CZ_Flag.svg"}
                />
                {lang ? "English" : "Czech"}
              </Button>
            </PopoverContent>
          </Popover>

          {!isNavbarV2 && (
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
          )}
        </div>
      </div>
    </NavigationMenu>
  );
}
