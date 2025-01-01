"use client";

import axios from "@/lib/axios";
import { ICommunity } from "@/lib/types/communityTypes";
import { Post } from "@/lib/types/postTypes";
import { UserProfile } from "@/lib/types/userTypes";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "../ui/spinner";
import PostResults from "./post-results";
import CommunityResults from "./community-results";
import UserResults from "./user-results";

export default function SearchResults({
  currentType,
  query,
}: {
  currentType: string;
  query: string;
}) {
  const { data, isLoading } = useQuery<ICommunity[] | Post[] | UserProfile[]>({
    queryKey: ["search", query, currentType],
    queryFn: async () => {
      const { data } = await axios.get(
        `/public/search/results?query=${query}&type=${currentType}`,
        {
          withCredentials: true,
        }
      );
      return data.data;
    },
  });

  return isLoading ? (
    <Spinner />
  ) : currentType === "post" ? (
    <PostResults posts={data as Post[]} />
  ) : currentType === "community" ? (
    <CommunityResults communities={data as ICommunity[]} />
  ) : currentType === "user" ? (
    <UserResults users={data as UserProfile[]} />
  ) : null;
}
