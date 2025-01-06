"use client";

import React from "react";
import Image from "next/image";
import { CloudUpload } from "lucide-react";
import { SettingsChildProps } from "@/components/user-settings/settings-item-container";
import { DialogFooter } from "@/components/ui/dialog";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import axios, { axiosErrorCatch } from "@/lib/axios";

export default function ChangeCommunityBanner({ setOpen }: SettingsChildProps) {
  const { communityName } = useParams();
  const queryClient = useQueryClient();
  const currentBanner = (
    queryClient.getQueryData(["community", communityName]) as { banner: string }
  )?.banner;
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState<string | null>(null);
  const [selectedImage, setSelectedImage] = React.useState<File | null>(null);

  const handleSave = async () => {
    if (!selectedImage) return;
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      await axios.put(`/community/${communityName}/banner`, formData, {
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

  const imageUrl = selectedImage
    ? URL.createObjectURL(selectedImage)
    : currentBanner;

  return (
    <>
      <div className=" flex flex-col items-center justify-center gap-2">
        <div className="group rounded-xl flex items-center justify-center border border-dashed w-full h-24 cursor-pointer relative">
          <input
            id="avatar"
            name="avatar"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            className="absolute z-10 opacity-0 w-full h-full cursor-pointer file:cursor-pointer"
            onChange={handleFileSelect}
          />
          <div className="w-full h-full flex items-center justify-center overflow-hidden">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="Avatar"
                className="object-cover w-full"
                height={500}
                width={1500}
              />
            )}
          </div>
          <CloudUpload
            className="absolute -right-2 -bottom-2 bg-secondary rounded-full p-1 group-hover:bg-gray-400 dark:group-hover:bg-gray-600 transition-colors duration-200"
            size={30}
            strokeWidth={1.2}
          />
        </div>
      </div>
      <div className="flex justify-between gap-2 flex-wrap">
        <p className="text-xs text-gray-400 dark:text-gray-600">
          Formats: JPG, JPEG, PNG
        </p>
        <p className="text-xs text-gray-400 dark:text-gray-600 text-end">
          Max size: 2MB
        </p>
      </div>

      {error && (
        <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
      )}
      <DialogFooter>
        <DialogClose asChild>
          <Button variant="ghost">Cancel</Button>
        </DialogClose>
        <Button disabled={!selectedImage} onClick={() => handleSave()}>
          {loading ? "Saving.." : "Update"}
        </Button>
      </DialogFooter>
    </>
  );
}
