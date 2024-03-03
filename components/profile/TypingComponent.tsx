import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

interface TypingComponentProps {
  onSendClick: (messageContent: string) => void;
}

const TypingComponent = ({ onSendClick }: TypingComponentProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSendClick = () => {
    onSendClick(inputValue);
    // Optionally, clear the input after sending
    setInputValue("");
  };

  return (
    <div className="h-full w-full flex items-center p-2 space-x-2">
      <Input
        className="h-full"
        placeholder="Start typing..."
        value={inputValue}
        onChange={handleInputChange}
      />
      <Button className="aspect-square h-full p-3" onClick={handleSendClick}>
        <Send width={16} height={16} />
      </Button>
    </div>
  );
};
export default TypingComponent;
