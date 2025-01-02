"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import SearchUsers from "./search-users";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import Avatar from "../ui/avatar";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { setPeople } from "@/lib/store/slices/chatSlice";

export const ChatSidebarStateContext = createContext<{
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isSidebarOpen: false, setIsSidebarOpen: () => {} });

export const ChatSidebarStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <ChatSidebarStateContext.Provider
      value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </ChatSidebarStateContext.Provider>
  );
};

export default function ChatSideBar() {
  const { isSidebarOpen, setIsSidebarOpen } = useContext(
    ChatSidebarStateContext
  );
  const dispatch = useAppDispatch();

  useQuery({
    queryKey: ["people"],
    queryFn: async () => {
      const { data } = await axios.get("/chat/people", {
        withCredentials: true,
      });
      dispatch(setPeople(data.data));
      return data.data;
    },
  });

  const { people } = useAppSelector((state) => state.chat);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isSidebarOpen &&
        e.target instanceof HTMLElement &&
        !e.target.closest("#chatSidebar")
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isSidebarOpen, setIsSidebarOpen]);

  return (
    <div
      id="chatSidebar"
      className={`scrollbar-thin z-10 h-full space-y-2 py-2 flex-shrink-0 overflow-y-auto w-[250px] border-r px-4 md:static fixed bg-white dark:bg-gray-950 ${
        !isSidebarOpen && "hidden md:block"
      }`}>
      <h2 className="text-2xl font-semibold">Chats</h2>
      <SearchUsers />
      <div className="mt-4 flex flex-col gap-4">
        {people.map((person) => (
          <Link key={person.username} href={`/chat?u=${person.username}`}>
            <div className="flex items-center space-x-2 hover:bg-secondary p-2 rounded-lg">
              <Avatar src={person.avatar} className="w-10 h-10" />
              <div>
                <p className="font-semibold">{person.displayName}</p>
                <p className="text-xs text-muted-foreground">
                  u/{person.username}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function ChatSidebarTrigger() {
  const { setIsSidebarOpen } = useContext(ChatSidebarStateContext);
  return (
    <Button
      onClick={() => setIsSidebarOpen((prev) => !prev)}
      variant="ghost"
      className="h-10 w-10 md:hidden">
      <Menu width={25} height={25} strokeWidth={1.2} />
    </Button>
  );
}
