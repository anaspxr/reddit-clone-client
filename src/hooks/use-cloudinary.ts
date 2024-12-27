import { axiosErrorCatch } from "@/lib/axios";
import axios from "axios";
import { useState } from "react";

const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`;

const getUploadPreset = (type: string) => {
  switch (type) {
    case "image":
      return process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_UPLOAD_PRESET;
    case "video":
      return process.env.NEXT_PUBLIC_CLOUDINARY_VIDEO_UPLOAD_PRESET;
    default:
      return process.env.NEXT_PUBLIC_CLOUDINARY_IMAGE_UPLOAD_PRESET;
  }
};

export default function useCloudinary() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadMedia = async (files: File[], type: string) => {
    setLoading(true);
    setError("");

    const publicIds = [];
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", getUploadPreset(type) || "");
        const { data } = await axios.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        publicIds.push(data.public_id);
      }
      return publicIds;
    } catch (error) {
      setError("Failed to upload media" + axiosErrorCatch(error));
    } finally {
      setLoading(false);
    }
  };

  return { uploadMedia, loading, error };
}
