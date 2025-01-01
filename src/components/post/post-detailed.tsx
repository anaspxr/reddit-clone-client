"use client";

import { Post } from "@/lib/types/postTypes";
import { CldImage, CldVideoPlayer } from "next-cloudinary";
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
import Avatar from "../ui/avatar";
import PostOptions from "./post-options";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/store";

export default function PostDetailed() {
  const { id } = useParams();
  const router = useRouter();
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
  const { user } = useAppSelector((state) => state.user);
  const hasAccess = user?.username === post?.creator.username;

  return isLoading ? (
    <div className="h-full w-full flex items-center justify-center">
      <Spinner />
    </div>
  ) : error ? (
    <ErrorPage title={axiosErrorCatch(error)} />
  ) : (
    post && (
      <div className="space-y-2 pb-2">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <Avatar
              src={post.community?.icon || post.creator.avatar}
              type={post.community?.name ? "community" : "user"}
              className="w-10 h-10"
            />

            <div>
              {post.community?.name && <p>r/{post.community?.name}</p>}
              <p className="text-xs text-muted-foreground">
                u/{post.creator.username}
              </p>
            </div>
          </div>
          <PostOptions
            queryKey={["post"]}
            onSuccess={() => router.push("/")}
            hasAccess={hasAccess}
            postId={post._id}
          />
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
