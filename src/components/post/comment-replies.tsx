import React from "react";
import Spinner from "../ui/spinner";
import CommentCard from "./comment-card";
import { useQuery } from "@tanstack/react-query";
import { Comment } from "@/lib/types/postTypes";
import axios from "@/lib/axios";

export default function CommentReplies({
  commentId,
  postId,
  op,
}: {
  commentId: string;
  op?: string;
  postId: string;
}) {
  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ["replies", { id: commentId }],
    queryFn: async () => {
      const { data } = await axios.get(`/public/replies/${commentId}`, {
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
            postId={postId}
            queryKey={["comments", { id: postId }]}
            op={op}
            key={comment._id}
            comment={comment}
          />
        ))
      )}
    </div>
  );
}
