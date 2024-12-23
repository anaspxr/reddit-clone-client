import ProfileHead from "@/components/user-profile/profile-head";
import { ReactNode } from "react";

export default function UserProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="px-2 sm:px-8 py-4 relative">
      <ProfileHead>{children}</ProfileHead>
    </div>
  );
}
