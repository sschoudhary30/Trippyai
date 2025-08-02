"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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

  return (
    <div className="flex justify-between px-4 py-3 shadow-sm">
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
          <Link href={"/create-trip"}>
            <Button>Create new trip</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
