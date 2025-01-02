"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useRef } from "react";
import Avatar from "../ui/avatar";
import socket from "@/lib/socket";
import ChatInput from "./chat-input";
import { useQuery } from "@tanstack/react-query";
import axios, { axiosErrorCatch } from "@/lib/axios";
import Spinner from "../ui/spinner";
import ErrorPage from "../ui/error-page";
import { addMessage, setMessages } from "@/lib/store/slices/chatSlice";
import ChatMessages from "./chat-messages";

type ChatData = {
  personName: string;
  userId: string;
  personId: string;
  displayName: string;
  avatar?: string;
  messages: { message: string; createdAt: string }[];
};

export default function ChatInterface() {
  const personName = useSearchParams().get("u");
  const dispatch = useAppDispatch();
  const scrollRef = useRef<HTMLDivElement>(null);
  const { messages } = useAppSelector((state) => state.chat);

  const {
    data: chatData,
    error,
    isLoading,
  } = useQuery<ChatData>({
    queryKey: ["messages", personName],
    queryFn: async () => {
      const { data } = await axios.get(`/chat?personName=${personName}`, {
        withCredentials: true,
      });
      dispatch(setMessages(data.data.messages));
      return data.data;
    },
  });

  useEffect(() => {
    if (chatData) {
      if (!socket.connected && chatData.userId) {
        socket.auth = { userId: chatData.userId };
        socket.connect();
      }
      socket.on("connect_error", (err) => {
        console.error("socket error:", err);
      });

      if (chatData.userId) {
        socket.emit("join", chatData.userId);
      }
    }
  }, [chatData]);

  useEffect(() => {
    const onMessage = (message: {
      _id: string;
      sender: string;
      receiver: string;
      message: string;
      createdAt: string;
    }) => {
      if (message?.sender === chatData?.personId) {
        dispatch(addMessage(message));
      }
    };
    socket.on("message", onMessage);
    return () => {
      socket.off("message");
    };
  }, [chatData?.personId, dispatch]);

  useEffect(() => {
    // Scroll to bottom whenever new message is added
    const timeout = setTimeout(() => {
      if (scrollRef.current)
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, 100);
    return () => clearTimeout(timeout);
  }, [messages]);

  if (!personName) return null;

  return isLoading ? (
    <div className="h-full flex items-center justify-center">
      <Spinner />
    </div>
  ) : error ? (
    <ErrorPage
      title="Some error occurred!!"
      description={axiosErrorCatch(error)}
    />
  ) : chatData ? (
    <div className="h-[calc(100vh-57px)] flex flex-col">
      <div className="p-2 border-b-2 shadow-md flex items-center gap-2">
        <Avatar src={chatData.avatar} className="w-8 h-8" />
        <p className="text-muted-foreground">{chatData.displayName}</p>
        {chatData.userId === chatData.personId && <p>{"(You)"}</p>}
      </div>
      <div className="flex flex-col h-[calc(100vh-107px)] justify-end  py-4 space-y-2">
        <ChatMessages ref={scrollRef} userId={chatData.userId} />
        <ChatInput sender={chatData.userId} receiver={chatData.personId} />
      </div>
    </div>
  ) : null;
}
