"use client";

import { Post } from "@/lib/types/postTypes";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { ArrowDown, ArrowUp, MessageCircle, Share2 } from "lucide-react";
import { CldImage, CldVideoPlayer } from "next-cloudinary";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "next-cloudinary/dist/cld-video-player.css";

export default function PostCard({ post }: { post: Post }) {
  return (
    <div className="border-b space-y-2 pb-2">
      <div className="flex gap-2 p-2 items-center">
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
          {post.community
            ? `r/${post.community.name}`
            : `u/${post.creator.username}`}
        </p>
      </div>
      <h1 className="font-semibold">{post.title}</h1>
      {post.body && (
        <p className="text-sm text-muted-foreground max-h-40 overflow-hidden">
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
        <div className="bg-secondary rounded-3xl flex items-center gap-1">
          <Button
            variant="secondary"
            size="sm"
            className="hover:bg-gray-500 px-0 h-8 w-8">
            <ArrowUp size={20} />
          </Button>
          <p>0</p>
          <Button
            variant="secondary"
            size="sm"
            className="hover:bg-gray-500 px-0 h-8 w-8">
            <ArrowDown size={20} />
          </Button>
        </div>
        <Button variant="secondary" size="sm">
          <MessageCircle size={20} strokeWidth={1.2} /> 0
        </Button>
        <Button variant="secondary" size="sm">
          <Share2 size={20} strokeWidth={1.2} /> Share
        </Button>
      </div>
    </div>
  );
}
