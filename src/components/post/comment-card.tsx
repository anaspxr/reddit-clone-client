"use client";

import { Comment } from "@/lib/types/postTypes";
import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "next-cloudinary/dist/cld-video-player.css";
import ReactButton from "./react-button";
import { getPostedTimeDiff } from "@/lib/utils";
import Avatar from "../ui/avatar";

export default function CommentCard({
  comment,
  op,
}: {
  comment: Comment;
  op: string;
}) {
  return (
    <div className="py-2 space-y-1">
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
        {/* <Button variant="ghost" size="sm">
          <MessageCircle size={20} strokeWidth={1.2} /> Reply
        </Button> */}
      </div>
    </div>
  );
}
