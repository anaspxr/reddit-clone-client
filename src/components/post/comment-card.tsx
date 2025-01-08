"use client";

import { Comment } from "@/lib/types/postTypes";
import React, { useState } from "react";
import "next-cloudinary/dist/cld-video-player.css";
import ReactButton from "./react-button";
import { getPostedTimeDiff } from "@/lib/utils";
import Avatar from "../ui/avatar";
import PostOptions from "./post-options";
import { useAppSelector } from "@/lib/store";
import { Button } from "../ui/button";
import { MessageCircleOff, MessageCirclePlusIcon } from "lucide-react";
import CommentInput from "./comment-input";
import CommentReplies from "./comment-replies";

export default function CommentCard({
  postId,
  comment,
  queryKey,
  op,
}: {
  postId: string;
  queryKey: (string | { [key: string]: string })[];
  comment: Comment;
  op?: string;
}) {
  const [replyOpen, setReplyOpen] = useState(false);
  const { user } = useAppSelector((state) => state.user);
  const hasAccess = user?.username === comment.creator.username;
  return (
    <div className="py-2 space-y-1">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <Avatar src={comment.creator.avatar} className="w-6 h-6" />
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold">{comment.creator.username} </p>
            {comment.creator.username === op && (
              <p className="text-blue-800 font-normal text-xs">OP</p>
            )}
            •
            <p className="text text-xs text-muted-foreground">
              {getPostedTimeDiff(comment.createdAt)}
            </p>
          </div>
        </div>
        <PostOptions
          queryKey={queryKey}
          hasAccess={hasAccess}
          postId={comment._id}
          type="comment"
        />
      </div>
      <p className="pl-8 text-sm text-muted-foreground  overflow-hidden">
        {comment.body}
      </p>

      <div className="pl-6 flex  gap-2 items-center">
        <ReactButton
          type="comment"
          userReaction={comment.userReaction}
          votes={comment.upvotes - comment.downvotes || 0}
          postId={comment._id}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setReplyOpen(!replyOpen)}>
          {replyOpen ? (
            <MessageCircleOff size={20} strokeWidth={1.2} />
          ) : (
            <MessageCirclePlusIcon size={20} strokeWidth={1.2} />
          )}
          {replyOpen ? "Close" : "Replies"}
        </Button>
      </div>
      {replyOpen && (
        <div className="ml-4 border-l pl-2">
          <CommentReplies commentId={comment._id} op={op} postId={postId} />
          <CommentInput postId={postId} commentId={comment._id} />
        </div>
      )}
    </div>
  );
}
