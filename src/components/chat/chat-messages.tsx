import { useAppSelector } from "@/lib/store";
import { cn, showMessageTime } from "@/lib/utils";
import React from "react";

export default function ChatMessages({
  userId,
  ref,
}: {
  userId: string;
  ref: React.RefObject<HTMLDivElement | null>;
}) {
  const { messages } = useAppSelector((state) => state.chat);

  return (
    <div
      ref={ref}
      className="flex flex-col gap-2 overflow-y-auto scrollbar-thin border-b p-2 pr-6">
      {messages.map((message, i) => {
        const time = showMessageTime(message, messages[i + 1]);
        return (
          <div
            key={message._id}
            className={cn("flex gap-2 items-center", {
              "justify-end": message.sender === userId,
              "justify-start": message.sender !== userId,
              "mb-4": time,
            })}>
            <p
              className={`py-1 min-w-16 relative px-4 rounded-b-xl shadow-md max-w-80 break-words ${
                message.sender === userId
                  ? "bg-blue-500 text-white rounded-tl-xl"
                  : "bg-gray-200 text-gray-800 rounded-tr-xl"
              }`}>
              {message.message}
              <span
                style={{
                  fontSize: "10px",
                }}
                className={cn("absolute -bottom-4", {
                  "text-gray-300 left-0": message.sender === userId,
                  "text-gray-600 right-0": message.sender !== userId,
                })}>
                {time}
              </span>
            </p>
          </div>
        );
      })}
    </div>
  );
}
