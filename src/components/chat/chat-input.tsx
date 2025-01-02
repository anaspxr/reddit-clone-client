import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { SendHorizonal } from "lucide-react";
import socket from "@/lib/socket";
import { useAppDispatch } from "@/lib/store";
import { addMessage } from "@/lib/store/slices/chatSlice";

export default function ChatInput({
  sender,
  receiver,
}: {
  sender: string;
  receiver: string;
}) {
  const dispatch = useAppDispatch();
  const [message, setMessage] = useState("");
  const handleSend = (e: React.FormEvent) => {
    if (!message) return;

    e.preventDefault();
    socket.emit("message", {
      message: message,
      sender: sender,
      receiver: receiver,
    });
    dispatch(
      addMessage({
        _id: Math.random().toString(36).substr(2, 9),
        message: message,
        sender: sender,
        receiver: receiver,
        createdAt: new Date().toISOString(),
      })
    );
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex gap-1 items-center w-full sm:px-8">
      <Input
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        autoFocus
        placeholder="Enter your message"
        className="h-10"
      />
      <Button variant="ghost" className="h-10 w-10 p-1">
        <SendHorizonal size={25} strokeWidth={1.5} />
      </Button>
    </form>
  );
}
