import { User } from "lucide-react";

export type User = {
  username: string;
  email: string;
  avatar?: string;
};

export type UserProfile = User & {
  displayName: string;
  banner?: string;
  about?: string;
  createdAt: string;
};
