"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

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
      className={`scrollbar-thin z-10 h-full overflow-y-auto w-[280px] border-r px-4 md:static fixed bg-white dark:bg-gray-950 ${
        !isSidebarOpen && "hidden md:block"
      }`}>
      <h2 className="text-2xl font-semibold">Chats</h2>
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
