import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Profile Messages",
  description: "Profile messages",
};
const page = () => {
  return (
    <div className="row-span-12 bg-background col-span-2">Select a chat</div>
  );
};

export default page;
