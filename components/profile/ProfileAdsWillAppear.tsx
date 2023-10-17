import React from "react";
import { Button } from "../ui/button";
import { Car, ChevronRight } from "lucide-react";

const ProfileAdsWillAppear = () => {
  return (
    <div className="flex flex-col space-y-3 items-center h-full justify-center">
      <Car width={48} height={48} color="#2563EB" />
      <div className="text-muted-foreground text-3xl m-0">
        Liked ads will appear here
      </div>
      <Button>
        <div>Search for cars </div>
        <ChevronRight width={16} height={16} className="ml-2" />
      </Button>
    </div>
  );
};

export default ProfileAdsWillAppear;
