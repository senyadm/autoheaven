"use client"

import * as React from "react";
import Link from "next/link";
import {  EnterIcon, MagnifyingGlassIcon} from "@radix-ui/react-icons"; // Import Radix UI icons
import { cn } from "@/lib/utils";
import {InputField} from "@/components/ui/InputField"
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

export function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        {/* Logo */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>My App</NavigationMenuTrigger>
      
        </NavigationMenuItem>
        {/* Search Input */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <MagnifyingGlassIcon /> 
            <InputField/>
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            {/* Your search input component */}
          </NavigationMenuContent>
        </NavigationMenuItem>
        {/* User Actions */}
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <TfiAnnouncement /> User
          </NavigationMenuTrigger>
        
        </NavigationMenuItem>
        {/* Authentication */}
        <NavigationMenuItem>
          <Link href="/login" passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <EnterIcon /> Login
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
