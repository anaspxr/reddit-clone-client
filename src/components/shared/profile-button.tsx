"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";
import DarkModeSwitch from "./dark-mode-switch";
import { LogOut, Settings } from "lucide-react";
import { useAppDispatch } from "@/lib/store";
import { logoutUser } from "@/lib/store/async-thunks/user-thunks";

export default function ProfileButton() {
  const dispatch = useAppDispatch();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        title="Open profile menu"
        className="h-10 ml-2 w-10 p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
        <Image
          src="/avatar-default.png"
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" sideOffset={8} className="w-60 px-0">
        <DropdownMenuItem>
          <Link href={`/user/${1}`} className="w-full h-full">
            <div className="flex items-center gap-4 p-2">
              <Image
                src="/avatar-default.png"
                alt="Profile"
                width={35}
                height={35}
                className="rounded-full"
              />
              <div className="flex flex-col">
                <span className="text-sm">View Profile</span>
                <span className="text-gray-500 text-xs">u/johndoe</span>
              </div>
            </div>
          </Link>
        </DropdownMenuItem>
        <div className="px-2">
          <DarkModeSwitch />
        </div>
        <DropdownMenuItem
          className="px-5 py-4 rounded-none cursor-pointer"
          onClick={() => {
            dispatch(logoutUser());
          }}>
          <LogOut /> Log Out
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="px-5 py-4 rounded-none">
          <Settings /> Settings
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
