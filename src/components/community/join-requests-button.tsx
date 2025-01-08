import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import Link from "next/link";
import axios from "@/lib/axios";

export default function JoinRequestsButton({
  alwaysDisplay = false,
  communityName,
}: {
  alwaysDisplay?: boolean;
  communityName: string;
}) {
  const { data: count } = useQuery({
    queryKey: ["join-requests", communityName],
    queryFn: async () => {
      const { data } = await axios(
        `/community/${communityName}/members/requests/count`,
        {
          withCredentials: true,
        }
      );
      return data.data;
    },
  });

  return count || alwaysDisplay ? (
    <Link href={`/r/${communityName}/settings/members?requests=true`}>
      <Button variant="main" size="sm">
        {count} Join Request{count > 1 ? "s" : ""}
      </Button>
    </Link>
  ) : null;
}
