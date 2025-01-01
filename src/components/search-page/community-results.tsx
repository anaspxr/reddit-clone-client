import { ICommunity } from "@/lib/types/communityTypes";
import React from "react";
import CommunityCard from "../community/community-card";

export default function CommunityResults({
  communities,
}: {
  communities: ICommunity[];
}) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
      {communities?.map((c) => (
        <CommunityCard key={c._id} community={c} />
      ))}
    </div>
  );
}
