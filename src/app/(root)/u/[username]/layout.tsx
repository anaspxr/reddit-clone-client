import ProfileHead from "@/components/user-profile/profile-head";
import { ReactNode } from "react";

export default function UserProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="sm:px-8 py-4">
      <ProfileHead>{children}</ProfileHead>
    </div>
  );
}
