import ProfileHead from "@/components/user-profile/profile-head";
import { ReactNode } from "react";

export default function UserProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <ProfileHead>{children}</ProfileHead>
    </div>
  );
}
