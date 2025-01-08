"use client";

import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../post/post-card";
import { Post } from "@/lib/types/postTypes";
import { useParams } from "next/navigation";
import PostCardSkeleton from "../skeletons/post-skeleton";

export default function UserPosts() {
  const { username }: { username: string } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["posts", { username: username }],
    queryFn: async () => {
      const { data } = await axios.get(`/public/user/${username}/posts`, {
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
        </>
      )}
      {data?.map((post: Post) => (
        <PostCard
          queryKey={["posts", { username: username }]}
          key={post._id}
          post={post}
        />
      ))}
      {!isLoading && data?.length === 0 && (
        <p className="text-muted-foreground">
          {username} hasn&apos;t posted anything yet
        </p>
      )}
    </div>
  );
}
