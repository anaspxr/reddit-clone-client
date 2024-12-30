"use client";

import { Post } from "@/lib/types/postTypes";
import { CldImage, CldVideoPlayer } from "next-cloudinary";
import Image from "next/image";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import ReactButton from "./react-button";
import { Button } from "../ui/button";
import { MessageCircle, Share2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios, { axiosErrorCatch } from "@/lib/axios";
import Spinner from "../ui/spinner";
import ErrorPage from "../ui/error-page";
import PostComments from "./post-comments";
import { toast } from "@/hooks/use-toast";

export default function PostDetailed() {
  const { id } = useParams();
  const {
    data: post,
    isLoading,
    error,
  } = useQuery<Post>({
    queryKey: ["post", id],
    queryFn: async () => {
      const { data } = await axios.get(`public/post/${id}`, {
        withCredentials: true,
      });
      return data.data;
    },
  });

  return isLoading ? (
    <div className="h-full w-full flex items-center justify-center">
      <Spinner />
    </div>
  ) : error ? (
    <ErrorPage title={axiosErrorCatch(error)} />
  ) : (
    post && (
      <div className="space-y-2 pb-2">
        <div className="flex gap-2   items-center">
          <div className="w-10 h-10  rounded-full overflow-hidden">
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
          <div>
            {post.community?.name && <p>r/{post.community?.name}</p>}
            <p className="text-xs text-muted-foreground">
              u/{post.creator.username}
            </p>
          </div>
        </div>
        <h1 className="font-semibold text-2xl">{post.title}</h1>
        {post.body && (
          <pre className="text-sm text-muted-foreground max-h-40 overflow-hidden font-sans">
            {post.body}
          </pre>
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
            onClick={() => {
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
        <PostComments op={post.creator.username} postId={post._id} />
      </div>
    )
  );
}
