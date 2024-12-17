"use client";

import { Button } from "@/components/ui/button";
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
  }, []);

  return (
    <div className="sm:px-8 py-4 ">
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
    </div>
  );
}
