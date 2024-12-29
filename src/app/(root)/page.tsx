import PopularFeed from "@/components/feed/popular-feed";
import UserFeed from "@/components/feed/user-feed";

export default function Home() {
  return (
    <div className="space-y-8">
      <UserFeed />
      <div>
        <h1 className="text-2xl">Popular</h1>
        <PopularFeed />
      </div>
    </div>
  );
}
