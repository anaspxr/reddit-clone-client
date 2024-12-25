import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CommunityValues } from "./create-community";
import Image from "next/image";

export function CommunityCard1({ values }: { values: CommunityValues }) {
  return (
    <Card className="shadow-md border-none h-fit max-w-[300px] hidden md:block">
      <CardHeader>
        <CardTitle className="text-lg">
          r/{values.name || "communityname"}
        </CardTitle>
        <CardDescription className="text-xs">
          1 member · 1 online
        </CardDescription>
      </CardHeader>
      <CardContent className="text-sm">
        {values.description || "Your community description"}
      </CardContent>
    </Card>
  );
}

// this card will have icon and banner
export function CommunityCard2({ values }: { values: CommunityValues }) {
  return (
    <Card className="shadow-md border-none h-fit max-w-[300px] overflow-hidden hidden md:block">
      <div className="h-10 bg-gray-500 w-full overflow-hidden">
        {values.banner && (
          <Image
            src={URL.createObjectURL(values.banner)}
            alt="Community Banner"
            width={1500}
            height={500}
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <CardHeader className="flex items-center gap-4 flex-row">
        <div className="rounded-full overflow-hidden flex items-center justify-center h-16 w-16">
          <Image
            src={
              values.icon
                ? URL.createObjectURL(values.icon)
                : "/images/community-icon.png"
            }
            alt="r/"
            className="w-full h-full object-cover"
            width={50}
            height={50}
          />
        </div>
        <div>
          <CardTitle className="text-lg">
            r/{values.name || "communityname"}
          </CardTitle>
          <CardDescription className="text-xs">
            1 member · 1 online
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="text-sm">
        {values.description || "Your community description"}
      </CardContent>
    </Card>
  );
}
