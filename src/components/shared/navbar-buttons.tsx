"use client";

import { Ellipsis, LogIn, MessageCircleMore } from "lucide-react";
import { Button } from "../ui/button";
import ProfileButton from "./profile-button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import DarkModeSwitch from "./dark-mode-switch";
import Link from "next/link";
import { useAppSelector } from "@/lib/store";
import CreateButton from "./create-button";
import NotificationIcon from "../notification/notification-icon";

export default function NavbarButtons() {
  const { user } = useAppSelector((state) => state.user);

  return (
    <div className="flex items-center">
      {user ? (
        <>
          <Link href="/chat">
            <Button variant="ghost" className="h-10 w-10">
              <MessageCircleMore width={25} height={25} strokeWidth={1.2} />
            </Button>
          </Link>
          <CreateButton />
          <NotificationIcon />
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
            <DropdownMenuTrigger className="h-10 w-10 inline-block p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
              <Ellipsis strokeWidth={1.5} />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              sideOffset={8}
              className="w-48 shadow-lg px-0 border rounded-md p-2">
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
