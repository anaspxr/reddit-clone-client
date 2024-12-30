import Image from "next/image";
import React from "react";

export default function Avatar({
  type = "user",
  src,
  className = "",
}: {
  type?: "user" | "community";
  src: string;
  className?: string;
}) {
  const fallback =
    type === "user"
      ? "/images/avatar-default.png"
      : "/images/community-icon.png";
  return (
    <div className={"rounded-full overflow-hidden " + className}>
      <Image
        src={src || fallback}
        alt=""
        width={20}
        height={20}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
