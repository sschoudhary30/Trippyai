"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowDown, Globe2, Landmark, Plane, Send } from "lucide-react";
import React from "react";
import HeroVideoDialog from "@/components/magicui/hero-video-dialog";
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export const suggestion = [
  {
    title: "Create New Trip",
    icon: <Globe2 className="text-blue-400 h-5 w-5 " />,
  },
  {
    title: "Ispire me where to go",
    icon: <Plane className="text-green-500 h-5 w-5 " />,
  },
  {
    title: "Discover Hidden gems",
    icon: <Landmark className="text-orange-500 h-5 w-5 " />,
  },
  {
    title: "Adventure Destination",
    icon: <Globe2 className="text-yellow-600 h-5 w-5 " />,
  },
];

function Hero() {
  const { user } = useUser();

  const router = useRouter();

  const onSend = () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    router.push("/create-new-trip");
  };
  return (
    <div className="mt-24 flex w-full justify-center">
      <div className="max-w-3xl w-full text-center space-y-6">
        <h1 className="text-xl md:text-5xl font-bold">
          Hey, I'm your AI trip buddy{" "}
          <span className="text-primary">Trippyai</span>.
        </h1>
        <p className="text-lg p-2 text-neutral-500">
          Tell mew what you want, and I'll handle the rest: Flights, Hotels,
          Trip planning - Al in seconds.
        </p>
        <div>
          <div className=" border rounded-2xl p-4 shadow relative mt-8 mb-2">
            <Textarea
              placeholder="Create a trip for Pune to Goa"
              className="w-full h-28 bg-transparent border-none focus-visible:ring-0 shadow-none resize-none"
            />
            <Button
              size={"icon"}
              className=" absolute bottom-6 right-6"
              onClick={() => onSend()}
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
        <div className="flex gap-5 ">
          {suggestion.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 border rounded-full p-2 cursor-pointer hover:bg-primary/80 hover:text-white transition duration-150"
            >
              {item.icon}
              <h2 className=" text-sm">{item.title}</h2>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center">
          <h2 className="my-7 mt-14 flex gap-3 text-center sm:text-xl lg:text-3xl">
            Not Sure where to start?<strong>See how it works</strong>
            <ArrowDown />
          </h2>

          <HeroVideoDialog
            className="block dark:hidden"
            animationStyle="from-center"
            videoSrc="https://i.pinimg.com/originals/3e/9c/8a/3e9c8a5fce35c18fd7f15563b7ee345f.gif"
            thumbnailSrc="https://i.pinimg.com/1200x/a4/73/25/a473254af647f8a75a4d61175d51fb4d.jpg"
            thumbnailAlt="Dummy Video Thumbnail"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
