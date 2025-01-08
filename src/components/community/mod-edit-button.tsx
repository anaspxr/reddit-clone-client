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
import { Shield, ShieldXIcon } from "lucide-react";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";

export default function ModEditButton({
  isMod,
  member,
  communityName,
  refetch,
}: {
  isMod: boolean;
  member: {
    user: {
      username: string;
    };
  };
  communityName: string;
  refetch: () => void;
}) {
  const handleClick = async () => {
    try {
      if (isMod) {
        await axios.delete(
          `/community/${communityName}/members/${member.user.username}/moderator`,
          {
            withCredentials: true,
          }
        );
      } else {
        await axios.put(
          `/community/${communityName}/members/${member.user.username}/moderator`,
          {
            withCredentials: true,
          }
        );
      }
      refetch();
    } catch (error) {
      toast({ variant: "destructive", description: axiosErrorCatch(error) });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          title={isMod ? "Revoke mod access" : "Make moderator"}
          variant={isMod ? "destructive" : "blue"}
          size="icon">
          {isMod ? (
            <ShieldXIcon strokeWidth={1.2} />
          ) : (
            <Shield strokeWidth={1.2} />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isMod
              ? `Revoke moderator access from ${member.user.username}?`
              : `Make ${member.user.username} a moderator?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {isMod
              ? "The user will lose all moderator permissions and will be demoted to a regular member."
              : "The user will be granted moderator permissions and will be able to manage the community."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="secondary">Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction
            className={isMod ? "bg-red-600 hover:bg-red-700 text-white" : ""}
            onClick={handleClick}>
            {isMod ? "Revoke Mod Access" : "Make Moderator"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
