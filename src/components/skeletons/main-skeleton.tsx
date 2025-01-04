import React from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "./skeleton";
import SideBarSkeleton from "./sidebar-skeleton";

export default function MainSkeleton() {
  return (
    <div className="h-full">
      <div className="px-4 py-2 flex justify-between border-b gap-2 bg-white dark:bg-gray-950">
        <div className="flex gap-2 items-center flex-shrink-0">
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
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-20 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      </div>
      <SideBarSkeleton />
    </div>
  );
}
