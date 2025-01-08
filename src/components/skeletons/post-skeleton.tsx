import React from "react";
import Skeleton from "./skeleton";

export default function PostCardSkeleton() {
  return (
    <div className="border-b pb-2 relative">
      <div className="absolute top-2 w-full flex justify-between p-2">
        <div className="flex gap-2 items-center">
          <Skeleton className="w-6   h-6 rounded-full" />
          <Skeleton className="w-24 h-4" />
        </div>
      </div>
      <div className="p-2 pt-12 space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <div className="flex gap-2 items-center">
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w- 20 rounded-full" />
        </div>
      </div>
    </div>
  );
}
