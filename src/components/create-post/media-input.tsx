import useCloudinary from "@/hooks/use-cloudinary";
import { getFileErrorMessage } from "@/lib/utils";
import clsx from "clsx";
import { UploadCloud } from "lucide-react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { PostFormValues } from "./post-form";

export default function MediaInput({
  setValues,
  media,
}: {
  setValues: React.Dispatch<React.SetStateAction<PostFormValues>>;
  media: string[];
}) {
  const { uploadMedia, error, loading } = useCloudinary();
  const [mediaError, setMediaError] = useState("");
  const { getRootProps, getInputProps, isDragAccept, fileRejections } =
    useDropzone({
      accept: {
        "image/*": [".png", ".jpeg", ".jpg", ".gif"],
        "video/*": [".mp4"],
      },
      maxFiles: 4,

      onDrop: async (files) => {
        const images = files.filter((file) => file.type.startsWith("image/"));
        const videos = files.filter((file) => file.type.startsWith("video/"));

        if (images.length > 0 && videos.length > 0) {
          setMediaError("Cannot upload images and videos together!");
          return;
        }
        if (images.length) {
          const publicUrls = await uploadMedia(images, "image");
          if (publicUrls)
            setValues((prev) => ({ ...prev, images: publicUrls }));
        }
        if (videos.length) {
          const publicUrls = await uploadMedia(videos, "video");
          if (publicUrls)
            setValues((prev) => ({ ...prev, video: publicUrls[0] }));
        }
      },
    });

  return (
    <div>
      <div
        {...getRootProps()}
        className={clsx(
          "group relative border border-dashed h-32 rounded-3xl cursor-pointer",
          {
            "border-blue-500 bg-secondary": isDragAccept,
          }
        )}>
        <input {...getInputProps()} />
        <p className="text-center pt-12 text-muted-foreground text-sm flex items-center justify-center gap-2">
          {loading ? (
            "Uploading..."
          ) : (
            <>
              {media.length === 0
                ? "Drag and Drop or upload media"
                : `${media.length} files Uploaded`}
              <UploadCloud
                className="bg-secondary rounded-full p-1 group-hover:bg-gray-300 dark:group-hover:bg-gray-700"
                size={30}
                strokeWidth={1.2}
              />
            </>
          )}
        </p>
      </div>
      <p className="text-sm text-muted-foreground mt-4 px-2">
        Max 4 images or 1 video
      </p>
      {fileRejections.length > 0 && (
        <p className="text-red-500 text-sm px-2">
          {getFileErrorMessage(fileRejections[0].errors[0])}
        </p>
      )}
      {error && <p className="text-red-500 text-sm px-2">{error}</p>}
      {mediaError && <p className="text-red-500 text-sm px-2">{mediaError}</p>}
    </div>
  );
}
