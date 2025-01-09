import PopularFeed from "@/components/feed/popular-feed";
import SortButton from "@/components/feed/sort-button";

const popularTypes = {
  week: "this week",
  month: "this month",
  allTime: "all Time",
};

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    sort?: keyof typeof popularTypes;
  }>;
}) {
  const { sort = "week" } = await searchParams;

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
        Popular {popularTypes[sort]}
      </h1>
      <div className="border-b   pb-2">
        <SortButton
          sortTypes={[
            { label: "This week", value: "week" },
            { label: "This month", value: "month" },
            { label: "All Time", value: "allTime" },
          ]}
        />
      </div>
      <PopularFeed />
    </div>
  );
}
