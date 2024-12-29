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

  if (community.role === "admin") return <AdminButton />;
  if (community.role === "moderator") return <ModeratorButton />;
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
      size="lg"
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
        <Button variant="outline" size="lg">
          Joined
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="text-sm flex items-center gap-2 px-4 py-2">
        <p>Leave community?</p>

        <Button onClick={handleLeave} rounded="md" variant="default">
          Leave
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AdminButton() {
  return (
    <Button variant="outline" size="lg">
      Admin
    </Button>
  );
}

function ModeratorButton() {
  return (
    <Button variant="outline" size="lg">
      Moderator
    </Button>
  );
}
