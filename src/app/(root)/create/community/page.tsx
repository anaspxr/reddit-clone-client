import CreateCommunity from "@/components/create-community/create-community";
import React from "react";

export default function page() {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Tell us About your community</h1>
      <p className="text-sm text-secondary-foreground">
        A name and description help people understand what your community is all
        about.
      </p>
      <CreateCommunity />
    </div>
  );
}
