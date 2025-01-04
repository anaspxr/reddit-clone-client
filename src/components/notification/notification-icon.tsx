"use client";

import { Bell } from "lucide-react";
import { Button } from "../ui/button";

export default function NotificationIcon() {
  return (
    <Button variant="ghost" className="h-10 w-10 ">
      <Bell width={22} height={22} strokeWidth={1.2} />
    </Button>
  );
}
