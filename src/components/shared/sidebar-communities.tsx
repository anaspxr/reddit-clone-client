"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getUserCommunities } from "@/lib/store/async-thunks/user-thunks";

export default function SidebarCommunities() {
  const [open, setOpen] = useState(false);
  const { communities } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserCommunities());
  }, [dispatch]);

  return (
    <div className="border-b py-4">
      <Button
        variant="ghost"
        onClick={() => setOpen(!open)}
        rounded="md"
        className="w-full justify-between text-muted-foreground mb-2">
        Communities
        <ChevronDown
          className={`${
            open && "rotate-180"
          } transition-transform duration-300`}
        />
      </Button>
      {open && (
        <div className="flex flex-col gap-1">
          <Link href="/create/community">
            <Button
              variant="ghost"
              rounded="md"
              className="w-full justify-start h-10">
              <Plus strokeWidth={1.2} /> Create Community
            </Button>
          </Link>
          {communities.map((item) => (
            <Link key={item.name} href={`/r/${item.name}`}>
              <Button
                key={item.name}
                variant="ghost"
                rounded="md"
                className="w-full justify-start h-10">
                <div className="flex items-center overflow-hidden rounded-full w-8 h-8 ">
                  <Image
                    src={item.icon || "/images/community-icon.png"}
                    alt="icon"
                    width={50}
                    height={50}
                    className="object-cover w-full h-full"
                  />
                </div>
                r/{item.name}
              </Button>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
