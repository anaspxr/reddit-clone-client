import React, { useState } from "react";
import { Button } from "../ui/button";
import { ICommunity } from "@/lib/types/communityTypes";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent } from "../ui/dropdown-menu";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function JoinButton({
  community,
  refetch,
}: {
  community: ICommunity;
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<ICommunity, Error>>;
}) {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();

  if (community.role === "admin" || community.role === "moderator")
    return <AdminButton communityName={community.name} role={community.role} />;
  if (community.role === "pending")
    return <PendingButton refetch={refetch} name={community.name} />;
  if (community.role)
    return <JoinedButton refetch={refetch} name={community.name} />;

  const handleJoin = async () => {
    if (!user) {
      router.push("/login");
      return;
    }
    try {
      await axios.post(
        "/community/join",
        { name: community.name },
        { withCredentials: true }
      );
      if (community.type !== "public") {
        toast({
          title: "Request sent!",
          description:
            "Your join request has been sent to the community moderators",
        });
      }
      refetch();
    } catch (error) {
      toast({
        title: "Could not join community",
        description: axiosErrorCatch(error),
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleJoin}
      variant={community.role ? "outline" : "blue"}
      size="sm"
      className="px-4">
      join
    </Button>
  );
}

function JoinedButton({
  name,
  refetch,
}: {
  name: string;
  refetch: () => void;
}) {
  const [open, setOpen] = useState(false);
  const handleLeave = async () => {
    try {
      await axios.post("/community/leave", { name }, { withCredentials: true });
      setOpen(false);
      refetch();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: axiosErrorCatch(error),
        variant: "destructive",
      });
    }
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Joined
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="text-sm flex items-center gap-2 px-4 py-2">
        <p>Leave community?</p>

        <Button onClick={handleLeave} rounded="md" variant="default">
          Leave
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PendingButton({
  name,
  refetch,
}: {
  name: string;
  refetch: () => void;
}) {
  const [open, setOpen] = useState(false);
  const handleCancel = async () => {
    try {
      await axios.post(
        "/community/cancel-request",
        { name },
        { withCredentials: true }
      );
      setOpen(false);
      refetch();
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: axiosErrorCatch(error),
        variant: "destructive",
      });
    }
  };
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          Request Pending
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="text-sm flex items-center gap-2 px-4 py-2">
        <p>Cancel request?</p>

        <Button onClick={handleCancel} rounded="md" variant="default">
          Yes
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AdminButton({
  communityName,
  role,
}: {
  communityName: string;
  role: string;
}) {
  return (
    <Link href={`/r/${communityName}/settings`}>
      <Button variant="outline" size="sm">
        <Settings strokeWidth={1.2} size={15} />
        {role === "admin" ? "Admin" : "Moderator"}
      </Button>
    </Link>
  );
}
