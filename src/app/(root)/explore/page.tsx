import ExploreCommunities from "@/components/community/explore-communities";
import PopularCommunities from "@/components/feed/popular-communities";

export default function page() {
  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-semibold mb-8">
        Explore Communities
      </h1>
      <h3 className="text-lg sm:text-xl font-semibold mb-2">Popular</h3>
      <PopularCommunities />
      <ExploreCommunities />
    </div>
  );
}
