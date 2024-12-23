"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { Edit, Forward, MessageCircleMore, PlusCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import dayjs from "dayjs";
import Image from "next/image";
import clsx from "clsx";
import { followUser, unFollowUser } from "@/lib/store/async-thunks/user-thunks";
import Link from "next/link";

export default function UserInfoCard() {
  const { userProfile, user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  return (
    <Card className="xl:absolute right-4 top-0 w-full max-w-[400px] bg-transparent xl:dark:bg-black xl:bg-gray-200 overflow-hidden">
      {userProfile && (
        <>
          <CardHeader className="px-0 py-0">
            <div className="relative w-full h-20 flex flex-col gap-2 justify-center">
              {userProfile.banner && (
                <Image
                  src={userProfile.banner}
                  alt=""
                  height={500}
                  width={1500}
                  className="w-full h-full object-cover absolute "
                />
              )}
              <div
                className={clsx(
                  "z-10 p-4 gap-2 h-full w-full flex flex-col justify-center",
                  {
                    "bg-black text-white bg-opacity-50": !!userProfile.banner,
                  }
                )}>
                <CardTitle className="text-lg xl:block hidden">
                  {userProfile.displayName}
                </CardTitle>
                <div className="flex gap-2 items-center justify-end">
                  {userProfile.username !== user?.username ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() => {
                          if (userProfile.userIsFollowing) {
                            dispatch(unFollowUser(userProfile.username));
                          } else {
                            dispatch(followUser(userProfile.username));
                          }
                        }}
                        className="bg-blue-700 text-white hover:bg-blue-700 hover:bg-opacity-80">
                        {userProfile.userIsFollowing ? (
                          "Following"
                        ) : (
                          <>
                            <PlusCircle strokeWidth={1.2} size={18} />
                            Follow
                          </>
                        )}
                      </Button>
                      <Button variant="secondary" size="sm">
                        <MessageCircleMore strokeWidth={1.2} size={18} />
                        Chat
                      </Button>
                    </>
                  ) : (
                    <Link href={"/settings"}>
                      <Button variant="secondary" size="sm">
                        <Edit strokeWidth={1.2} size={18} />
                        Edit profile
                      </Button>
                    </Link>
                  )}
                  <Button
                    onClick={() => {
                      const link = `${window.location.origin}/u/${userProfile.username}`;
                      window.navigator.clipboard.writeText(link);
                      toast({
                        description: "Profile Link copied to clipboard!",
                      });
                    }}
                    variant="secondary"
                    size="sm"
                    className="btn btn-secondary">
                    <Forward strokeWidth={1.2} size={18} />
                    Share
                  </Button>
                </div>
              </div>
            </div>
            {userProfile.about && (
              <CardDescription className="px-4 py-2">
                {userProfile.about}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 pt-4">
              <div>
                <p className="text-foreground">{userProfile.followers}</p>
                <p className="text-xs ">Followers</p>
              </div>
              <div>
                <p className="text-foreground">{userProfile.following}</p>
                <p className="text-xs ">Following</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-4">
              <div>
                <p className="text-foreground">0</p>
                <p className="text-xs ">Posts</p>
              </div>
              <div>
                <p className="text-foreground">0</p>
                <p className="text-xs ">Comments</p>
              </div>
              <div>
                <p className="text-foreground">
                  {dayjs(userProfile.createdAt).format("DD MMM, YYYY")}
                </p>
                <p className="text-xs ">Cake day</p>
              </div>
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
}
