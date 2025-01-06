"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { CloudUpload } from "lucide-react";
import { SettingsChildProps } from "@/components/user-settings/settings-item-container";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios, { axiosErrorCatch } from "@/lib/axios";

export default function ChangeIcon({ setOpen }: SettingsChildProps) {
  const { communityName } = useParams();
  const queryClient = useQueryClient();
  const currentIcon = (
    queryClient.getQueryData(["community", communityName]) as { icon: string }
  )?.icon;

  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);
  const [loading, setLoading] = React.useState(false);

  const handleSave = async () => {
    if (!selectedImage) return;
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      await axios.put(`/community/${communityName}/icon`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      queryClient.refetchQueries({ queryKey: ["community", communityName] });

      setOpen(false);
    } catch (error) {
      setError(axiosErrorCatch(error));
    } finally {
      setLoading(false);
    }
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
                    : currentIcon || "/images/community-icon.png"
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
      <p className="text-xs text-gray-400 dark:text-gray-600">
        Formats: JPG, JPEG, PNG
      </p>
      <p className="text-xs text-gray-400 dark:text-gray-600 ">Max size: 2MB</p>

      {error && (
        <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
      )}
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button disabled={!selectedImage || loading} onClick={handleSave}>
          {loading ? "Saving.." : "Update"}
        </Button>
      </DialogFooter>
    </>
  );
}
