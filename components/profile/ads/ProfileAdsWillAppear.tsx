import React from "react";
import { Button } from "../../ui/button";
import { useRouter } from "next/navigation";
import { Car, ChevronRight } from "lucide-react";
import LinkLikeButton from '@/src/shared/ui/LinkLikeButton';

const ProfileAdsWillAppear = ({lang}: any) => {
  const router = useRouter();

  return (
    <div className="flex flex-col space-y-3 items-center h-full justify-center">
      <Car width={48} height={48} color="#2563EB" />
      <div className="text-muted-foreground text-3xl m-0">
        Liked ads will appear here
      </div>
      <LinkLikeButton href={`/${lang}/cars`}>
        <div>Search for cars </div>
        <ChevronRight width={16} height={16} className="ml-2" />
      </LinkLikeButton>
    </div>
  );
};

export default ProfileAdsWillAppear;
