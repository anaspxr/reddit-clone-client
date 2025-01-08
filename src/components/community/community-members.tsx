"use client";

import axios, { axiosErrorCatch } from "@/lib/axios";
import { ICommunity } from "@/lib/types/communityTypes";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import React from "react";
import Avatar from "../ui/avatar";
import ErrorPage from "../ui/error-page";
import Spinner from "../ui/spinner";
import dayjs from "dayjs";
import { useAppSelector } from "@/lib/store";
import JoinRequestsButton from "./join-requests-button";
import JoinRequests from "./join-requests";
import KickUserButton from "./kick-user-button";
import ModEditButton from "./mod-edit-button";

interface CommunityMembersData extends ICommunity {
  members: {
    user: {
      _id: string;
      username: string;
      avatar: string;
    };
    role: string;
    createdAt: string;
  }[];
}

export default function CommunityMembers() {
  const { user } = useAppSelector((state) => state.user);
  const { communityName }: { communityName: string } = useParams();
  const {
    refetch,
    data: community,
    error,
    isLoading,
  } = useQuery<CommunityMembersData>({
    queryKey: ["communityMembers", communityName],
    queryFn: async () => {
      const { data } = await axios(`/community/${communityName}/members`, {
        withCredentials: true,
      });
      return data.data;
    },
  });

  if (error) {
    return (
      <ErrorPage
        title="You can't access this page"
        description={axiosErrorCatch(error)}
        redirect={{
          message: `Go back to r/${communityName}`,
          to: `/r/${communityName}`,
        }}
      />
    );
  }

  return isLoading ? (
    <div className="flex justify-center items-center h-32">
      <Spinner />
    </div>
  ) : (
    <div>
      {community?.members ? (
        <JoinRequests
          members={community?.members}
          communityName={communityName}
          refetch={refetch}
        />
      ) : null}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl sm:text-3xl font-semibold">Members</h1>
        <JoinRequestsButton alwaysDisplay communityName={communityName} />
      </div>

      <table className="min-w-full text-left">
        <thead className="border-y">
          <tr>
            <th className="py-2 px-4 ">Username</th>
            <th className="py-2 px-4 ">Role</th>
            <th className="py-2 px-4 ">Joined At</th>
            <th className="py-2 px-4 ">Actions</th>
          </tr>
        </thead>
        <tbody>
          {community?.members
            .filter((member) => member.role !== "pending")
            .map((member) => (
              <tr key={member.user._id} className="text-sm border-b">
                <td className="py-2 px-4">
                  <div className="flex items-center">
                    <Avatar src={member.user.avatar} className="w-6 h-6 mr-2" />
                    u/{member.user.username}
                    <span className="text-main ml-2">
                      {member.user._id === user?._id && "(You)"}
                    </span>
                  </div>
                </td>
                <td className="py-2 px-4 ">{member.role}</td>
                <td className="py-2 px-4 flex flex-col gap-1">
                  <span>{dayjs(member.createdAt).format("hh:mm")}</span>
                  <span>{dayjs(member.createdAt).format("DD MMM, YYYY")}</span>
                </td>
                {member.user.username !== user?.username &&
                  member.role !== "admin" && (
                    <td className="py-2 px-4 space-x-2">
                      <ModEditButton
                        isMod={member.role === "moderator"}
                        member={member}
                        communityName={communityName}
                        refetch={refetch}
                      />
                      <KickUserButton
                        member={member}
                        communityName={communityName}
                        refetch={refetch}
                      />
                    </td>
                  )}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
