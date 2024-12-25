import React from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CommunityValues } from "./create-community";
import { Trash } from "lucide-react";

export default function BannerAndIcon({
  setStep,
  setValues,
  values,
}: {
  setStep: (step: number) => void;
  setValues: React.Dispatch<React.SetStateAction<CommunityValues>>;
  values: CommunityValues;
}) {
  const [error, setError] = React.useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1024 * 2024 * 2) {
      setError("Image size should be less than 2MB");
      return;
    }
    return file;
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Style your community</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Adding visual flair will catch new members attention and help establish
        your community’s culture! You can update this at any time.
      </p>
      <div className="space-y-4">
        <div className="flex justify-between gap-2 items-center">
          <Label htmlFor="banner">Banner</Label>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              id="banner"
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  banner: handleFileSelect(e) || null,
                }))
              }
              name="banner"
              className="cursor-pointer bg-secondary w-60"
            />
            {values.banner && (
              <Button
                size="icon"
                variant="secondary"
                onClick={() =>
                  setValues((prev) => ({ ...prev, banner: null }))
                }>
                <Trash strokeWidth={1.2} />
              </Button>
            )}
          </div>
        </div>
        <div className="flex justify-between gap-2 items-center">
          <Label htmlFor="icon">Icon</Label>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              id="icon"
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  icon: handleFileSelect(e) || null,
                }))
              }
              name="icon"
              className="cursor-pointer bg-secondary w-60"
            />
            {values.icon && (
              <Button
                size="icon"
                variant="secondary"
                onClick={() => setValues((prev) => ({ ...prev, icon: null }))}>
                <Trash strokeWidth={1.2} />
              </Button>
            )}
          </div>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="mt-8 flex justify-end gap-2">
        <Button size="lg" variant="secondary" onClick={() => setStep(1)}>
          Back
        </Button>

        <Button
          size="lg"
          className="bg-blue-700 hover:bg-blue-600 text-white"
          onClick={() => setStep(3)}>
          Next
        </Button>
      </div>
    </div>
  );
}
