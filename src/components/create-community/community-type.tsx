import React, { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Earth } from "lucide-react";
import { CommunityValues } from "./create-community";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { useRouter } from "next/navigation";

export default function CommunityType({
  values,
  setStep,
  setValues,
}: {
  values: CommunityValues;
  setValues: React.Dispatch<React.SetStateAction<CommunityValues>>;
  setStep: (step: number) => void;
}) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateCommunity = async () => {
    setError(null);
    setLoading(true);
    try {
      const formData = new FormData();

      if (values.banner) formData.append("images", values.banner);
      
      if (values.icon) formData.append("images", values.icon);

      formData.append("name", values.name);
      formData.append("type", values.type);
      formData.append("description", values.description);
      await axios.post("/community", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      router.push(`/r/${values.name}`);
    } catch (error) {
      setError(axiosErrorCatch(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">
        What kind of community is this?
      </h1>
      <p className="text-sm text-muted-foreground mb-8">
        Decide who can view and contribute in your community. Only public
        communities show up in search. Important: Once set, you will need to
        submit a request to change your community type.
      </p>
      <div className="space-y-4">
        <RadioGroup
          value={values.type}
          className="my-8"
          onValueChange={(value) =>
            setValues((prev) => ({
              ...prev,
              type: value as "public" | "restricted" | "private",
            }))
          }>
          <div
            onClick={() => setValues((prev) => ({ ...prev, type: "public" }))}
            className={`flex items-center justify-between px-4 py-2 cursor-pointer ${
              values.type === "public" ? "bg-secondary" : ""
            }`}>
            <div className="flex items-center gap-2">
              <Earth strokeWidth={1.2} />
              <div>
                <h2>Public</h2>
                <p className="text-xs text-muted-foreground">
                  Anyone can view, post and comment to this community{" "}
                </p>
              </div>
            </div>
            <RadioGroupItem value="public" />
          </div>
          <div
            onClick={() =>
              setValues((prev) => ({ ...prev, type: "restricted" }))
            }
            className={`flex items-center justify-between cursor-pointer px-4 py-2 ${
              values.type === "restricted" ? "bg-secondary" : ""
            }`}>
            <div className="flex items-center gap-2">
              <Earth strokeWidth={1.2} />
              <div>
                <h2>Restricted</h2>
                <p className="text-xs text-muted-foreground">
                  Anyone can view but only approved users can contribute
                </p>
              </div>
            </div>
            <RadioGroupItem value="restricted" />
          </div>
          <div
            onClick={() => setValues((prev) => ({ ...prev, type: "private" }))}
            className={`flex items-center justify-between px-4 cursor-pointer py-2 ${
              values.type === "private" ? "bg-secondary" : ""
            }`}>
            <div className="flex items-center gap-2">
              <Earth strokeWidth={1.2} />
              <div>
                <h2>Private</h2>
                <p className="text-xs text-muted-foreground">
                  Only approved users can view and contribute
                </p>
              </div>
            </div>
            <RadioGroupItem value="private" />
          </div>
        </RadioGroup>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <p className="text-sm text-muted-foreground">
        By continuing, you agree to our{" "}
        <Link
          className="text-foreground underline"
          href="/policies/mode-of-conduct">
          Mod Code of Conduct
        </Link>{" "}
        and acknowledge that you understand the{" "}
        <Link
          className="text-foreground underline"
          href="/policies/content-policy">
          Reddit Content Policy
        </Link>
      </p>
      <div className="mt-8 flex justify-end gap-2">
        <Button size="lg" variant="secondary" onClick={() => setStep(2)}>
          Back
        </Button>
        <Button
          disabled={loading}
          size="lg"
          className="bg-blue-700 hover:bg-blue-600 text-white"
          onClick={handleCreateCommunity}>
          {loading ? "Creating..." : "Create Community"}
        </Button>
      </div>
    </div>
  );
}
