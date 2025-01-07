"use client";

import React, { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Label } from "@/components/ui/label";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SettingsChildProps } from "@/components/user-settings/settings-item-container";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { useParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQueryClient } from "@tanstack/react-query";

export default function CommunityType({ setOpen }: SettingsChildProps) {
  const { communityName } = useParams();
  const queryClient = useQueryClient();
  const currentType = (
    queryClient.getQueryData(["community", communityName]) as {
      type: "public" | "private" | "restricted";
    }
  )?.type;
  const [value, setValue] = useState<string>(currentType);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await axios.put(`/community/${communityName}/type`, {
        type: value,
      });
      setOpen(false);
    } catch (error) {
      setError(axiosErrorCatch(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="display-name">
        <Label htmlFor="name" className="font-semibold text-sm">
          Select a community type
        </Label>
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger>
            <SelectValue placeholder="Select a fruit" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Community Type</SelectLabel>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
              <SelectItem value="restricted">Restricted</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="ghost">
            Cancel
          </Button>
        </DialogClose>
        <Button disabled={loading} type="submit" form="display-name">
          {loading ? "Saving.." : "Update"}
        </Button>
      </DialogFooter>
    </>
  );
}
