"use client";

import { io } from "socket.io-client";
import axios from "./axios";

const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL, { autoConnect: false });

export const connectSocket = async () => {
  const { data } = await axios.get("/user/socket-pass", {
    withCredentials: true,
  });
  const pass = data.data.pass;

  if (!socket.connected) {
    socket.auth = { pass };
    socket.connect();
  }
  socket.on("connect_error", (err) => {
    console.error("socket error:", err);
  });
  if (pass) {
    socket.emit("join");
  }
};

export default socket;
