import { Star } from "lucide-react";
import React from "react";
interface Props {
  rating: number;
}
const StarRating = ({ rating }: Props) => {
  return (
    <div className="flex">
      {Array(rating)
        .fill(true)
        .map((_, i) => (
          <Star className="text-primary" key={"star " + i} />
        ))}
      {Array(5 - rating)
        .fill(true)
        .map((_, i) => (
          <Star className="text-border" key={"star " + i} />
        ))}
    </div>
  );
};

export default StarRating;
