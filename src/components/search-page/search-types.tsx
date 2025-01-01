import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import clsx from "clsx";

const types = [
  { label: "Posts", value: "post" },
  { label: "Communities", value: "community" },
  { label: "People", value: "user" },
];

export default function SearchTypes({
  currentType,
  query,
}: {
  currentType: string;
  query: string;
}) {
  return (
    <div className="flex space-x-4 mt-4">
      {types.map((type) => (
        <Link
          key={type.value}
          href={`/search?query=${query}&type=${type.value}`}>
          <Button
            variant="secondary"
            className={clsx({
              "bg-gray-300 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-600":
                currentType === type.value,
            })}>
            {type.label}
          </Button>
        </Link>
      ))}
    </div>
  );
}
