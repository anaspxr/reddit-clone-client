"use client";

import axios from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import { useEffect, useState } from "react";
import Image from "next/image";
import Avatar from "../ui/avatar";
import Link from "next/link";
import Skeleton from "../skeletons/skeleton";

export default function PopularCommunities() {
  const { data, isLoading } = useQuery<
    {
      _id: string;
      name: string;
      displayName: string;
      description: string;
      icon: string;
      banner: string;
      memberCount: number;
    }[]
  >({
    queryKey: ["communities", { type: "popular" }],
    queryFn: async () => {
      const { data } = await axios.get("/public/communities/popular", {
        withCredentials: true,
      });
      return data.data;
    },
  });

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    console.log("e");

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    console.log(api.scrollSnapList());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api, data]);

  console.log(count, current);

  return (
    <Carousel setApi={setApi} className="mb-4">
      <CarouselContent>
        {isLoading && (
          <>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <Skeleton className="w-full h-36 rounded-3xl" />
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <Skeleton className="w-full h-36 rounded-3xl" />
            </CarouselItem>
            <CarouselItem className="sm:basis-1/2 lg:basis-1/3">
              <Skeleton className="w-full h-36 rounded-3xl" />
            </CarouselItem>
          </>
        )}
        {data?.map((community) => (
          <CarouselItem
            key={community._id}
            className="sm:basis-1/2 lg:basis-1/3 text-white">
            <Link href={`/r/${community.name}`}>
              <div className="rounded-3xl border h-36 overflow-hidden relative flex items-end group">
                {community.banner && (
                  <Image
                    className="absolute object-cover w-full h-full"
                    width={1500}
                    height={500}
                    src={community.banner}
                    alt=""
                  />
                )}
                <div className="absolute w-full h-full bg-black z-10 bg-opacity-20 group-hover:bg-opacity-0" />
                <div className="z-20 relative px-4 py-1 bg-black bg-opacity-50 w-full">
                  <h1 className="text-lg font-semibold">
                    {community.displayName}
                  </h1>
                  <div className="pr-8">
                    <p className="text-xs  whitespace-nowrap text-ellipsis overflow-hidden">
                      {community.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Avatar
                      type="community"
                      src={community.icon}
                      className="w-4 h-4"
                    />
                    <p className="text-xs">r/{community.name}</p>
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>

      {current !== 1 && <CarouselPrevious className="left-2" />}
      {current !== data?.length && <CarouselNext className="right-2" />}
    </Carousel>
  );
}
