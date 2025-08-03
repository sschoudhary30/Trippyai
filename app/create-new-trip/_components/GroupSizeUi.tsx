"use client";
import React from "react";

export const SelectTravelersList = [
  {
    id: 1,
    title: "Just Me",
    desc: "A sole traveler in exploration",
    icon: "✈️",
    people: "1",
  },
  {
    id: 2,
    title: "A Couple",
    desc: "Two travelers in tandem",
    icon: "🥂",
    people: "2 People",
  },
  {
    id: 3,
    title: "Family",
    desc: "A group of fun loving adv",
    icon: "🏡",
    people: "3 to 5 People",
  },
  {
    id: 4,
    title: "Friends",
    desc: "A bunch of thrill-seekers",
    icon: "⛺",
    people: "5 to 10 People",
  },
];

// Define the props the component will accept for interactivity
interface GroupSizeUiProps {
  onOptionSelect: (option: string) => void;
}

function GroupSizeUi({ onOptionSelect }: GroupSizeUiProps) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3">
      {SelectTravelersList.map((item) => (
        <div
          key={item.id}
          // When an option is clicked, call the passed-in function
          onClick={() => onOptionSelect(item.title)}
          className="p-3 border rounded-lg bg-white hover:border-primary hover:scale-105 cursor-pointer flex flex-col items-center text-center transition-all"
        >
          <h2 className="text-2xl">{item.icon}</h2>
          <h2 className="font-bold text-sm mt-1">{item.title}</h2>
          <p className="text-xs text-gray-500">{item.people}</p>
        </div>
      ))}
    </div>
  );
}

export default GroupSizeUi;
