"use client";

import React from "react";
import SelectCommunity from "./select-community";
import SelectType from "./select-type";
import PostForm from "./post-form";

export default function CreatePost() {
  return (
    <div className="my-4 space-y-4">
      <SelectCommunity />
      <SelectType />
      <PostForm />
    </div>
  );
}
