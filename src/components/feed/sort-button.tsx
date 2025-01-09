"use client";

import useSearchParams from "@/hooks/use-search-params";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

export default function SortButton({
  sortTypes,
  defaultSort,
}: {
  sortTypes: {
    label: string;
    value: string | null;
  }[];
  defaultSort?: string;
}) {
  const { searchParams, getNewPath } = useSearchParams();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          {sortTypes.find(({ value }) => value === searchParams.get("sort"))
            ?.label ||
            defaultSort ||
            "Best"}
          <ChevronDown size={16} strokeWidth={1.5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {sortTypes.map((sortType) => (
          <Link href={getNewPath("sort", sortType.value)} key={sortType.value}>
            <DropdownMenuItem key={sortType.value} className="cursor-pointer">
              {sortType.label}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
