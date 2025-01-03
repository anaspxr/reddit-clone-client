import React from "react";

export default function Skeleton({ className }: { className: string }) {
  return (
    <div
      className={`bg-gray-300 dark:bg-gray-800 animate-pulse ${className}`}
    />
  );
}
