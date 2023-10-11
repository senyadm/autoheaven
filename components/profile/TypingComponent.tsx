import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

const TypingComponent = () => {
  return (
    <div className="h-[55px] w-full flex items-center p-2 space-x-2">
      <Input className="h-full" placeholder="Start typing..." />
      <Button className="w-10 h-10 p-3">
        <Send />
      </Button>
    </div>
  );
};

export default TypingComponent;
