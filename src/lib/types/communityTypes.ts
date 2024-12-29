export interface ICommunity {
  name: string;
  displayName: string;
  description: string;
  topics: string[];
  type: "public" | "restricted" | "private";
  creator: string;
  icon?: string;
  banner?: string;
  role?: "admin" | "moderator" | "member";
}
