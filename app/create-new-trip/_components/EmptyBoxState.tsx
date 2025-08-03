import React from "react";

import { suggestion } from "@/app/_components/Hero";

function EmptyBoxState({ onSelectOption }: any) {
  return (
    <div className="mt-7">
      <h2 className=" font-bold text-3xl text-center">
        Start Planning new trip by using
        <strong className="text-primary">Trippyai</strong>
      </h2>

      <p className="text-center text-neutral-400 mt-3">
        Discover personalized travel itineraries, find the best destinations,
        and plan your dream vacation effortlessly with the power of AI. Let our
        smart assistant do the hard work while you enjoy the journey.
      </p>
      <div className="flex flex-col gap-5 mt-8">
        {suggestion.map((item, index) => (
          <div
            key={index}
            onClick={() => onSelectOption(item.title)}
            className="flex items-center  gap-2 border rounded-xl p-4 cursor-pointer hover:border-primary transition duration-150"
          >
            {item.icon}
            <h2 className=" text-lg">{item.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmptyBoxState;
