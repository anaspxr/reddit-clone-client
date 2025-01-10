"use client";

import React, { FormEvent, useState } from "react";
import MaxLengthTextarea from "../ui/max-length-textarea";
import { Button } from "../ui/button";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

export default function CommentInput({
  postId,
  commentId,
}: {
  postId: string;
  commentId?: string;
}) {
  const queryClient = useQueryClient();
  const sort = useSearchParams().get("sort") || "recent";
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [commentAdded, setCommentAdded] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "/comment",
        {
          body: comment,
          postId,
          parentComment: commentId,
        },
        { withCredentials: true }
      );
      setComment("");
      setCommentAdded(true);
      setIsOpen(false);
      if (!commentId) {
        // add the new comment to comments array if its on main thread
        queryClient.setQueryData(
          ["comments", { id: postId, sort }],
          (old: Comment[]) => {
            const newData = [data.data, ...old];
            return newData;
          }
        );
      }
      if (commentId) {
        // add the new comment to the thread
        queryClient.setQueryData(
          ["replies", { id: commentId }],
          (old: Comment[]) => {
            const newData = [...old, data.data];
            return newData;
          }
        );
      }
    } catch (error) {
      toast({
        title: "Couldn't post comment",
        description: axiosErrorCatch(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="my-4">
      {isOpen ? (
        <form onSubmit={handleSubmit}>
          <MaxLengthTextarea
            onChange={(e) => setComment(e.target.value)}
            autoFocus
            maxLength={1000}
          />
          <div className=" my-2 space-x-2">
            <Button
              disabled={loading || !comment.trim()}
              size="sm"
              variant="main">
              {loading ? "Posting..." : "Comment"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <div
          onClick={() => setIsOpen(true)}
          className="w-full h-12 cursor-text text-sm border rounded-3xl px-4 flex items-center text-muted-foreground">
          {commentId ? "Write your reply" : "Add a comment"}
        </div>
      )}
      {commentAdded && !isOpen && (
        <div className="   text-green-500  bg-green-500 bg-opacity-30 border border-green-500 text-muted-foreground mt-2 w-fit text-xs px-2 py-1 rounded-3xl">
          Comment added
        </div>
      )}
    </div>
  );
}
