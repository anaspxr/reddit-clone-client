"use client";

import React, { useState } from "react";
import MaxLengthInput from "../ui/max-length-input";
import { postTitleSchema } from "@/lib/form-validation/post";
import { cn } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import MaxLengthTextarea from "../ui/max-length-textarea";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { useAppSelector } from "@/lib/store";
import MediaInput from "./media-input";

export type PostFormValues = {
  title: string;
  body: string;
  images: string[];
  video: string;
  link: string;
};

export default function PostForm() {
  const [values, setValues] = useState<PostFormValues>({
    title: "",
    body: "",
    images: [],
    video: "",
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
      case "text": {
        const post = { title: values.title, body: values.body, community };
        return axios.post("/post/text", post, {
          withCredentials: true,
        });
      }
      case "media": {
        const post = {
          title: values.title,
          images: values.images,
          video: values.video,
          community,
        };
        return axios.post("/post/media", post, {
          withCredentials: true,
        });
      }
      case "link": {
        const post = { title: values.title, link: values.link, community };
        return axios.post("/post/link", post, {
          withCredentials: true,
        });
      }
      default:
        const post = { title: values.title, body: values.body, community };
        return axios.post("/post/text", post, {
          withCredentials: true,
        });
    }
  };

  const handlePost = async () => {
    if (titleError) return;
    setLoading(true);
    setError("");

    try {
      const {} = await createPost();
      if (community) router.push(`/r/${community}`);
      else router.push(`/u/${user?.username}/posts`);
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
        {type === "media" && (
          <MediaInput
            media={values.video ? [values.video] : values.images}
            setValues={setValues}
          />
        )}
        {type === "link" && <LinkInput />}
      </div>
      <div className="flex justify-end gap-2 items-center">
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {loading && (
          <p className="text-blue-500 text-sm text-end  ">Uploading..</p>
        )}
        {/* <Button
          disabled={loading || !!titleError || !values.title}
          className="bg-blue-700 hover:bg-blue-600 text-white">
          Save Draft
        </Button> */}
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
