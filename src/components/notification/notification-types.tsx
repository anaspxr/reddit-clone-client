import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import clsx from "clsx";

const types = [
  { label: "All", value: "all" },
  { label: "Follows", value: "follow" },
  { label: "Votes", value: "like" },
  { label: "Comments", value: "comment" },
];

export default function NotificationTypes({
  currentType,
}: {
  currentType: string;
}) {
  return (
    <div className="flex space-x-2 mt-4">
      {types.map((type) => (
        <Link key={type.value} href={`/notifications?type=${type.value}`}>
          <Button
            variant="secondary"
            className={clsx({
              "bg-gray-300 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600":
                currentType === type.value,
            })}>
            {type.label}
          </Button>
        </Link>
      ))}
    </div>
  );
}
