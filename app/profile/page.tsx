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

const currentPageURL = '/profile/';
const Cars = () => {

  const [profileComponentName, setProfileComponentName] = useState("overview");

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex">
        <section>
          John Doe 
          <ProfileNavigationMenu onItemClick={(componentName: string)=>setProfileComponentName(componentName)}/>
        </section>
        <section>
          <ProfileContent tabName={profileComponentName}/>
        </section>
      </main>
     
    </div>
  );
};

export default Cars;
