"use client";

import React from "react";
import { Button } from "../ui/button";
import useSearchParams from "@/hooks/use-search-params";

const types = [
  {
    name: "Text",
    value: "text",
  },
  {
    name: "Images & Video",
    value: "media",
  },
  // {
  //   name: "Link",
  //   value: "link",
  // },
];

export default function SelectType() {
  const { searchParams, setSearchParams } = useSearchParams();
  const currentType = searchParams.get("type") || "text";

  return (
    <div className="flex items-center gap-2">
      {types.map((type) => (
        <Button
          key={type.value}
          variant="ghost"
          onClick={() => setSearchParams("type", type.value)}
          className={
            currentType === type.value
              ? "relative after:h-1 after:w-3/5 after:bg-blue-500 after:rounded-md after:block after:absolute after:-bottom-1"
              : ""
          }>
          {type.name}
        </Button>
      ))}
    </div>
  );
}
