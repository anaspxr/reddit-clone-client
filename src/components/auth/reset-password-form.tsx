"use client";

import React, { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Eye, EyeOff } from "lucide-react";
import { z } from "zod";
import Link from "next/link";
import OtpVerify from "./otp-verify";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export default function ResetPasswordForm() {
  const [step, setStep] = useState<"email" | "otp" | "password">("email");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState<{
    email: boolean;
    password: boolean;
  }>({
    email: false,
    password: false,
  });
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    server: string;
  }>({
    email: "",
    password: "",
    server: "",
  });
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { error } = z.string().email().safeParse(e.target.value);
    if (error) {
      setErrors((prev) => ({
        ...prev,
        email: "Please enter a valid email address",
      }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { error } = z.string().min(8).safeParse(e.target.value);
    if (error) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 8 characters long",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
    setPassword(e.target.value);
  };

  const handleSubmit = async () => {
    switch (step) {
      case "email": {
        setLoading(true);
        setErrors({ email: "", password: "", server: "" });
        const { error } = z.string().email().safeParse(email);
        if (error) {
          setErrors((prev) => ({
            ...prev,
            email: "Please enter a valid email address",
          }));
          setTouched((prev) => ({ ...prev, email: true }));
          setLoading(false);
        } else {
          try {
            await axios.get(`/auth/reset-password/${email}`);
            setStep("otp");
          } catch (error) {
            setErrors((prev) => ({ ...prev, server: axiosErrorCatch(error) }));
          } finally {
            setLoading(false);
          }
        }
      }
      case "password": {
        try {
          await axios.post("/auth/reset-password", {
            email,
            newPassword: password,
          });
          toast({
            title: "Your password has been reset",
            description: "You can now login with your new password",
          });
          router.push("/login");
        } catch (error) {
          setErrors((prev) => ({ ...prev, server: axiosErrorCatch(error) }));
        }
        break;
      }
      default: {
        break;
      }
    }
  };
  return (
    <div className="w-full max-w-lg border rounded-2xl py-8 sm:px-16 shadow-md m-auto p-4 relative">
      <div>
        <h1 className="text-2xl font-semibold">Reset Password</h1>
      </div>
      <p className="text-sm my-2">
        <Link href="/login" className="text-blue-500 hover:underline">
          Back to login
        </Link>
      </p>
      <div className={`mt-8 ${step === "email" ? "mb-16" : "mb-6"}`}>
        <Label htmlFor="email">Email</Label>
        <Input
          disabled={step !== "email"}
          autoFocus
          placeholder="Your registered email address"
          id="email"
          name="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
          onBlur={() => setTouched((prev) => ({ ...prev, email: true }))}
        />
        {errors.email && touched.email && (
          <p className="text-red-500 text-sm">{errors.email}</p>
        )}
      </div>

      {step === "otp" && (
        <OtpVerify
          setBack={() => setStep("email")}
          email={email}
          setStep={() => setStep("password")}
        />
      )}

      {step === "password" && (
        <div className="relative my-4">
          <Label htmlFor="password">New Password</Label>
          <Input
            autoComplete="new-password"
            className="pr-12"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your new password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
          />
          {errors.password && touched.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
          <Button
            tabIndex={-1} // prevents the button from being focused when tabbing
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-2 top-11 transform -translate-y-1/2 cursor-pointer text-gray-700"
            onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <Eye strokeWidth={1.2} />
            ) : (
              <EyeOff strokeWidth={1.2} />
            )}
          </Button>
        </div>
      )}

      {errors.server && (
        <p className="my-2 text-red-500 text-sm">{errors.server}</p>
      )}

      {step !== "otp" &&
        (loading ? (
          <Button disabled variant="main" className="w-full h-12">
            {step === "email" && "Sending Otp.."}
            {step === "password" && "Resetting.."}
          </Button>
        ) : (
          <Button
            disabled={loading}
            onClick={handleSubmit}
            variant="main"
            className="w-full h-12">
            {step === "email" && "Send OTP"}
            {step === "password" && "Reset Password"}
          </Button>
        ))}
    </div>
  );
}
