"use client";
import React, { useState } from "react";
import {
  Eye,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { EyeClosedIcon } from "@radix-ui/react-icons";
import { Label } from "@radix-ui/react-label";
import  {Button} from "@/components/ui/button";
import { cn } from '@/src/shared/utils/cn';

interface PhoneNumberProps {
    phone_number: string;
    className?: string;
    }

export default function PhoneNumber({ phone_number, className }: PhoneNumberProps) {
    const [eyeOpen, setEyeOpen] = useState(false);
    const [showNumber, setShowNumber] = useState(false);
  return (
    <div className={cn("md:w-auto", className)}>
    <div className="flex justify-start items-center">
      <div className="md:hidden md:mb-2">
        <Button
          variant="ghost"
          className="transition duration-300 hover:bg-white py-0"
          onClick={() => setShowNumber(!showNumber)}
        >
          {showNumber ? (
            <Eye width={16} height={16} className="mr-1" />
          ) : (
            <EyeClosedIcon width={16} height={16} />
          )}
          <Label className="ml-2">
            {showNumber ? phone_number : "Show contact"}
          </Label>
        </Button>
      </div>
    </div>
    <div className="hidden md:block">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div
              onMouseLeave={() => setEyeOpen(false)}
              onMouseEnter={() => setEyeOpen(true)}
              className="flex space-x-2 hover:underline hover:transition duration-300 cursor-pointer"
            >
              {eyeOpen ? (
                <Eye width={16} height={16} className="mr-1" />
              ) : (
                <EyeClosedIcon width={16} height={16} />
              )}
              <Label className="cursor-pointer whitespace-nowrap	">
                Show contact{" "}
              </Label>
            </div>
          </TooltipTrigger>
          <TooltipContent>{phone_number}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
  )
}
