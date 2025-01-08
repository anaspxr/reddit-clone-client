import React from "react";
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
import { UserRoundX } from "lucide-react";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

export default function KickUserButton({
  member,
  communityName,
  refetch,
}: {
  member: {
    user: {
      username: string;
    };
  };
  communityName: string;
  refetch: () => void;
}) {
  const handleKickUser = async () => {
    try {
      await axios.delete(
        `/community/${communityName}/members/${member.user.username}`,
        {
          withCredentials: true,
        }
      );
      refetch();
    } catch (error) {
      toast({ variant: "destructive", description: axiosErrorCatch(error) });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button title="Kick Member" variant="destructive" size="icon">
          <UserRoundX strokeWidth={1.2} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to kick {member.user.username}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            The user will be removed from the community members list and all his
            permissions will be revoked.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="secondary">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600 hover:bg-red-700 text-white"
            onClick={handleKickUser}>
            Kick Member
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
