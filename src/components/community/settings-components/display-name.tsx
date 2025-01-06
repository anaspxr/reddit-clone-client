"use client";

import React, { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { displayNameSchema } from "@/lib/form-validation/user-profile";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { SettingsChildProps } from "@/components/user-settings/settings-item-container";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { useParams } from "next/navigation";

export default function Displayname({ setOpen }: SettingsChildProps) {
  const [value, setValue] = useState("");
  const [blurred, setBlurred] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>("");
  const { communityName } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { error: valError } = displayNameSchema.safeParse(e.target.value);
    if (valError) {
      setError(valError.errors[0].message);
    } else {
      setError(null);
    }
    setValue(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error: valError } = displayNameSchema.safeParse(value);
    if (valError) {
      setError(valError.errors[0].message);
      return;
    }
    try {
      await axios.post(`/community/${communityName}/displayname`, {
        displayName: value,
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
          Change Display Name
        </Label>
        <Input
          onChange={handleChange}
          onBlur={() => setBlurred(true)}
          id="name"
          name="name"
          value={value}
        />
        {error && blurred && <p className="text-sm text-red-500">{error}</p>}
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
