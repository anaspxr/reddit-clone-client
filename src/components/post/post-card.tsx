"use client";

import { Post } from "@/lib/types/postTypes";
import React from "react";
import { Button } from "../ui/button";
import { MessageCircle, Share2 } from "lucide-react";
import { CldImage, CldVideoPlayer } from "next-cloudinary";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "next-cloudinary/dist/cld-video-player.css";
import ReactButton from "./react-button";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { getPostedTimeDiff } from "@/lib/utils";
import Avatar from "../ui/avatar";

export default function PostCard({
  post,
  detailed = false,
}: {
  post: Post;
  detailed?: boolean;
}) {
  return (
    <div className="border-b pb-2">
      <Link
        href={`/post/${post._id}`}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 block rounded-md space-y-2">
        <div className="flex gap-2 items-center">
          <Avatar
            className="w-6 h-6"
            src={
              post.community?.name ? post.community.icon : post.creator?.avatar
            }
            type={post.community?.name ? "community" : "user"}
          />
          <div className="flex items-center gap-2">
            <p className="text-xs text-muted-foreground">
              {post.community?.name
                ? `r/${post.community.name}`
                : `u/${post.creator.username}`}
            </p>
            •
            <p className="text text-xs text-muted-foreground">
              {getPostedTimeDiff(post.createdAt)}
            </p>
          </div>
        </div>
        <h1 className="font-semibold">{post.title}</h1>
        {post.body && (
          <p
            className={`text-sm text-muted-foreground ${
              !detailed ? "max-h-40" : ""
            } overflow-hidden`}>
            {post.body}
          </p>
        )}

        {post.video && (
          <CldVideoPlayer
            width="1920"
            height="1080"
            src={post.video}
            controls={true}
          />
        )}

        {post.images?.length ? (
          <div className="flex justify-center box">
            <Carousel useKeyboardArrows={true}>
              {post.images.map((image, i) => (
                <CldImage
                  className="slide"
                  key={i}
                  alt=""
                  width="1500"
                  height="500"
                  src={image}
                />
              ))}
            </Carousel>
          </div>
        ) : null}

        <div className="flex gap-2 items-center">
          <ReactButton
            userReaction={post.userReaction}
            votes={post.upvotes - post.downvotes}
            postId={post._id}
          />
          <Button variant="secondary" size="sm">
            <MessageCircle size={20} strokeWidth={1.2} />
            {post.commentCount || 0}
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              const link = `${window.location.origin}/post/${post._id}`;
              window.navigator.clipboard.writeText(link);
              toast({
                description: "Post Link copied to clipboard!",
              });
            }}
            variant="secondary"
            size="sm">
            <Share2 size={20} strokeWidth={1.2} /> Share
          </Button>
        </div>
      </Link>
    </div>
  );
}
