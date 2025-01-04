"use client";

import { Bell, CheckCheck, Dot } from "lucide-react";
import { Button } from "../ui/button";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import { Notification } from "@/lib/types/postTypes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";

export default function NotificationIcon() {
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

  const unreadNotifications = useMemo(
    () => notifications?.filter((n) => !n.isRead),
    [notifications]
  );

  const handleMarkAsRead = async (notification: Notification) => {
    try {
      await axios.put(
        `/user/notifications/${notification._id}/read`,
        {},
        { withCredentials: true }
      );

      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 relative">
          <Bell width={22} height={22} strokeWidth={1.2} />
          {unreadNotifications?.length ? (
            <span
              style={{
                fontSize: "10px",
              }}
              className="absolute top-1 right-1 bg-main text-white rounded-full  h-4 w-4   flex items-center justify-center">
              {unreadNotifications.length < 9
                ? unreadNotifications.length
                : "9+"}
            </span>
          ) : null}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-80 mr-2">
        <DropdownMenuLabel>
          Notifications{" "}
          {unreadNotifications?.length
            ? `(${unreadNotifications?.length} Unread)`
            : ""}
        </DropdownMenuLabel>
        {isLoading && (
          <p className="text-center text-sm text-muted-foreground py-2">
            Loading...
          </p>
        )}
        {unreadNotifications?.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-2">
            No new notifications
          </p>
        )}
        <div>
          {unreadNotifications?.map((notification) => (
            <Link
              href={notification.link}
              key={notification._id}
              className="flex items-center gap-2 px-2">
              <DropdownMenuItem>
                <Dot className="text-main" /> {notification.message}
              </DropdownMenuItem>
              <Button
                onClick={() => {
                  handleMarkAsRead(notification);
                }}
                title="Mark as read"
                variant="ghost"
                className="h-6 w-6">
                <CheckCheck size={20} strokeWidth={1.2} />
              </Button>
            </Link>
          ))}
        </div>
        <Link href={`/notifications`}>
          <DropdownMenuItem className="justify-center mt-4 cursor-pointer">
            See all notifications
            <Bell />
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
