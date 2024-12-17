import { User } from "@/lib/types/userTypes";
import Image from "next/image";

export default function UserAvatar({ avatar, username, displayName }: User) {
  return (
    <div className="flex gap-4 items-center">
      <Image
        className="rounded-full"
        src={avatar || "/avatar-default.png"}
        alt=""
        height={70}
        width={70}
      />
      <div>
        <p className="font-semibold text-2xl">{displayName}</p>
        <p className="text-gray-600 dark:text-gray-400">u/{username}</p>
      </div>
    </div>
  );
}
