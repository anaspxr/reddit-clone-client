import { UserProfile } from "@/lib/types/userTypes";
import React from "react";
import Avatar from "../ui/avatar";
import Link from "next/link";

export default function UserResults({ users }: { users: UserProfile[] }) {
  return (
    <div className="max-w-xl">
      {users.map((user) => (
        <Link
          href={`/u/${user.username}`}
          key={user._id}
          className="border-b block py-2  ">
          <div className="flex items-center space-x-2 py-4 hover:bg-secondary px-2 rounded-md">
            <Avatar src={user.avatar} className="w-12 h-12  " />
            <div>
              <h2 className="text-lg font-semibold">{user.displayName}</h2>
              <p className="text-sm text-gray-500">u/{user.displayName}</p>
              <p className="text-xs text-gray-500">{user.about}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
