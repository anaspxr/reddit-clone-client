export type Post = {
  _id: string;
  title: string;
  body?: string;
  community?: {
    _id: string;
    name: string;
    icon: string;
  };
  createdAt: string;
  updatedAt: string;
  creator: {
    _id: string;
    username: string;
    displayName: string;
    avatar: string;
  };
  images?: string[];
  video?: string;
  upvotes: number;
  downvotes: number;
  userReaction?: "downvote" | "upvote";
  commentCount: number;
};

export type Comment = {
  parentComment?: string;
  _id: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  creator: {
    _id: string;
    username: string;
    displayName: string;
    avatar: string;
  };
  upvotes: number;
  downvotes: number;
  userReaction?: "downvote" | "upvote";
};

export type NotificationTypes = "like" | "comment" | "follow";

export type Notification = {
  _id: string;
  user: string;
  type: NotificationTypes;
  message: string;
  link: string;
  isRead: boolean;
  createdAt: string;
};
