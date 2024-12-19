"use client";

import { useState } from "react";
import SignupOptions from "./signup-options";
import OtpVerify from "./otp-verify";
import UserInfos from "./user-infos";

export default function SignUpForm() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  return (
    <div className="w-full max-w-lg border rounded-2xl py-8 sm:px-16 shadow-md space-y-4 m-auto p-4 relative">
      {step === 1 && <SignupOptions setEmail={setEmail} setStep={setStep} />}
      {step === 2 && <OtpVerify email={email} setStep={setStep} />}
      {step === 3 && <UserInfos email={email} />}
    </div>
  );
}
