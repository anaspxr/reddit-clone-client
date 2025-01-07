import React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import useSearchParams from "@/hooks/use-search-params";
import Avatar from "../ui/avatar";
import dayjs from "dayjs";
import { Button } from "../ui/button";
import { Check, X } from "lucide-react";
import Link from "next/link";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

export default function JoinRequests({
  communityName,
  refetch,
  members,
}: {
  communityName: string;
  refetch: () => void;
  members: {
    user: {
      _id: string;
      username: string;
      avatar: string;
    };
    role: string;
    createdAt: string;
  }[];
}) {
  const [loading, setLoading] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const open = searchParams.get("requests") === "true";
  const requests = members.filter((member) => member.role === "pending");

  const handleAccept = async (username: string) => {
    setLoading(true);
    try {
      await axios.put(
        `/community/${communityName}/members/${username}/accept`,
        null,
        {
          withCredentials: true,
        }
      );
      refetch();
    } catch (error) {
      toast({
        title: "Error while accepting request",
        description: axiosErrorCatch(error),
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (username: string) => {
    setLoading(true);
    try {
      await axios.put(
        `/community/${communityName}/members/${username}/reject`,
        null,
        {
          withCredentials: true,
        }
      );
      refetch();
    } catch (error) {
      toast({
        title: "Error while rejecting request",
        description: axiosErrorCatch(error),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(open) =>
        setSearchParams("requests", open ? "true" : null)
      }>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join Requests</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          There are <span>{requests.length}</span> join request
          {requests.length > 1 ? "s" : ""}.
        </DialogDescription>
        <div className="flex flex-col gap-4">
          {requests.map((member) => (
            <div
              key={member.user._id}
              className="flex items-center justify-between gap-4">
              <Link
                href={`/u/${member.user.username}`}
                className="flex gap-2 items-center group">
                <Avatar src={member.user.avatar} className="w-8 h-8" />
                <div>
                  <p className="text-sm group-hover:underline">
                    u/{member.user.username}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    On {dayjs(member.createdAt).format("MMMM D, YYYY")}
                  </p>
                </div>
              </Link>
              <div className="flex gap-2 items-center">
                <Button
                  disabled={loading}
                  variant="main"
                  size="sm"
                  onClick={() => {
                    handleAccept(member.user.username);
                  }}>
                  <Check strokeWidth={1.5} size={20} /> Accept
                </Button>
                <Button
                  disabled={loading}
                  variant="destructive"
                  size="sm"
                  onClick={() => {
                    handleReject(member.user.username);
                  }}>
                  <X strokeWidth={1.5} size={20} /> Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
