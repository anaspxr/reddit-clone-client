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
