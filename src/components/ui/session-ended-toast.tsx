"use client";

import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { Button } from "./button";

export default function SessionEndedToast() {
  const { toast } = useToast();
  const sessionEnded = useSearchParams().get("session_ended");

  useEffect(() => {
    if (sessionEnded === null) return;

    const { dismiss } = toast({
      title: "Session Ended",
      description: "Your have been inactive for a while, please login again.",
      action: (
        <Link href="/login">
          <Button>Login</Button>
        </Link>
      ),
    });

    return () => dismiss();
  }, [sessionEnded, toast]);

  return null;
}
