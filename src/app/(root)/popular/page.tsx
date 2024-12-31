import PopularFeed from "@/components/feed/popular-feed";

export default function page() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-semibold mb-8">Popular</h1>
      <PopularFeed />
    </div>
  );
}
