"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useAppSelector } from "@/lib/store";
import { useMemo, useState } from "react";
import Image from "next/image";
import useSearchParams from "@/hooks/use-search-params";

export default function SelectCommunity() {
  const [open, setOpen] = useState(false);
  const { communities, user } = useAppSelector((state) => state.user);
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(`community`)
    ? `r/${searchParams.get("community")}`
    : `u/${user?.username}`;

  const values = useMemo(
    () => [
      { name: `u/${user?.username}`, icon: user?.avatar },
      ...communities.map((c) => ({ name: `r/${c.name}`, icon: c.icon })),
    ],
    [communities, user]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between h-12">
          {value
            ? values.find((v) => v.name === value)?.name
            : "Select a community"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search communities..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {values.map((v) => (
                <CommandItem
                  className="cursor-pointer"
                  key={v.name}
                  value={v.name}
                  onSelect={(currentValue) => {
                    if (currentValue.startsWith(`u/`))
                      setSearchParams(`community`, null);
                    else setSearchParams(`community`, currentValue.slice(2));
                    setOpen(false);
                  }}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <Image
                        src={v.icon || "/images/avatar-default.png"}
                        height={50}
                        width={50}
                        alt="icon"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p> {v.name}</p>
                  </div>
                  <Check
                    className={cn(
                      "ml-auto",
                      value === v.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
