"use client";

import TypingComponent from "../../../../../components/profile/TypingComponent";

const page = ({ params }) => {
  const chatId = params.id;
  console.log("🚀 ~ page ~ params:", params);
  const handleSendClick = () => {};
  return (
    <div className="flex items-center row-span-1 bg-background col-span-2">
      {<TypingComponent onSendClick={handleSendClick} />}
    </div>
  );
};

export default page;
