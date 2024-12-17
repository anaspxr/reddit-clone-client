"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";

export default function Disclaimer() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Button
        variant="link"
        onClick={() => setOpen(!open)}
        rounded="md"
        className="w-full justify-between px-0">
        Disclaimer!!
        <ChevronDown
          className={`${
            open && "rotate-180"
          } transition-transform duration-300`}
        />
      </Button>
      <p className="text-xs text-gray-500">
        This application is a clone inspired by Reddit!
      </p>
      {open && (
        <p className="text-xs text-gray-500">
          It is not affiliated with, endorsed by, or connected to Reddit or its
          parent company in any way. All trademarks, logos, and brand names are
          the property of their respective owners.
        </p>
      )}
    </div>
  );
}
