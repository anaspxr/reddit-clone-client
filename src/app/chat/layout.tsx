import ChatSideBar, {
  ChatSidebarStateProvider,
  ChatSidebarTrigger,
} from "@/components/chat/chat-sidebar";
import ProfileButton from "@/components/shared/profile-button";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const metadata: Metadata = {
  title: "Reddit Chat",
  description: "Chat with other redditors!!",
};

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full">
      <ChatSidebarStateProvider>
        <div className="px-4 py-2 flex justify-between border-b gap-2 bg-white dark:bg-gray-950">
          <div className="flex gap-2 items-center flex-shrink-0">
            <ChatSidebarTrigger />
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/reddit-logo.svg"
                alt="Reddit Logo"
                width={35}
                height={35}
              />
              <span className="hidden md:block text-main text-3xl font-semibold tracking-tighter">
                reddit
              </span>
            </Link>
          </div>
          <ProfileButton />
        </div>
        <div className="flex h-[calc(100vh-57px)] overflow-hidden">
          <ChatSideBar />
          <div className="w-full overflow-y-auto px-2 sm:px-8 py-4 ">
            {children}
          </div>
        </div>
      </ChatSidebarStateProvider>
    </div>
  );
}
