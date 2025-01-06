import Image from "next/image";
import React from "react";

export default function Avatar({
  type = "user",
  src,
  className = "",
  w = 20,
  h = 20,
}: {
  type?: "user" | "community";
  src?: string;
  className?: string;
  w?: number;
  h?: number;
}) {
  const fallback =
    type === "user"
      ? "/images/avatar-default.png"
      : "/images/community-icon.png";
  return (
    <div className={"rounded-full overflow-hidden flex-shrink-0 " + className}>
      <Image
        src={src || fallback}
        alt=""
        width={w}
        height={h}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
