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
import { useAppSelector } from "@/lib/store";
import PostOptions from "./post-options";

export default function PostCard({
  post,
  queryKey,
  detailed = false,
}: {
  post: Post;
  queryKey: string[];
  detailed?: boolean;
}) {
  const { user } = useAppSelector((state) => state.user);
  const hasAccess = user?.username === post.creator.username;

  return (
    <div className="border-b pb-2 relative">
      <div className="absolute top-2 w-full flex justify-between p-2">
        <div className="flex gap-2 items-center">
          <Link
            className="flex gap-2 items-center hover:underline"
            href={
              post.community?.name
                ? `/r/${post.community.name}`
                : `/u/${post.creator.username}`
            }>
            <Avatar
              className="w-6 h-6"
              src={
                post.community?.name
                  ? post.community.icon
                  : post.creator?.avatar
              }
              type={post.community?.name ? "community" : "user"}
            />
            <p className="text-xs text-muted-foreground">
              {post.community?.name
                ? `r/${post.community.name}`
                : `u/${post.creator.username}`}
            </p>
          </Link>
          •
          <p className="text text-xs text-muted-foreground">
            {getPostedTimeDiff(post.createdAt)}
          </p>
        </div>
        <PostOptions
          queryKey={queryKey}
          hasAccess={hasAccess}
          postId={post._id}
        />
      </div>
      <Link
        href={`/post/${post._id}`}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-900 block rounded-md space-y-2 pt-12">
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
