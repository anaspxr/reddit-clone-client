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
import { toast } from "@/hooks/use-toast";
import { UserRoundX } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";

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

  const handleKickUser = async (username: string) => {
    try {
      await axios.delete(`/community/${communityName}/members/${username}`, {
        withCredentials: true,
      });
      refetch();
    } catch (error) {
      toast({ variant: "destructive", description: axiosErrorCatch(error) });
    }
  };

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
      <h1 className="text-2xl sm:text-3xl font-semibold mb-4">Members</h1>

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
          {community?.members.map((member) => (
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
              {member.user._id !== user?._id && (
                <td className="py-2 px-4">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        title="Kick Member"
                        variant="destructive"
                        size="icon">
                        <UserRoundX strokeWidth={1.2} />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you sure you want to kick {member.user.username}?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          The user will be removed from the community members
                          list and all his permissions will be revoked.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel asChild>
                          <Button variant="secondary">Cancel</Button>
                        </AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-red-600 hover:bg-red-700 text-white"
                          onClick={() => handleKickUser(member.user.username)}>
                          Kick Member
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
