import React from "react";
import { Card, CardContent, CardHeader } from "../../ui/card";
import { ActivitySquare, Book, Bookmark, Mail, Search } from "lucide-react";
import { Label } from "../../ui/label";
import { OverviewDictionary } from "@/types";

interface OverviewProps {
  overview: OverviewDictionary | null;
}

const ProfileOverview = ({ overview }: OverviewProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 overflow-hidden w-full">
      <Card className="relative h-[140px] md:h-[174px] rounded-lg bg-primary-foreground overflow-hidden border-none shadow-none">
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
            2341 {overview?.vehicles || "Vehicles available"}
          </Label>
        </CardContent>
      </Card>

      <Card className="relative h-[140px] md:h-[174px] rounded-lg bg-primary-foreground overflow-hidden border-none shadow-none">
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
            2341 {overview?.vehicles || "Vehicles available"}
          </Label>
        </CardContent>
      </Card>
      <Card className="relative h-[140px] md:h-[174px] rounded-lg bg-primary-foreground overflow-hidden border-none shadow-none">
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
            2341 {overview?.vehicles || "Vehicles available"}
          </Label>
        </CardContent>
      </Card>

      <Card className="relative h-[140px] md:h-[174px] rounded-lg bg-primary-foreground overflow-hidden border-none shadow-none">
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
            2341 {overview?.vehicles || "Vehicles available"}
          </Label>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileOverview;
