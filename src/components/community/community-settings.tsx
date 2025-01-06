"use client";

import axios, { axiosErrorCatch } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import ErrorPage from "../ui/error-page";
import { ICommunity } from "@/lib/types/communityTypes";
import Spinner from "../ui/spinner";
import { SettingsItemContainer } from "../user-settings/settings-item-container";
import Displayname from "./settings-components/display-name";
import Description from "./settings-components/description";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import ChangeIcon from "./settings-components/icon";
import ChangeCommunityBanner from "./settings-components/banner";

const settings = [
  {
    Component: Displayname,
    label: "Change display name",
    description: "Change the display name of your community",
  },
  {
    Component: Description,
    label: "Change community description",
    description: "Change the description of your community",
  },
  {
    Component: ChangeIcon,
    label: "Change Icon",
    description: "Change the community icon",
  },
  {
    Component: ChangeCommunityBanner,
    label: "Change Banner",
    description: "Change the community banner",
  },
];

export default function CommunitySettings() {
  const { communityName }: { communityName: string } = useParams();
  const {
    data: community,
    error,
    isLoading,
  } = useQuery<ICommunity>({
    queryKey: ["community", communityName],
    queryFn: async () => {
      const { data } = await axios(`/public/community/${communityName}`, {
        withCredentials: true,
      });
      return data.data;
    },
  });

  if (!isLoading && community?.role !== "admin") {
    return (
      <ErrorPage
        title="You don't have access to this section"
        description="Only community admins can access this page"
        redirect={{
          message: "Go back to community page",
          to: `/r/${communityName}`,
        }}
      />
    );
  }

  return (
    <div>
      <Link href={`/r/${communityName}`}>
        <Button variant="secondary" size="sm" className="my-2">
          <ArrowLeft size={20} strokeWidth={1.2} />
          r/{communityName}
        </Button>
      </Link>
      <h1 className="font-semibold text-2xl sm:text-3xl">Community settings</h1>
      {isLoading ? (
        <div className="px-10 py-4">
          <Spinner />
        </div>
      ) : error ? (
        <ErrorPage title={axiosErrorCatch(error)} />
      ) : (
        <div className="space-y-4 my-8">
          {settings.map((setting, index) => (
            <SettingsItemContainer
              key={index}
              Component={setting.Component}
              label={setting.label}
              description={setting.description}
            />
          ))}
        </div>
      )}
    </div>
  );
}
