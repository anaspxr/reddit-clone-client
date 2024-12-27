"use client";

import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import PostCard from "../post/post-card";
import { Post } from "@/lib/types/postTypes";

export default function CommunityPosts() {
  const { communityName }: { communityName: string } = useParams();
  const { data } = useQuery({
    queryKey: ["community_posts", { communityName: communityName }],
    queryFn: async () => {
      const { data } = await axios.get(
        `/public/community/${communityName}/posts`,
        {
          withCredentials: true,
        }
      );
      return data.data;
    },
  });

  return (
    <div className="flex flex-col gap-4 p-2">
      {data?.map((post: Post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
