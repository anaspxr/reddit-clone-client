"use client";

import { CircleX, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import useDebounce from "@/hooks/use-debounce";
import { useQuery } from "@tanstack/react-query";
import axios from "@/lib/axios";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store";
import { addPerson } from "@/lib/store/slices/chatSlice";

type SearchResult = { username: string; avatar: string; displayName: string }[];

export default function SearchUsers() {
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 1000);
  const [selected, setSelected] = useState(-1);

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data } = useQuery<SearchResult>({
    queryKey: ["search_people", debouncedQuery],
    queryFn: async () => {
      setSelected(-1);
      const { data } = await axios.get(
        `/public/search/users?query=${debouncedQuery}`
      );
      return data.data;
    },
  });

  useEffect(() => {
    const length = data?.length || 0;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (open) {
        if (e.key === "ArrowDown") {
          setSelected((prev) => (prev + 1) % length);
        } else if (e.key === "ArrowUp") {
          if (selected === -1) setSelected(length - 1);
          else setSelected((prev) => (prev - 1 + length) % length);
        } else if (e.key === "Enter") {
          if (selected >= 0 && data) {
            dispatch(addPerson(data[selected]));
            router.push(`/chat?u=${data[selected].username}`);
          }
          inputRef.current?.blur();
          setOpen(false);
        } else if (e.key === "Escape") {
          setOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [data, data?.length, dispatch, open, query, router, selected]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      ref={ref}
      className={cn("flex items-center relative w-full max-w-lg z-10")}
      onClick={() => {
        inputRef.current?.focus();
        setOpen(true);
      }}>
      <Search
        strokeWidth={1.2}
        className={"text-gray-800 absolute left-4 dark:text-gray-200"}
        size={20}
      />
      <input
        ref={inputRef}
        type="text"
        placeholder="Search People"
        className={`px-10 py-2 h-10 w-full  rounded-full text-sm bg-gray-200 text-gray-800 
          focus:outline-blue-400 focus:bg-white placeholder:text-gray-500 dark:bg-gray-800 dark:text-gray-200`}
        onChange={(e) => {
          if (!open) setOpen(true);
          setSelected(-1);
          setQuery(e.target.value);
        }}
        value={query}
      />
      {query.length > 0 && (
        <Button
          title="Clear"
          onClick={() => {
            setQuery("");
            inputRef.current?.focus();
          }}
          variant="ghost"
          size="icon"
          className="text-secondary-foreground absolute right-2  h-8 w-8">
          <CircleX strokeWidth={1} size={20} />
        </Button>
      )}
      {open && data && query && (
        <div className="absolute top-0 w-full pt-12 -z-10 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-3xl shadow-lg overflow-hidden">
          {data.length > 0 && (
            <div className="py-2 border-b dark:border-gray-700">
              <p className="text-sm font-semibold px-4 pb-2">Users</p>
              {data.map((item, i) => (
                <Link
                  key={item.username}
                  href={`/chat?u=${item.username}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    dispatch(addPerson(item));
                    setOpen(false);
                  }}>
                  <Button
                    key={item.username}
                    variant="ghost"
                    rounded="md"
                    className={cn(
                      "w-full justify-start h-10 hover:bg-gray-300 dark:hover:bg-gray-700",
                      {
                        "bg-gray-300 dark:bg-gray-700": selected === i,
                      }
                    )}>
                    <div className="flex items-center overflow-hidden rounded-full w-8 h-8 ">
                      <Image
                        src={item.avatar || "/images/avatar-default.png"}
                        alt="icon"
                        width={50}
                        height={50}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    u/{item.username}
                  </Button>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
