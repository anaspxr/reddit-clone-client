"use client";

import { Bell, Ellipsis, LogIn, MessageCircleMore, Plus } from "lucide-react";
import { Button } from "../ui/button";
import ProfileButton from "./profile-button";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import DarkModeSwitch from "./dark-mode-switch";
import Link from "next/link";

export default function NavbarButtons() {
  const [user, setUser] = useState<string | null>(null);

  return (
    <div className="flex items-center">
      {user ? (
        <>
          <Button variant="ghost" className="h-10 w-10">
            <MessageCircleMore width={25} height={25} strokeWidth={1.2} />
          </Button>
          <Button variant="ghost" className="h-10 w-10 sm:w-fit">
            <Plus width={25} height={25} strokeWidth={1.2} />
            <span className="hidden md:block ">Create</span>
          </Button>
          <Button variant="ghost" className="h-10 w-10 ">
            <Bell width={22} height={22} strokeWidth={1.2} />
          </Button>
          <ProfileButton />
        </>
      ) : (
        <>
          <Link href="/login">
            <Button className="bg-main text-white hover:bg-opacity-80 h-10 hover:bg-main font-semibold mr-2">
              Log In
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger className="h-10 w-10 inline-block p-2 hover:bg-gray-100 rounded-full">
              <Ellipsis strokeWidth={1.5} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-48 bg-white shadow-lg px-0 border rounded-md p-2 text-gray-800">
              <DropdownMenuItem className="rounded-none">
                <Link
                  href="/login"
                  className="flex items-center gap-2 w-full h-full py-2">
                  <LogIn height={30} width={30} /> Log In / Sign Up
                </Link>
              </DropdownMenuItem>
              <DarkModeSwitch />
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
}
