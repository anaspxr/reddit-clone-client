"use client";

import { Button } from "@/components/ui/button";
import ErrorPage from "@/components/ui/error-page";
import Spinner from "@/components/ui/spinner";
import ProfileMenu from "@/components/user-profile/profile-menu";
import UserAvatar from "@/components/user-profile/user-avatar";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { useAppSelector } from "@/lib/store";
import { User } from "@/lib/types/userTypes";
import { isAxiosError } from "axios";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function UserProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [userData, setUserData] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: currentUser } = useAppSelector((state) => state.user);
  const { username }: { username: string } = useParams();

  const isOwnProfile = currentUser?.username === username;

  useEffect(() => {
    axios
      .get(`public/user/${username}`)
      .then(({ data }) => {
        setUserData(data.data);
      })
      .catch((error) => {
        if (isAxiosError(error) && error.status === 404) {
          setError("NOT_FOUND");
        } else {
          setError(axiosErrorCatch(error));
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username]);

  return (
    <div className="sm:px-8 py-4 ">
      {loading ? (
        <div className="h-full flex items-center justify-center">
          <Spinner />
        </div>
      ) : error ? (
        <ErrorPage
          title="Sorry, nobody on Reddit goes by that name"
          description="This account may have been banned or the username is incorrect."
        />
      ) : (
        <div className="max-w-xl">
          <div className="pb-2 border-b space-y-4">
            {userData && <UserAvatar {...userData} />}
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
    </div>
  );
}
