"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

type SettingsItemProps = {
  Component({
    setOpen,
  }: {
    setOpen: (open: boolean) => void;
  }): React.JSX.Element;
  label: string;
  description?: string;
};

export function SettingsItem({
  Component,
  label,
  description,
}: SettingsItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group flex items-center justify-between text-start w-full">
          <div>
            <h3>{label}</h3>
            <p className="text-sm text-gray-500">{description}</p>
          </div>
          <ChevronRight
            width={40}
            height={40}
            className="bg-transparent p-2 rounded-full group-hover:bg-gray-200 dark:group-hover:bg-gray-800 transition-colors duration-200"
            strokeWidth={1.2}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{label}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <Component setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
