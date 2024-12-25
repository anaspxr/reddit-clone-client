import React, { useState } from "react";
import MaxLengthInput from "../ui/max-length-input";
import { CommunityValues } from "./create-community";
import MaxLengthTextarea from "../ui/max-length-textarea";
import { Button } from "../ui/button";
import { communityNameSchema } from "@/lib/form-validation/community";
import axios, { axiosErrorCatch } from "@/lib/axios";

export default function NameAndDesc({
  values,
  setStep,
  setValues,
}: {
  values: CommunityValues;
  setStep: (step: number) => void;
  setValues: React.Dispatch<React.SetStateAction<CommunityValues>>;
}) {
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    description: "",
  });
  const [blurred, setBlurred] = useState({
    name: false,
    description: false,
  });
  const buttonDisabled =
    !values.name ||
    !values.description ||
    !!fieldErrors.name ||
    !!fieldErrors.description;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { error: valError } = communityNameSchema.safeParse(e.target.value);
    if (valError) {
      setFieldErrors((prev) => ({ ...prev, name: valError.errors[0].message }));
    } else {
      setFieldErrors((prev) => ({ ...prev, name: "" }));
    }
    setValues((prev) => ({ ...prev, name: e.target.value }));
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (!e.target.value.trim())
      setFieldErrors((prev) => ({
        ...prev,
        description: "Description is required",
      }));
    else setFieldErrors((prev) => ({ ...prev, description: "" }));
    setValues((prev) => ({ ...prev, description: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setChecking(true);
    // check if another community exist with same name
    try {
      const { data } = await axios.get(`/community/check?name=${values.name}`, {
        withCredentials: true,
      });
      if (data.data === "AVAILABLE") {
        setStep(2);
      } else if (data.data === "TAKEN") {
        setFieldErrors((prev) => ({ ...prev, name: "Name is already taken" }));
      } else {
        setError("Something went wrong, please try again");
      }
    } catch (error) {
      setError(axiosErrorCatch(error));
    } finally {
      setChecking(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Tell us About your community</h1>
      <p className="text-sm text-muted-foreground mb-8">
        A name and description help people understand what your community is all
        about.
      </p>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <MaxLengthInput
            autoFocus
            className={fieldErrors.name ? "border-red-500" : ""}
            placeholder="Community Name"
            maxLength={20}
            value={values.name}
            onBlur={() => setBlurred((prev) => ({ ...prev, name: true }))}
            onChange={handleNameChange}
          />
          {checking && (
            <p className="text-xs px-4 text-secondary-foreground">
              Checking availability..
            </p>
          )}
          {fieldErrors.name && blurred.name && (
            <p className="text-xs px-4 text-red-500">{fieldErrors.name}</p>
          )}
        </div>

        <div className="space-y-2">
          <MaxLengthTextarea
            className={`h-40 ${
              fieldErrors.description ? "border-red-500" : ""
            }`}
            maxLength={500}
            value={values.description}
            onBlur={() =>
              setBlurred((prev) => ({ ...prev, description: true }))
            }
            onChange={handleDescriptionChange}
            placeholder="Description"
          />
          {fieldErrors.description && blurred.description && (
            <p className="text-xs px-4 text-red-500">
              {fieldErrors.description}
            </p>
          )}
        </div>
        {error && <p className="text-sm px-4 text-red-500">{error}</p>}
        <div className="mt-8 flex justify-end">
          <Button
            size="lg"
            className="bg-blue-700 hover:bg-blue-600 text-white"
            disabled={buttonDisabled || checking}>
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}
