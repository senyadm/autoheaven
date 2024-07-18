import React from "react";
import { Label } from "../ui/label";
interface Props {
  title: string;
  text: string;
  description: string;
}
const SectionHeader = ({ title, text, description }: Props) => {
  return (
    <>
      <Label className="text-sm text-center text-primary mb-3 mt-3">
        {title}
      </Label>
      <Label className="text-4xl text-center bg-gradient-to-t from-gray-500 to-gray-900 text-transparent bg-clip-text">
        {text}
      </Label>
      <Label className="text-muted-foreground text-center font-semibold text-lg mt-2">
        {description}
      </Label>
    </>
  );
};

export default SectionHeader;
