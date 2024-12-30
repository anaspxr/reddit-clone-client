import React, { useState } from "react";
import { Button } from "../ui/button";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { toast } from "@/hooks/use-toast";
import { useAppSelector } from "@/lib/store";
import { useRouter } from "next/navigation";

export default function ReactButton({
  postId,
  votes,
  userReaction,
}: {
  postId: string;
  votes: number;
  userReaction?: "downvote" | "upvote";
}) {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  const [count, setCount] = useState(votes);
  const [loading, setLoading] = useState(false);
  const [currentReaction, setReaction] = useState(userReaction);

  const handleReact = async (reaction: "upvote" | "downvote") => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.put(
        "/post/react",
        {
          postId,
          reaction,
        },
        { withCredentials: true }
      );
      setReaction((prev) => (prev === reaction ? undefined : reaction));
      setCount(data.data.votes);
    } catch (error) {
      toast({
        title: "Error",
        description: axiosErrorCatch(error),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className="bg-secondary rounded-3xl flex items-center gap-1"
      onClick={(e) => e.preventDefault()}>
      <Button
        disabled={loading}
        onClick={() => handleReact("upvote")}
        title="upvote"
        variant="secondary"
        size="sm"
        className="hover:bg-gray-300 dark:hover:bg-gray-600 px-0 h-8 w-8">
        <ArrowBigUp
          className={currentReaction === "upvote" ? "text-main" : ""}
          strokeWidth={1.2}
          size={20}
        />
      </Button>
      <p>{count}</p>
      <Button
        disabled={loading}
        onClick={() => handleReact("downvote")}
        title="downvote"
        variant="secondary"
        size="sm"
        className="hover:bg-gray-300 dark:hover:bg-gray-600 px-0 h-8 w-8">
        <ArrowBigDown
          className={currentReaction === "downvote" ? "text-main" : ""}
          strokeWidth={1.2}
          size={20}
        />
      </Button>
    </div>
  );
}
