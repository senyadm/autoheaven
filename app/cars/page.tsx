"use client";
import React from "react";
import Image from "next/image";
import logo from "../../public/autoheven_logo.svg";
import { Button } from "@/components/ui/button";

import { Navbar } from "@/components/Navbar";
import Footer from "@/components/Footer";
import CarSearchResults from "@/components/cars/CarSearchResults";
import CarSidebar from "@/components/cars/CarSidebar";

const Cars = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />

      <main className="flex flex-1 items-start bg-indigo-50 py-6">
        <div className="flex flex-row px-8 mt-10 space-x-6 w-full">
          <div className="flex-none">  {/* Container for the sidebar */}
            <CarSidebar />
          </div>
          <div className="flex-grow">  {/* Container for the search results */}
            <CarSearchResults />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cars;
