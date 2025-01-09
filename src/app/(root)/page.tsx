import SortButton from "@/components/feed/sort-button";
import UserFeed from "@/components/feed/user-feed";

export default function Home() {
  return (
    <div>
      <div className="border-b pb-2">
        <SortButton
          sortTypes={[
            {
              label: "Best",
              value: null,
            },
            {
              label: "This week",
              value: "week",
            },
            {
              label: "This Month",
              value: "month",
            },
            {
              label: "All time",
              value: "allTime",
            },
          ]}
        />
      </div>
      <UserFeed />
    </div>
  );
}
