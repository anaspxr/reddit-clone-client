"use client";

import axios from "@/lib/axios";
import { Comment } from "@/lib/types/postTypes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import Spinner from "../ui/spinner";
import CommentCard from "../post/comment-card";

export default function UserComments() {
  const { username }: { username: string } = useParams();
  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ["user-comments", username],
    queryFn: async () => {
      const { data } = await axios.get(`public/user/${username}/comments`, {
        withCredentials: true,
      });
      return data.data;
    },
  });

  return (
    <div>
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner />
        </div>
      ) : (
        comments &&
        comments.map((comment) => (
          <CommentCard
            queryKey={["user-comments", username]}
            key={comment._id}
            comment={comment}
          />
        ))
      )}
    </div>
  );
}
