"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../public/autoheven_logo.svg";
import { Button } from "@/components/ui/button";

import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarSearchResults from "@/components/cars/CarSearchResults";
import CarSidebar from "@/components/cars/CarSidebar";
import { usePathname } from "next/navigation";

import Link from "next/link";
import ProfileContent from "@/components/profile/ProfileContent";
import ProfileNavigationMenu from "@/components/profile/ProfileNavigationMenu";
import { useSelector } from "react-redux";
import { RootState } from "../GlobalRedux/store";
import { Separator } from "@/components/ui/separator";
import SvgIcon from "@/components/SvgIcon";

const currentPageURL = '/profile/';
const Cars = () => {

 
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex w-full h-full space-x-4 mt-4 ml-7">
        <section className="border rounded-lg h-full p-3 w-[230px] flex flex-col items-start gap-2.5 flex-shrink-0">
            <div className="flex items-center mb-4">
                <div className="mr-4 flex-shrink-0">
                    <SvgIcon filepath="/icons/profile.svg" alt="Logo" width={48} height={48} /> 
                </div>
                <div className="flex flex-col">
                    <span className="font-bold ">John Doe</span>
                    <span className="text-foreground text-sm text-muted-foreground">johndoe@gmail.com</span>
                </div>
            </div>
            <Separator/>
            <div className="mt-4">
                <ProfileNavigationMenu/>
            </div>
        </section>
        <section className="border rounded-lg h-full w-full">
            <ProfileContent/>
        </section>
      </main>
    </div>
  );
};

export default Cars;
