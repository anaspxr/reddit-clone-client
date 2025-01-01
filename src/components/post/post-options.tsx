import { Ellipsis, Trash } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { useToast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Post } from "@/lib/types/postTypes";
import AlertConfirm from "../ui/alert-confirm";

export default function PostOptions({
  type = "post",
  postId,
  hasAccess,
  queryKey,
  onSuccess = () => {},
}: {
  type?: "post" | "comment";
  postId: string;
  hasAccess: boolean;
  queryKey?: string[];
  onSuccess?: () => void;
}) {
  const queryClient = useQueryClient();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  const handleDelete = async () => {
    setIsDeleting(true);
    toast({ description: `Deleting ${type}..` });
    try {
      await axios.delete(`/${type}/${postId}`, { withCredentials: true });
      if (queryKey) {
        queryClient.setQueryData(queryKey, (old: Post[]) =>
          old?.filter((post) => post._id !== postId)
        );
      }
      toast({ title: `${type} deleted successfully` });
      onSuccess();
    } catch (error) {
      toast({
        title: `Couldn't delete ${type}`,
        description: axiosErrorCatch(error),
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      {hasAccess ? (
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Ellipsis size={20} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" sideOffset={-6}>
            <DropdownMenuItem
              disabled={isDeleting}
              onClick={() => setIsAlertOpen(true)}
              className="w-full text-red-500 focus:text-red-700 rounded-md cursor-pointer">
              <Trash size={15} /> Delete {type}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}
      <AlertConfirm
        title={`Are you sure want to delete this ${type}`}
        description={`This action cannot be undone`}
        onConfirm={handleDelete}
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
      />
    </div>
  );
}
