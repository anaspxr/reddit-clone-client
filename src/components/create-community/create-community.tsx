"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

type CommunityValues = {
  name: string;
  description: string;
  banner: File | null;
  icon: File | null;
  topics: string[];
  type: "public" | "private";
};

export default function CreateCommunity() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    banner: null,
    icon: null,
    topics: [],
    type: "public",
  });
  return (
    <div className="grid sm:grid-cols-2 gap-4">
      <div className="space-y-4">
        <Input placeholder="Community name" />
        <Textarea placeholder="Description" />
      </div>
    </div>
  );
}
