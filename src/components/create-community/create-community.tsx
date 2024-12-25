"use client";

import React, { useState } from "react";
import NameAndDesc from "./name-and-desc";

export type CommunityValues = {
  name: string;
  description: string;
  banner: File | null;
  icon: File | null;
  topics: string[];
  type: "public" | "restricted" | "private";
};

export default function CreateCommunity() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<CommunityValues>({
    name: "",
    description: "",
    banner: null,
    icon: null,
    topics: [],
    type: "public",
  });

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mt-8">
        {step === 1 && (
          <NameAndDesc
            setStep={setStep}
            setValues={setValues}
            values={values}
          />
        )}
        {step === 2 && <div>2</div>}
        {step === 3 && <div>3</div>}
        {![1, 2, 3].includes(step) && <div>4</div>}
        <div></div>
        {/* <div className="mt-8 flex justify-end gap-2">
          {step > 1 && (
            <Button
              size="lg"
              variant="secondary"
              onClick={() => setStep(step - 1)}>
              Back
            </Button>
          )}
          <Button
            size="lg"
            variant="secondary"
            disabled={buttonDisabled}
            onClick={() => setStep(step + 1)}>
            Next
          </Button>
        </div> */}
      </div>
    </div>
  );
}
