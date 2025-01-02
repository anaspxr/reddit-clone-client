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

type SearchResult = {
  users: { username: string; avatar: string; displayName: string }[];
  communities: { name: string; icon: string; displayName: string }[];
};

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const debouncedQuery = useDebounce(query, 1000);
  const [selected, setSelected] = useState(-1);

  const router = useRouter();

  const { data } = useQuery<SearchResult>({
    queryKey: ["search", debouncedQuery],
    queryFn: async () => {
      setSelected(-1);
      const { data } = await axios.get(
        `/public/search?query=${debouncedQuery}`
      );
      return data.data;
    },
  });

  useEffect(() => {
    const length = (data?.communities.length || 0) + (data?.users.length || 0);
    const handleKeyDown = (e: KeyboardEvent) => {
      if (open) {
        if (e.key === "ArrowDown") {
          setSelected((prev) => (prev + 1) % length);
        } else if (e.key === "ArrowUp") {
          if (selected === -1) setSelected(length - 1);
          else setSelected((prev) => (prev - 1 + length) % length);
        } else if (e.key === "Enter") {
          if (selected < 0 && query.length > 0) {
            setOpen(false);
            router.push(`/search?query=${query}`);
            return;
          }
          if (selected >= 0) {
            if (selected < (data?.communities.length || 0)) {
              router.push(`/r/${data?.communities[selected].name}`);
            } else {
              router.push(
                `/u/${
                  data?.users[selected - (data?.communities.length || 0)]
                    .username
                }`
              );
            }
            inputRef.current?.blur();
            setOpen(false);
          }
        } else if (e.key === "Escape") {
          setOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [
    data?.communities,
    data?.users,
    data?.users.length,
    open,
    query,
    router,
    selected,
  ]);

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
      className={cn("flex items-center relative w-full max-w-lg z-10", {
        "fixed sm:relative w-11/12": open,
      })}
      onClick={() => {
        inputRef.current?.focus();
        setOpen(true);
      }}>
      <Search
        strokeWidth={1.2}
        className={cn("text-gray-800 absolute left-4 dark:text-gray-200", {
          "hidden sm:block": !open,
        })}
        size={20}
      />
      <Button
        variant="ghost"
        className={cn("h-10 w-10 text-gray-800 dark:text-gray-200 sm:hidden", {
          hidden: open,
        })}
        onClick={() => {
          inputRef.current?.focus();
          setOpen(true);
        }}>
        <Search strokeWidth={1.2} width={25} height={25} />
      </Button>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search Reddit"
        className={cn(
          `px-10 py-2 h-10 w-full  rounded-full text-sm bg-gray-200 text-gray-800 
          focus:outline-blue-400 focus:bg-white placeholder:text-gray-500 dark:bg-gray-800 dark:text-gray-200`,
          {
            "hidden sm:block": !open,
          }
        )}
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
      {open && (
        <div className="absolute top-0 w-full pt-12 -z-10 bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded-3xl shadow-lg overflow-hidden">
          {data && (
            <>
              {data.communities.length > 0 && (
                <div className="py-2 border-b dark:border-gray-700">
                  <p className="text-sm font-semibold px-4 pb-2">Communities</p>
                  {data.communities.map((item, i) => (
                    <Link
                      key={item.name}
                      href={`/r/${item.name}`}
                      onClick={() => setOpen(false)}>
                      <Button
                        aria-selected
                        key={item.name}
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
                            src={item.icon || "/images/community-icon.png"}
                            alt="icon"
                            width={50}
                            height={50}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        r/{item.name}
                      </Button>
                    </Link>
                  ))}
                </div>
              )}
              {data.users.length > 0 && (
                <div className="py-2 border-b dark:border-gray-700">
                  <p className="text-sm font-semibold px-4 pb-2">Users</p>
                  {data.users.map((item, i) => (
                    <Link key={item.username} href={`/u/${item.username}`}>
                      <Button
                        onClick={() => {
                          setOpen(false);
                        }}
                        key={item.username}
                        variant="ghost"
                        rounded="md"
                        className={cn(
                          "w-full justify-start h-10 hover:bg-gray-300 dark:hover:bg-gray-700",
                          {
                            "bg-gray-300 dark:bg-gray-700":
                              selected === i + data.communities.length,
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
            </>
          )}
          <div className="py-2">
            {query ? (
              <Link href={`/search?query=${query}`}>
                <div className="flex items-center gap-2 text-sm border-t hover:bg-gray-300 dark:hover:bg-gray-700 py-2 px-4">
                  <Search
                    strokeWidth={1.2}
                    className="text-gray-800 dark:text-gray-200 "
                    size={20}
                  />
                  <p>Search for &quot;{query}&quot;</p>
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}
