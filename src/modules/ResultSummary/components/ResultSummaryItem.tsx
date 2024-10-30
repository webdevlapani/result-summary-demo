import React from "react";
import { SummaryItem } from "../types";

interface SummaryItemComponentProps {
  item: SummaryItem;
}

// Define a single configuration object for all category styles
const categoryStyles: Record<
  SummaryItem["category"],
  { bgClass: string; colorClass: string }
> = {
  Reaction: { bgClass: "bg-light-red/10", colorClass: "text-light-red" },
  Memory: {
    bgClass: "bg-orangey-yellow/10",
    colorClass: "text-orangey-yellow",
  },
  Verbal: { bgClass: "bg-green-teal/10", colorClass: "text-green-teal" },
  Visual: { bgClass: "bg-cobalt-blue/10", colorClass: "text-cobalt-blue" },
};

// Functional component to render each summary score item with a specific background and text color
export const ResultSummaryItem: React.FC<SummaryItemComponentProps> = ({
  item,
}) => {
  const styles = categoryStyles[item.category];

  return (
    <div
      className={`flex justify-between items-center p-3.5 rounded-md ${styles.bgClass}`}
    >
      <span
        className={`font-hanken font-medium flex gap-3.5 ${styles.colorClass}`}
      >
        <img src={item.icon} alt={item.category.toLowerCase()} />
        {item.category}
      </span>
      <div className="text-gray-800 font-bold">
        {item.score} <span className="text-light-black"> / 100 </span>
      </div>
    </div>
  );
};
