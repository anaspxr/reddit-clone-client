"use client";

import { CircleX, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [searchPath, setSearchPath] = useState<string | null>(null);
  const ref = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const splitted = pathname.split("/");

    if (splitted[1] === "u" || splitted[1] === "r")
      setSearchPath(`${splitted[1]}/${splitted[2]}`);
  }, [pathname]);

  return (
    <div className="flex items-center relative w-full max-w-lg">
      <Search
        strokeWidth={1.2}
        className="text-gray-800 absolute left-4 dark:text-gray-200"
        size={20}
      />
      <input
        type="text"
        ref={ref}
        placeholder={searchPath ? `Search in ${searchPath}` : "Search Reddit"}
        className={`px-10 py-2 h-10 w-full  rounded-full text-sm bg-gray-200 text-gray-800 
          focus:outline-blue-400 focus:bg-white placeholder:text-gray-500 dark:bg-gray-800 dark:text-gray-200`}
        onChange={(e) => setQuery(e.target.value)}
        value={query}
      />
      {query.length > 0 && (
        <Button
          title="Clear"
          onClick={() => setQuery("")}
          variant="ghost"
          size="icon"
          className="text-gray-800 absolute right-2  h-8 w-8">
          <CircleX strokeWidth={1} size={20} />
        </Button>
      )}
    </div>
  );
}
