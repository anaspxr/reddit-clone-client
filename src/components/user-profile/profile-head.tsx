"use client";

import { Button } from "@/components/ui/button";
import ErrorPage from "@/components/ui/error-page";
import Spinner from "@/components/ui/spinner";
import ProfileMenu from "@/components/user-profile/profile-menu";
import UserAvatar from "@/components/user-profile/user-avatar";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getUserProfile } from "@/lib/store/async-thunks/user-thunks";

import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProfileHead({ children }: { children: ReactNode }) {
  const {
    user: currentUser,
    userProfile,
    userProfileError,
    userProfileLoading,
  } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const { username }: { username: string } = useParams();

  const isOwnProfile = currentUser?.username === username;

  useEffect(() => {
    dispatch(getUserProfile(username));
  }, [dispatch, username]);
  return (
    <>
      {userProfileLoading ? (
        <div className="h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : userProfileError ? (
        <ErrorPage
          title="Sorry, nobody on Reddit goes by that name"
          description="This account may have been banned or the username is incorrect."
        />
      ) : (
        <div className="max-w-xl">
          <div className="pb-2 border-b space-y-4">
            {userProfile && <UserAvatar {...userProfile} />}
            <ProfileMenu username={username} />
            {isOwnProfile && (
              <Button variant="outline" size="sm">
                <Plus strokeWidth={1} /> Create Post
              </Button>
            )}
          </div>
          <div>{children}</div>
        </div>
      )}
    </>
  );
}
