"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getCommunity } from "@/lib/store/async-thunks/community-thunks";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect } from "react";
import Spinner from "../ui/spinner";
import ErrorPage from "../ui/error-page";
import { Button } from "../ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function Community() {
  const dispatch = useAppDispatch();
  const { communityName }: { communityName: string } = useParams();
  const { community, error, loading } = useAppSelector(
    (state) => state.community
  );

  useEffect(() => {
    dispatch(getCommunity(communityName));
  }, [communityName, dispatch]);

  return (
    <div className="">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : error ? (
        <ErrorPage
          title="Sorry, No community found"
          description="This community may have been banned or the name is incorrect."
        />
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
              <div className="rounded-full h-20 w-20">
                <Image
                  src={community.icon || "/images/community-icon.png"}
                  width={80}
                  height={80}
                  alt="Community Icon"
                  className="rounded-full"
                />
              </div>
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
                  <Button
                    variant={community.role ? "outline" : "default"}
                    size="lg"
                    className="px-4">
                    {!community.role
                      ? "Join"
                      : community.role === "admin"
                      ? "Admin"
                      : community.role === "moderator"
                      ? "Moderator"
                      : "Joined"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
