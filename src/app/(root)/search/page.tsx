import SearchResults from "@/components/search-page/search-results";
import SearchTypes from "@/components/search-page/search-types";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{
    type?: string;
    query?: string;
  }>;
}) {
  const { type = "post", query = "" } = await searchParams;
  return (
    <div className="space-y-4">
      <h1 className="text-2xl sm:text-3xl font-semibold">Search results </h1>
      <SearchTypes currentType={type} query={query} />
      <SearchResults currentType={type} query={query} />
    </div>
  );
}
