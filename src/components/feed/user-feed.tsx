"use client";

import axios from "@/lib/axios";
import { useAppSelector } from "@/lib/store";
import { Post } from "@/lib/types/postTypes";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostCard from "../post/post-card";

export default function UserFeed() {
  const { user } = useAppSelector((state) => state.user);

  const { data } = useQuery<Post[]>({
    queryKey: ["home_feed", { user }],
    queryFn: async () => {
      const { data } = await axios.get("/public/feed", {
        withCredentials: true,
      });
      return data.data;
    },
  });

  if (!user) return null;

  return (
    <div className="flex flex-col gap-4 p-2">
      {data?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
