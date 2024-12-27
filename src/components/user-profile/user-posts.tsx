"use client";

import axios from "@/lib/axios";
import { useAppSelector } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import PostCard from "../post/post-card";
import { Post } from "@/lib/types/postTypes";

export default function UserPosts() {
  const { user } = useAppSelector((state) => state.user);
  const { data } = useQuery({
    queryKey: ["posts", { username: user?.username }],
    queryFn: async () => {
      const { data } = await axios.get(`/public/user/${user?.username}/posts`, {
        withCredentials: true,
      });
      return data.data;
    },
    retry: 1,
    refetchInterval: 2 * 60 * 1000, // 2 minute
  });

  console.log(data);

  return (
    <div className="flex flex-col gap-4 p-2">
      {data?.map((post: Post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
