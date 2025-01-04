import NotificationTypes from "@/components/notification/notification-types";
import DisplayNotification from "@/components/notification/notifications";
import React from "react";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    type?: string;
  }>;
}) {
  const { type = "all" } = await searchParams;
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">Notifications</h1>
      <NotificationTypes currentType={type} />
      <DisplayNotification type={type} />
    </div>
  );
}
