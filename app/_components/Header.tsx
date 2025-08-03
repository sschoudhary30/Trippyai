"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const menuOption = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Pricing",
    path: "/pricing",
  },
  {
    name: "Contact us",
    path: "/contact-us",
  },
];

function Header() {
  const { user } = useUser();

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`
        fixed  z-50 flex justify-between items-center px-4 py-3
        transition-all duration-300
        ${scrolled ? "bg-black/10 shadow-md backdrop-blur-lg top-3 rounded-3xl left-50 w-[80vw] border-neutral-200 border-2" : "bg-white shadow-sm top-0 rounded-none left-0 w-full"}
      `}
    >
      <div className="flex gap-2 items-center">
        <Image src={"/logo.svg"} alt="logo" width={30} height={30} />
        <h2 className="font-bold text-2xl">Trippyai</h2>
      </div>
      <div className="flex gap-8 items-center">
        {menuOption.map((menu, index) => (
          <Link key={menu.name} href={menu.path}>
            <h2 className="text-lg hover:text-primary hover:scale-105 transition">
              {menu.name}
            </h2>
          </Link>
        ))}
      </div>
      {!user ? (
        <SignInButton mode="modal">
          <Button>Get Started</Button>
        </SignInButton>
      ) : (
        <div className="flex gap-2 items-center justify-center">
          {/* <div className="flex items-center gap-2 shadow px-3 rounded-2xl">
            <div className="flex flex-col items-end">
              <h5 className=" font-medium">{user.fullName}</h5>
              <h5 className=" font-medium">
                {user.primaryEmailAddress?.emailAddress}
              </h5>
            </div>
            <Image
              src={user?.imageUrl}
              alt="user-image"
              width={30}
              height={30}
              className="rounded-full"
            />
          </div> */}
          <Image
            src={user?.imageUrl}
            alt="user-image"
            width={35}
            height={35}
            className="rounded-full z-10"
          />
          <Link href={"/create-new-trip"}>
            <Button>Create new trip</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
