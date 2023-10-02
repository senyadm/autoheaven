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

const currentPageURL = '/profile/';
const Cars = () => {

 
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <main className="flex w-full h-full space-x-4 mt-4">
        <section className="border rounded-lg h-full w-56">
          John Doe 
          <ProfileNavigationMenu/>
        </section>
        <section className="border rounded-lg h-full w-full">
          <ProfileContent/>
        </section>
      </main>
     
    </div>
  );
};

export default Cars;
