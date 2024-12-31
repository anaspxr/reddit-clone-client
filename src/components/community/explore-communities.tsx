"use client";

import axios from "@/lib/axios";
import { ICommunity } from "@/lib/types/communityTypes";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import CommunityCard from "./community-card";

export default function ExploreCommunities() {
  const { data } = useQuery<ICommunity[]>({
    queryKey: ["communities"],
    queryFn: async () => {
      const { data } = await axios.get("/public/communities", {
        withCredentials: true,
      });
      const communities: ICommunity[] = data.data;
      return communities?.filter((c) => !c.role);
    },
  });

  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {data?.map((c) => (
        <CommunityCard key={c._id} community={c} />
      ))}
    </div>
  );
}
