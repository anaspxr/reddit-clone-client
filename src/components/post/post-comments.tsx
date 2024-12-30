import React from "react";
import CommentInput from "./comment-input";

export default function PostComments({ postId }: { postId: string }) {
  return (
    <div>
      <CommentInput postId={postId} />
    </div>
  );
}
