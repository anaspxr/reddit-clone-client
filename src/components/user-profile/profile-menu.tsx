"use client";

import { useAppSelector } from "@/lib/store";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const publicNavItems = [
  { label: "Overview", to: "" },
  { label: "Posts", to: "posts" },
  { label: "Comments", to: "comments" },
];

const privateNavItems = [
  { label: "Saved", to: "saved" },
  { label: "Hidden", to: "hidden" },
  { label: "Upvoted", to: "upvoted" },
  { label: "Downvoted", to: "downvoted" },
];

export default function ProfileMenu({ username }: { username: string }) {
  const { user } = useAppSelector((state) => state.user);
  const isOwnProfile = user?.username === username;
  const currentPath = usePathname().split("/").at(-1);

  return (
    <div
      className="flex overflow-x-auto"
      style={{
        scrollbarWidth: "none",
      }}>
      {publicNavItems.map((item, i) => (
        <Link key={i} href={`/u/${username}/${item.to}`}>
          <Button
            variant="link"
            className={clsx({
              "bg-gray-200 dark:bg-gray-800":
                currentPath === item.to ||
                (item.label === "Overview" && currentPath === username),
            })}>
            {item.label}
          </Button>
        </Link>
      ))}
      {isOwnProfile &&
        privateNavItems.map((item, i) => (
          <Link key={i} href={`/u/${username}/${item.to}`}>
            <Button variant="link">{item.label}</Button>
          </Link>
        ))}
    </div>
  );
}
