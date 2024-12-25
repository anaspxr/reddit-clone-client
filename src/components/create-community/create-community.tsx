"use client";

import React, { useState } from "react";
import NameAndDesc from "./name-and-desc";
import { CommunityCard1, CommunityCard2 } from "./community-card";
import BannerAndIcon from "./banner-and-icon";
import CommunityType from "./community-type";

export type CommunityValues = {
  name: string;
  description: string;
  banner: File | null;
  icon: File | null;
  type: "public" | "restricted" | "private";
};

export default function CreateCommunity() {
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<CommunityValues>({
    name: "",
    description: "",
    banner: null,
    icon: null,
    type: "public",
  });

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-x-16 mt-8">
        {step === 1 && (
          <NameAndDesc
            setStep={setStep}
            setValues={setValues}
            values={values}
          />
        )}
        {step === 2 && (
          <BannerAndIcon
            setValues={setValues}
            values={values}
            setStep={setStep}
          />
        )}
        {step === 3 && (
          <CommunityType
            values={values}
            setValues={setValues}
            setStep={setStep}
          />
        )}
        {step === 1 ? (
          <CommunityCard1 values={values} />
        ) : (
          // community card with icon and banner
          <CommunityCard2 values={values} />
        )}
      </div>
    </div>
  );
}
