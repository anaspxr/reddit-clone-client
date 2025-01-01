import Link from "next/link";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { z } from "zod";

export default function SignupOptions({
  setStep,
  setEmail,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setEmail: (email: string) => void;
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { error } = z.string().email().safeParse(e.target.value);
    if (error) {
      setError("Please enter a valid email address");
    } else {
      setError(null);
    }
    setValue(e.target.value);
  };

  const handleContinue = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = z.string().email().safeParse(value);
    if (error) {
      setError("Please enter a valid email address");
      setTouched(true);
      setLoading(false);
    } else {
      try {
        await axios.get(`/auth/register/${value}`);
        setEmail(value);
        setStep(2);
      } catch (error) {
        setTouched(true);
        setError(axiosErrorCatch(error));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div>
        <h1 className="text-2xl font-semibold">Sign Up</h1>
        <p className="text-gray-700 text-sm">
          By continuing, you agree to our{" "}
          <Link className="text-blue-500 hover:underline" href={""}>
            User Agreement{" "}
          </Link>{" "}
          and acknowledge that you understand the{" "}
          <Link className="text-blue-500 hover:underline" href={""}>
            Privacy Policy.
          </Link>
        </p>
      </div>
      {/* <div className="flex justify-between items-center rounded-full border shadow-sm p-2 hover:bg-gray-100 cursor-pointer">
        <p className="text-sm text-gray-600">Sign In with google</p>
        <Image src="/images/google-logo.png" width={20} height={20} alt="G" />
      </div> */}

      {/* <div className="flex items-center space-x-2">
        <div className="border-b w-1/2"></div>
        <p className="text-gray-500 text-sm">OR</p>
        <div className="border-b w-1/2"></div>
      </div> */}

      <form onSubmit={handleContinue} className="space-y-4">
        <div className="space-y-2   ">
          <Label className="font-semibold" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={value}
            placeholder="Your email"
            onBlur={() => setTouched(true)}
            onChange={handleChange}
          />
          {error && touched && (
            <p className="text-sm ml-4 text-red-500">{error}</p>
          )}
        </div>

        <p className="text-gray-800 text-sm">
          Already a redditor?{" "}
          <Link href={"/login"} className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
        <Button disabled={loading} variant="main" className="w-full h-12">
          {loading ? "Loading..." : "Continue"}
        </Button>
      </form>
    </>
  );
}
