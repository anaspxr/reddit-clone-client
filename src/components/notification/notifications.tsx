"use client";

import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import Spinner from "../ui/spinner";
import { Notification } from "@/lib/types/postTypes";
import Link from "next/link";
import { Button } from "../ui/button";
import { CheckCheck } from "lucide-react";
import { getPostedTimeDiff } from "@/lib/utils";

export default function DisplayNotification({ type }: { type: string }) {
  const {
    data: notifications,
    isLoading,
    refetch,
  } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => {
      const { data } = await axios.get("/user/notifications", {
        withCredentials: true,
      });
      return data.data;
    },
  });

  const handleMarkAsRead = async (id: string) => {
    try {
      await axios.put(
        `/user/notifications/${id}/read`,
        {},
        { withCredentials: true }
      );

      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredNotifications = ["like", "follow", "comment"].includes(type)
    ? notifications?.filter((notification) => notification.type === type)
    : notifications;

  return isLoading ? (
    <div className="p-8">
      <Spinner />
    </div>
  ) : (
    <div className="mt-4">
      {filteredNotifications?.map((notification) => (
        <div className="relative py-1 border-t" key={notification._id}>
          <Link
            href={notification.link}
            className="block w-full h-full p-2 rounded-md hover:bg-secondary">
            <p className={notification.isRead ? "text-muted-foreground" : ""}>
              {notification.message}
            </p>
            <p className="text-xs text-muted-foreground">
              {getPostedTimeDiff(notification.createdAt)}
            </p>
          </Link>
          {!notification.isRead && (
            <Button
              onClick={() => handleMarkAsRead(notification._id)}
              title="Mark all as read"
              variant="ghost"
              className="h-6 w-6 absolute top-5 right-1">
              <CheckCheck size={20} strokeWidth={1.2} />
            </Button>
          )}
        </div>
      ))}
    </div>
  );
}
