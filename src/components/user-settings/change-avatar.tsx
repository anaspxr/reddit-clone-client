"use client";

import React, { useRef } from "react";
import { SettingsChildProps } from "./settings-item-container";
import { Button } from "../ui/button";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import Image from "next/image";
import { CloudUpload } from "lucide-react";
import Link from "next/link";
import { updateUserAvatar } from "@/lib/store/async-thunks/user-thunks";

export default function ChangeAvatar({ setOpen }: SettingsChildProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const { userProfile } = useAppSelector((state) => state.user);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const dispatch = useAppDispatch();

  const handleSave = () => {
    if (!selectedImage) return;
    toast({ title: "Updating Profile Picture..", duration: 2000 });
    dispatch(updateUserAvatar(selectedImage));
    setOpen(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 2024 * 2) {
      setError("Image size should be less than 2MB");
      return;
    }
    setSelectedImage(file);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 justify-center w-full">
        <div className=" flex flex-col items-center justify-center gap-2  ">
          <Link href={"/settings/avatar"}>
            <div className="rounded-xl flex items-center justify-center border w-36 h-32 ">
              <div className="rounded-full border w-20 h-20 flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/snoovatar-blank.png"
                  alt="Avatar"
                  height={50}
                  width={50}
                />
              </div>
            </div>
          </Link>
          <Link href={"/settings/avatar"}>
            <Button variant="secondary" size="sm">
              Select Avatar
            </Button>
          </Link>
        </div>
        <div className=" flex flex-col items-center justify-center gap-2  ">
          <div className="group rounded-xl flex items-center justify-center border border-dashed w-36 h-32 cursor-pointer relative">
            <input
              ref={inputRef}
              id="avatar"
              name="avatar"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              className="absolute z-10 opacity-0 w-full h-full cursor-pointer file:cursor-pointer"
              onChange={handleFileSelect}
            />
            <div className="relative">
              <div className="rounded-full border w-20 h-20 flex items-center justify-center overflow-hidden">
                <Image
                  src={
                    selectedImage
                      ? URL.createObjectURL(selectedImage)
                      : userProfile?.avatar || "/images/avatar-default.png"
                  }
                  alt="Avatar"
                  className="object-cover w-full h-full"
                  height={70}
                  width={70}
                />
                <CloudUpload
                  className="absolute right-0 -bottom-2 bg-secondary rounded-full p-1 group-hover:bg-gray-400 dark:group-hover:bg-gray-600 transition-colors duration-200"
                  size={30}
                  strokeWidth={1.2}
                />
              </div>
            </div>
          </div>
          <Button
            onClick={() => {
              inputRef.current?.click();
            }}
            variant="secondary"
            size="sm">
            Select new image
          </Button>
        </div>
        {error && (
          <p className="text-red-500 text-xs mt-2 text-center col-start-2">
            {error}
          </p>
        )}
        <p className="text-xs text-gray-400 dark:text-gray-600">
          Formats: JPG, JPEG, PNG
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-600 ">
          Max size: 2MB
        </p>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button disabled={!selectedImage} onClick={() => handleSave()}>
          Save changes
        </Button>
      </DialogFooter>
    </>
  );
}
