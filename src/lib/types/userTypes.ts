import { User } from "lucide-react";

export type User = {
  _id: string;
  username: string;
  email: string;
  avatar?: string;
};

export type UserProfile = User & {
  displayName: string;
  banner?: string;
  about?: string;
  createdAt: string;
  followers: number;
  following: number;
  userIsFollowing: boolean;
};
