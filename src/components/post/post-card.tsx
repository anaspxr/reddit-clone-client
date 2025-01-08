"use client";

import { Post } from "@/lib/types/postTypes";
import React from "react";
import { Button } from "../ui/button";
import { MessageCircle, Share2 } from "lucide-react";
import { CldImage, CldVideoPlayer } from "next-cloudinary";
import "next-cloudinary/dist/cld-video-player.css";
import ReactButton from "./react-button";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { getPostedTimeDiff, stringToParagraphs } from "@/lib/utils";
import Avatar from "../ui/avatar";
import { useAppSelector } from "@/lib/store";
import PostOptions from "./post-options";
import ImageCarousel from "./image-carousel";

export default function PostCard({
  post,
  queryKey,
  detailed = false,
}: {
  post: Post;
  queryKey: (string | { [key: string]: string })[];
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
          <div
            className={`text-sm text-muted-foreground space-y-2 ${
              !detailed ? "max-h-40" : ""
            } overflow-hidden`}>
            {stringToParagraphs(post.body).map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        )}

        {post.video && (
          <div
            className="max-w-xl max-h-96"
            onClick={(e) => e.preventDefault()}>
            <CldVideoPlayer
              aspectRatio="16:9"
              logo={false}
              width="1920"
              height="1080"
              src={post.video}
              controls={true}
            />
          </div>
        )}

        {post.images?.length ? (
          <div className="relative flex justify-center items-center box overflow-hidden">
            {/* Background Blurred Image */}
            <CldImage
              height={500}
              width={500}
              className="absolute top-0 left-0 w-full h-full object-cover blur-xl opacity-30"
              alt="background"
              src={post.images[0]} // Use the first image for the background
            />

            <ImageCarousel
              postId={post._id}
              images={post.images}
              className="max-w-xl max-h-96"
            />
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
