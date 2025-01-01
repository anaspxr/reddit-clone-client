import React from "react";
import CommentInput from "./comment-input";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Comment } from "@/lib/types/postTypes";
import Spinner from "../ui/spinner";
import CommentCard from "./comment-card";

export default function PostComments({
  postId,
  op,
}: {
  postId: string;
  op: string;
}) {
  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ["comments", { id: postId }],
    queryFn: async () => {
      const { data } = await axios.get(`/public/comment/${postId}`, {
        withCredentials: true,
      });
      return data.data;
    },
  });

  return (
    <div>
      <CommentInput postId={postId} />
      {isLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <Spinner />
        </div>
      ) : (
        comments &&
        comments.map((comment) => (
          <CommentCard
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
