"use client"
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { ActivitySquare, Book, Bookmark, Mail, Search } from "lucide-react";
import { Label } from "../../ui/label";
import { OverviewDictionary } from "@/types";
import { clientCars, clientChats } from "@/src/shared/api";
import { useRouter } from "next/navigation";
import axios from "axios";

interface OverviewProps {
  overview: OverviewDictionary | null;
}

const ProfileOverview = ({ overview }: OverviewProps) => {
  const router = useRouter();

  const [overviewAmounts, setOverviewAmounts] = useState({
    cars: 0,
    ads: 0,
    msgs: 0,
    myCars: 0
  })

  useEffect(() => {
    const amounts = {
      cars: 0,
      ads: 0,
      msgs: 0,
      myCars: 0
    }

    const fetchAllCarsCount = clientCars.get("api/cars/count/").then((response) => {
      amounts.cars = response.data;

    })
    .catch((err) => {
      console.error(err);
    });

    const fetchUsersAds = clientCars.get("api/cars/user/").then((response) => {
      amounts.ads = response.data.length;
    })
    .catch((err) => {
      console.error(err);
    });

    // fetch results
    const fetchUserLiked = clientCars.get("api/cars/wishlist/").then((response) => {
      amounts.myCars = response.data.length;
    })
    .catch((err) => {
      console.error(err);
    });

    const fetchUserMsgs = clientChats.get(`/chat_list`)
    .then((res) => {
      const filteredChats = res.data.filter((obj) => obj.last_message);

      amounts.msgs = filteredChats.length;
    })
    .catch((err) => {
      console.error(err);
    });

    Promise.all([fetchUserLiked, fetchUserMsgs, fetchUsersAds, fetchAllCarsCount]).then(() => {
      setOverviewAmounts(amounts);
    })
    .catch((err) => {
      console.error("Error in Promise:", err);
    })
  }, []);

  const handleCardClick = (path) => {
    router.push(path); // Navigate on click
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-hidden w-full">
      <Card onClick={() => handleCardClick("/")} className="relative h-[140px] md:h-[174px] rounded-lg bg-primary-foreground overflow-hidden border-none shadow-none hover:shadow-md transform hover:scale-101 transition-transform duration-300 cursor-pointer">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="#2563EB"
            strokeWidth="3"
            strokeDasharray="18,4"
          />
        </svg>{" "}
        <CardContent className="flex flex-col p-6 items-start ">
          <Search size={64} color="#2563EB" />
          <Label className="mt-3 text-foreground font-bold">
            {overview?.startNewSearch || "Start a new search"}
          </Label>
          <Label className="text-foreground text-sm">
            {overviewAmounts.cars} {overview?.vehicles || "Vehicles available"}
          </Label>
        </CardContent>
      </Card>

      <Card onClick={() => handleCardClick("/profile/cars")} className="relative h-[140px] md:h-[174px] rounded-lg bg-primary-foreground overflow-hidden border-none shadow-none hover:shadow-md transform hover:scale-101 transition-transform duration-300 cursor-pointer">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="#2563EB"
            strokeWidth="3"
            strokeDasharray="18,4"
          />
        </svg>{" "}
        <CardContent className="flex flex-col p-6 items-start">
          <ActivitySquare size={64} color="#2563EB" />
          <Label className="mt-3 text-foreground font-bold">
            {overview?.showActiveAds || "Show my active ads"}
          </Label>
          <Label className="text-foreground text-sm">
            {overviewAmounts.ads} {overview?.vehicles || "Vehicles available"}
          </Label>
        </CardContent>
      </Card>
      <Card onClick={() => handleCardClick("/profile/messages")} className="relative h-[140px] md:h-[174px] rounded-lg bg-primary-foreground overflow-hidden border-none shadow-none hover:shadow-md transform hover:scale-101 transition-transform duration-300 cursor-pointer">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="#2563EB"
            strokeWidth="4"
            strokeDasharray="18,4"
          />
        </svg>{" "}
        <CardContent className="flex flex-col p-6 items-start">
          <Mail size={64} color="#2563EB" />
          <Label className="mt-3 text-foreground font-bold">
            {overview?.inbox || "Inbox"}
          </Label>
          <Label className="text-foreground text-sm">
            {overviewAmounts.msgs} {overview?.vehicles || "Vehicles available"}
          </Label>
        </CardContent>
      </Card>

      <Card onClick={() => handleCardClick("/profile/ads")} className="relative h-[140px] md:h-[174px] rounded-lg bg-primary-foreground overflow-hidden border-none shadow-none hover:shadow-md transform hover:scale-101 transition-transform duration-300 cursor-pointer">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="#2563EB"
            strokeWidth="3"
            strokeDasharray="18,4"
          />
        </svg>{" "}
        <CardContent className="flex flex-col p-6 items-start">
          <Bookmark size={64} color="#2563EB" />
          <Label className="mt-3 text-foreground font-bold">
            {overview?.saved || "Saved"}
          </Label>
          <Label className="text-foreground text-sm">
            {overviewAmounts.myCars} {overview?.vehicles || "Vehicles available"}
          </Label>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileOverview;
