import { Post } from "@/lib/types/postTypes";
import React from "react";
import PostCard from "../post/post-card";

export default function PostResults({ posts }: { posts: Post[] }) {
  return (
    <div className="flex flex-col gap-4 p-2">
      {posts?.map((post: Post) => (
        <PostCard
          queryKey={["posts", { username: post.creator.username }] as const}
          key={post._id}
          post={post}
        />
      ))}
    </div>
  );
}
