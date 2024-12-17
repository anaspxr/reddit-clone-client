"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useAppDispatch, useAppSelector } from "@/lib/store";
import { DialogFooter } from "../ui/dialog";
import { Button } from "../ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { aboutSchema } from "@/lib/form-validation/user-profile";
import { updateUserAbout } from "@/lib/store/async-thunks/user-thunks";

export default function AboutDescription({
  setOpen,
}: {
  setOpen: (open: boolean) => void;
}) {
  const { userProfile } = useAppSelector((state) => state.user);
  const [value, setValue] = useState(userProfile?.about || "");
  const [blurred, setBlurred] = useState(false);
  const [error, setError] = useState<string | null>("");
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { error: valError } = aboutSchema.safeParse(e.target.value);
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
    const { error: valError } = aboutSchema.safeParse(value);
    if (valError) {
      setError(valError.errors[0].message);
      return;
    }

    dispatch(updateUserAbout(value));
    setOpen(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit} id="about">
        <Label htmlFor="name" className="font-semibold text-sm">
          Change About description
        </Label>
        <Input
          onChange={handleChange}
          onBlur={() => setBlurred(true)}
          id="name"
          name="name"
          placeholder={userProfile?.about}
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
        <Button type="submit" form="about">
          Save changes
        </Button>
      </DialogFooter>
    </>
  );
}
