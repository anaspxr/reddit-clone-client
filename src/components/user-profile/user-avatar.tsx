"use client";

import { UserProfile } from "@/lib/types/userTypes";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import ChangeAvatar from "../user-settings/change-avatar";
import { Button } from "../ui/button";
import Link from "next/link";

export default function UserAvatar({
  avatar,
  username,
  displayName,
  isOwnProfile,
}: UserProfile & { isOwnProfile: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return isOwnProfile ? (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex gap-4 items-center">
          <div className="rounded-full cursor-pointer overflow-hidden w-20 h-20">
            <Image
              className="object-cover w-full h-full"
              src={avatar || "/images/avatar-default.png"}
              alt=""
              height={70}
              width={70}
            />
          </div>
          <div>
            <p className="font-semibold text-2xl">{displayName}</p>
            <p className="text-gray-600 dark:text-gray-400">u/{username}</p>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Avatar Image</DialogTitle>
          <DialogDescription>
            Change your avatar or upload an image
          </DialogDescription>
        </DialogHeader>
        <Link href="/settings">
          <Button variant="secondary" size="sm">
            Other Settings
          </Button>
        </Link>
        <ChangeAvatar setOpen={setIsOpen} />
      </DialogContent>
    </Dialog>
  ) : (
    <div className="flex gap-4 items-center">
      <div className="rounded-full  overflow-hidden w-20 h-20">
        <Image
          className="object-cover w-full h-full"
          src={avatar || "/images/avatar-default.png"}
          alt=""
          height={70}
          width={70}
        />
      </div>
      <div>
        <p className="font-semibold text-2xl">{displayName}</p>
        <p className="text-gray-600 dark:text-gray-400">u/{username}</p>
      </div>
    </div>
  );
}
