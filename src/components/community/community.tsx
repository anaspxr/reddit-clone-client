"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import Spinner from "../ui/spinner";
import ErrorPage from "../ui/error-page";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import CommunityPosts from "./community-posts";
import JoinButton from "./join-button";
import { useQuery } from "@tanstack/react-query";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { ICommunity } from "@/lib/types/communityTypes";
import Avatar from "../ui/avatar";

export default function Community() {
  const { communityName }: { communityName: string } = useParams();
  const {
    refetch,
    data: community,
    error,
    isLoading,
  } = useQuery<ICommunity>({
    queryKey: [communityName],
    queryFn: async () => {
      const { data } = await axios(`/public/community/${communityName}`, {
        withCredentials: true,
      });
      return data.data;
    },
  });

  return (
    <div>
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : error ? (
        <ErrorPage title={axiosErrorCatch(error)} />
      ) : (
        community && (
          <div>
            <div className="h-10 sm:h-20 w-full overflow-hidden bg-secondary rounded-md">
              {community.banner && (
                <Image
                  src={community.banner}
                  width={1500}
                  height={500}
                  alt="Community Banner"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div className="flex items-center gap-4 mt-4">
              <Avatar
                src={community.icon}
                className="h-20 w-20"
                type="community"
              />
              <div className="flex justify-between gap-4 flex-wrap w-full">
                <h2 className="text-xl sm:text-4xl font-semibold">
                  r/{community.name}
                </h2>
                <div className="flex items-center gap-2">
                  <Link href={`/create/post?community=${community.name}`}>
                    <Button variant="outline" size="lg" className="px-4">
                      <Plus strokeWidth={1.2} /> Create Post
                    </Button>
                  </Link>
                  <JoinButton refetch={refetch} community={community} />
                </div>
              </div>
            </div>
            <CommunityPosts />
          </div>
        )
      )}
    </div>
  );
}
