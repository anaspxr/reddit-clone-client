"use client";

import {
  ChartNoAxesCombined,
  GlobeLock,
  Handshake,
  Home,
  Menu,
  ScrollText,
  Telescope,
} from "lucide-react";
import React, { createContext, useContext, useEffect } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Disclaimer from "./disclaimer";
import SidebarCommunities from "./sidebar-communities";

export const SidebarStateContext = createContext<{
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isSidebarOpen: false, setIsSidebarOpen: () => {} });

export const SidebarStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  return (
    <SidebarStateContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      {children}
    </SidebarStateContext.Provider>
  );
};

const mainNavItems = [
  { label: "Home", to: "/", icon: Home },
  { label: "Popular", to: "/popular", icon: ChartNoAxesCombined },
  { label: "Explore", to: "/explore", icon: Telescope },
  // { label: "All", to: "/all", icon: ChartNoAxesColumnIncreasing },
];

const policyNavItems = [
  { label: "Content Policy", to: "/policies/content-policy", icon: ScrollText },
  {
    label: "Privacy Policy",
    to: "/policies/privacy-policies",
    icon: GlobeLock,
  },
  { label: "User Agreement", to: "/policies/user-agreement", icon: Handshake },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarStateContext);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isSidebarOpen &&
        e.target instanceof HTMLElement &&
        !e.target.closest("#sidebar")
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
      id="sidebar"
      className={`scrollbar-thin z-10 h-full overflow-y-auto w-[280px] border-r px-4 lg:static fixed bg-white dark:bg-gray-950 ${
        !isSidebarOpen && "hidden lg:block"
      }`}>
      <div className="border-b flex flex-col gap-2 items-center py-4">
        {mainNavItems.map((item, i) => (
          <Link key={i} href={item.to} className="w-full">
            <Button
              variant="ghost"
              rounded="md"
              className={clsx("w-full justify-start h-10", {
                "bg-secondary": pathname === item.to,
              })}>
              <item.icon strokeWidth={1.2} />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>

      <SidebarCommunities />

      <div className="border-b flex flex-col gap-2 items-center py-4">
        {policyNavItems.map((item, i) => (
          <Link key={i} href={item.to} className="w-full">
            <Button
              variant="ghost"
              rounded="md"
              className={clsx("w-full justify-start h-10", {
                "bg-secondary": pathname === item.to,
              })}>
              <item.icon strokeWidth={1.2} />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>

      <Disclaimer />
    </div>
  );
}

export function SidebarTrigger() {
  const { setIsSidebarOpen } = useContext(SidebarStateContext);
  return (
    <Button
      onClick={() => setIsSidebarOpen((prev) => !prev)}
      variant="ghost"
      className="h-10 w-10 lg:hidden">
      <Menu width={25} height={25} strokeWidth={1.2} />
    </Button>
  );
}
