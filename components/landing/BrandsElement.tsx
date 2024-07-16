"use client";
import { brandInfo } from "@/interfaces/brandInfo";
import { ExternalLink } from "lucide-react";
import { TypographyList } from "../ui/typography";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface BrandsElementProps {
  brandInfo: brandInfo;
}

const BrandsElement = ({ brandInfo }: BrandsElementProps) => {
  const { brandName, resultsCount, models } = brandInfo;
  // const router = useRouter();

  return (
    <div>
      <div className="flex">
        <Link
          href={`/cars/${brandName}`}
          className="font-bold mr-4 cursor-pointer hover:underline"
        >
          {brandName}
        </Link>
        {/* <div className="flex opacity-50 items-center">
          <div className="mr-1">{resultsCount}</div>
          <ExternalLink className="h-3 w-3" />
        </div> */}
      </div>
      <TypographyList listItems={models} />
    </div>
  );
};

export default BrandsElement;
