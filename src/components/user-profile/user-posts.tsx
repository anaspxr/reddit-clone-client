"use client";

import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../post/post-card";
import { Post } from "@/lib/types/postTypes";
import { useParams } from "next/navigation";

export default function UserPosts() {
  const { username }: { username: string } = useParams();
  const { data } = useQuery({
    queryKey: ["posts", { username: username }],
    queryFn: async () => {
      const { data } = await axios.get(`/public/user/${username}/posts`, {
        withCredentials: true,
      });
      return data.data;
    },
    retry: 1,
  });

  return (
    <div className="flex flex-col gap-4 p-2">
      {data?.map((post: Post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
