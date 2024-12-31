import { ICommunity } from "@/lib/types/communityTypes";
import React from "react";
import Avatar from "../ui/avatar";
import Link from "next/link";
import { Button } from "../ui/button";

export default function CommunityCard({
  community,
}: {
  community: ICommunity;
}) {
  return (
    <Link href={`/r/${community.name}`}>
      <div className="rounded-xl border shadow p-2 hover:bg-gray-100 dark:hover:bg-gray-900 space-y-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 w-full">
            <div className="flex-shrink-0">
              <Avatar
                src={community.icon}
                type="community"
                className="w-10 h-10"
              />
            </div>
            <div className="w-1/2 ">
              <p className="font-semibold text-lg overflow-hidden whitespace-nowrap text-ellipsis">
                {community.displayName || community.name}
              </p>
              <p className="text-muted-foreground text-xs">
                {community.memberCount || 0} Members
              </p>
            </div>
          </div>
          <Button variant="blue" size="sm">
            Join
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{community.description}</p>
      </div>
    </Link>
  );
}
