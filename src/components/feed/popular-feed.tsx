"use client";

import axios from "@/lib/axios";
import { Post } from "@/lib/types/postTypes";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostCard from "../post/post-card";

export default function PopularFeed() {
  const { data } = useQuery<Post[]>({
    queryKey: ["popular_feed"],
    queryFn: async () => {
      const { data } = await axios.get("/public/feed?type=popular");
      return data.data;
    },
  });

  return (
    <div className="flex flex-col gap-4 p-2">
      {data?.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
