import { Button } from "@/components/ui/button";
import Image from "next/image";
import Hero from "./_components/Hero";
import { PopularCity } from "./_components/PopularCity";

export default function Home() {
  return (
    <div>
      {/* <Button variant={"destructive"}>Hello</Button> */}
      <Hero />
      <PopularCity />
    </div>
  );
}
