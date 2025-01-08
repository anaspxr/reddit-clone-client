"use client";

import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import PostCard from "../post/post-card";
import { Post } from "@/lib/types/postTypes";
import ErrorPage from "../ui/error-page";
import { isAxiosError } from "axios";
import PostCardSkeleton from "../skeletons/post-skeleton";

export default function CommunityPosts({
  isCommunityAdmin,
}: {
  isCommunityAdmin: boolean;
}) {
  const { communityName }: { communityName: string } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["community_posts", { communityName: communityName }],
    queryFn: async () => {
      try {
        const { data } = await axios.get(
          `/public/community/${communityName}/posts`,
          {
            withCredentials: true,
          }
        );
        return data.data;
      } catch (error) {
        if (isAxiosError(error)) {
          throw new Error(
            error?.response?.data.data ||
              error?.response?.data.message ||
              error.message
          );
        } else if (error instanceof Error) {
          throw new Error(error.message || "An unknown error occurred");
        } else {
          throw new Error("An unknown error occurred");
        }
      }
    },
    retry(failureCount, error) {
      // If the error is PRIVATE_COMMUNITY, don't retry
      if (
        isAxiosError(error) &&
        error.response?.data.data === "PRIVATE_COMMUNITY"
      )
        return false;
      return failureCount < 3;
    },
  });

  return isLoading ? (
    <div className="flex flex-col gap-4 p-2">
      <PostCardSkeleton />
      <PostCardSkeleton />
    </div>
  ) : error ? (
    <ErrorPage
      title={
        error.message === "PRIVATE_COMMUNITY"
          ? "This is a private community!"
          : error.message
      }
      description={
        error.message === "PRIVATE_COMMUNITY"
          ? "You need to join this community to view its posts."
          : ""
      }
    />
  ) : (
    <div className="flex flex-col gap-4 p-2">
      {data?.length === 0 && (
        <div className="text-center text-lg text-gray-500">No posts yet</div>
      )}

      {data?.map((post: Post) => (
        <PostCard
          isCommunityAdmin={isCommunityAdmin}
          queryKey={["community_posts", { communityName: communityName }]}
          key={post._id}
          post={post}
        />
      ))}
    </div>
  );
}
