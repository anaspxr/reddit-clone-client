import React from "react";
import CommentInput from "./comment-input";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Comment } from "@/lib/types/postTypes";
import Spinner from "../ui/spinner";
import CommentCard from "./comment-card";
import SortButton from "../feed/sort-button";
import { useSearchParams } from "next/navigation";

export default function PostComments({
  postId,
  op,
}: {
  postId: string;
  op: string;
}) {
  const sort = useSearchParams().get("sort") || "recent";
  const { data: comments, isLoading } = useQuery<Comment[]>({
    queryKey: ["comments", { id: postId, sort }],
    queryFn: async () => {
      const { data } = await axios.get(
        `/public/comment/${postId}?sort=${sort}`,
        {
          withCredentials: true,
        }
      );
      return data.data;
    },
  });

  return (
    <div>
      <CommentInput postId={postId} />
      <div className="flex items-center gap-2 text-sm">
        Sort by:{" "}
        <SortButton
          sortTypes={[
            { label: "New", value: "" },
            { label: "Top", value: "allTime" },
          ]}
          defaultSort="New"
        />
      </div>
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
