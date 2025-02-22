"use client";

import axios from "@/lib/axios";
import { Post } from "@/lib/types/postTypes";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import PostCard from "../post/post-card";
import PostCardSkeleton from "../skeletons/post-skeleton";
import { useSearchParams } from "next/navigation";

export default function PopularFeed() {
  const sort = useSearchParams().get("sort") || "week";
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ["popular_feed", { sort }],
    queryFn: async () => {
      const { data } = await axios.get(`/public/feed?sort=${sort}`, {
        withCredentials: true,
      });
      return data.data;
    },
  });

  return (
    <div className="flex flex-col gap-4 p-2">
      {isLoading && (
        <>
          <PostCardSkeleton />
          <PostCardSkeleton />
          <PostCardSkeleton />
        </>
      )}
      {data?.map((post) => (
        <PostCard queryKey={["popular_feed"]} key={post._id} post={post} />
      ))}
    </div>
  );
}
