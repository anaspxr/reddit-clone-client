"use client";

import { Post } from "@/lib/types/postTypes";
import Image from "next/image";
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
          <div className="w-6 h-6  rounded-full overflow-hidden">
            {(post.community?.icon || post.creator.avatar) && (
              <Image
                src={post.community?.icon || post.creator.avatar}
                alt=""
                width={20}
                height={20}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <p className="text-xs text-muted-foreground">
            {post.community?.name
              ? `r/${post.community.name}`
              : `u/${post.creator.username}`}
          </p>
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
            <MessageCircle size={20} strokeWidth={1.2} /> 0
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              const link = `${window.location.origin}/post/${post.title}`;
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
