"use client"

import * as React from "react";
import Link from "next/link";
import {  EnterIcon, MagnifyingGlassIcon, DragHandleHorizontalIcon} from "@radix-ui/react-icons"; // Import Radix UI icons
import { cn } from "@/lib/utils";
import {InputField} from "@/components/ui/input-field"
import {Logo} from "@/icons/logo";
import {
    TfiAnnouncement,
  } from "react-icons/tfi";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/Navbar";
import {
 Button
} from "@/components/ui/button";


export function Navbar() {
  return (
    <NavigationMenu className="flex items-center py-4 bg-white border-b">
      <div className="w-full mx-auto max-w-screen-xl px-4 flex items-center justify-between">
        {/* Left side: Logo and Search */}
        <div className="flex items-center space-x-4">
          <Logo className="w-18 h-10" />
          <div className="flex items-center border rounded-md px-2 h-10 w-full">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-500" />
            <InputField
              className="bg-transparent border-none outline-none text-black ml-2 flex-grow"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Right side: Button and Sign-In */}
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            className="bg-green-400 hover:bg-green-600 h-full"
          >
            Advertise <TfiAnnouncement style={{ marginLeft: "4px" }} />
          </Button>
          <Button>
            <DragHandleHorizontalIcon />
          </Button>
          <Link href="/login" passHref>
            <NavigationMenuLink className="h-full flex items-center">
              <EnterIcon className="mr-1" /> Login
            </NavigationMenuLink>
          </Link>
        </div>
      </div>
    </NavigationMenu>
  );
}
 