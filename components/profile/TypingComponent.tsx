import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

const TypingComponent = () => {
  return (
    <div className="h-full w-full flex items-center p-2 space-x-2">
      <Input className="h-full" placeholder="Start typing..." />
      <Button className="aspect-square h-full p-3">
        <Send width={16} height={16} />
      </Button>
    </div>
  );
};

export default TypingComponent;
