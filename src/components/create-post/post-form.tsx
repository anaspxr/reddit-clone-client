"use client";

import React, { useState } from "react";
import MaxLengthInput from "../ui/max-length-input";
import { postTitleSchema } from "@/lib/form-validation/post";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import MaxLengthTextarea from "../ui/max-length-textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { UploadCloud } from "lucide-react";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { useAppSelector } from "@/lib/store";

type PostFormValues = {
  title: string;
  body: string;
  media: File[];
  link: string;
};

export default function PostForm() {
  const [values, setValues] = useState<PostFormValues>({
    title: "",
    body: "",
    media: [],
    link: "",
  });
  const [titleError, setTitleError] = useState("");
  const [blurred, setBlurred] = useState(false);
  const type = useSearchParams().get("type") || "text";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const community = useSearchParams().get("community");
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { error: valError } = postTitleSchema.safeParse(e.target.value);
    if (valError) {
      setTitleError(valError.errors[0].message);
    } else {
      setTitleError("");
    }
    setValues((prev) => ({ ...prev, title: e.target.value }));
  };

  const createPost = () => {
    // create post according to the type
    switch (type) {
      case "text":
        return { title: values.title, body: values.body, community };
      case "media":
        const formData = new FormData();
        formData.append("title", values.title);
        for (const file of values.media) {
          formData.append("media", file);
        }
        if (community) formData.append("community", community);
        return formData;
      case "link":
        return { title: values.title, link: values.link, community };
    }
  };

  const handlePost = async () => {
    if (titleError) return;
    setLoading(true);
    setError("");
    const post = createPost();
    try {
      const { data } = await axios.post("/post/text", post, {
        withCredentials: true,
      });
      if (community) router.push(`/r/${community}/${data.data._id}`);
      else router.push(`/u/${user?.username}/post/${data.data._id}`);
    } catch (error) {
      setError(axiosErrorCatch(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-xl">
      <div className="space-y-2 ">
        <MaxLengthInput
          autoFocus
          style={{ fontSize: "1rem" }}
          className={cn(titleError && blurred ? "border-red-500" : "", "h-12")}
          placeholder="Title"
          maxLength={300}
          value={values.title}
          onBlur={() => setBlurred(true)}
          onChange={handleTitleChange}
        />
        {titleError && blurred && (
          <p className="text-red-500 text-sm px-4">{titleError}</p>
        )}
      </div>
      <div>
        {type === "text" && <BodyInput values={values} setValues={setValues} />}
        {type === "media" && <MediaInput />}
        {type === "link" && <LinkInput />}
      </div>
      <div className="flex justify-end gap-2 items-center">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {loading && (
          <p className="text-blue-500 text-sm text-end  ">Uploading..</p>
        )}
        <Button
          disabled={loading || !!titleError || !values.title}
          className="bg-blue-700 hover:bg-blue-600 text-white">
          Save Draft
        </Button>
        <Button
          onClick={handlePost}
          disabled={loading || !!titleError || !values.title}
          className="bg-blue-700 hover:bg-blue-600 text-white">
          Post
        </Button>
      </div>
    </div>
  );
}

function BodyInput({
  values,
  setValues,
}: {
  values: { body: string };
  setValues: React.Dispatch<React.SetStateAction<PostFormValues>>;
}) {
  return (
    <MaxLengthTextarea
      maxLength={5000}
      className="w-full h-32 p-4 "
      placeholder="Body"
      value={values.body}
      onChange={(e) => setValues((prev) => ({ ...prev, body: e.target.value }))}
    />
  );
}

function LinkInput() {
  return <Input className="h-16" placeholder="Link URL" />;
}

function MediaInput() {
  return (
    <div className="group relative border border-dashed h-32 rounded-3xl cursor-pointer">
      <p className="text-center pt-12 text-muted-foreground text-sm flex items-center justify-center gap-2">
        Drag and Drop or upload media
        <UploadCloud
          className="bg-secondary rounded-full p-1 group-hover:bg-gray-300 dark:group-hover:bg-gray-700"
          size={30}
          strokeWidth={1.2}
        />
      </p>
      <Input
        className="absolute top-0 opacity-0 cursor-pointer w-full h-full"
        type="file"
      />
    </div>
  );
}
