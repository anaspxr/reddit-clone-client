"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/store";
import { stateLogin } from "@/lib/store/slices/userSlice";
import { setLoginCookie } from "@/lib/actions/auth";
import { connectSocket } from "@/lib/socket";

const validationSchema = toFormikValidationSchema(
  z.object({
    email: z.string({ message: "User name is required" }),
    password: z.string({ message: "Enter your password" }),
  })
);

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setError(null);
      try {
        const { data } = await axios.post("/auth/login", values, {
          withCredentials: true,
        });

        await setLoginCookie({ username: data.data.username });
        dispatch(stateLogin(data.data));
        await connectSocket();
        router.push("/");
      } catch (error) {
        setError(axiosErrorCatch(error));
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="w-full max-w-lg border rounded-2xl py-8 sm:px-16 shadow-md space-y-4 m-auto p-4 relative">
      <div>
        <h1 className="text-2xl font-semibold">Log In</h1>
      </div>
      {/* <div className="flex justify-between items-center rounded-full border shadow-sm p-2 hover:bg-gray-100 cursor-pointer">
        <p className="text-sm text-gray-600">Sign In with google</p>
        <Image src="/images/google-logo.png" width={20} height={20} alt="G" />
      </div>
      <div className="flex items-center space-x-2">
        <div className="border-b w-1/2"></div>
        <p className="text-gray-500 text-sm">OR</p>
        <div className="border-b w-1/2"></div>
      </div> */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email">Username or Email</Label>
          <Input
            placeholder="Username or email"
            id="email"
            name="email"
            type="text"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.email && touched.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div className="relative">
          <Label htmlFor="password">Password</Label>
          <Input
            autoComplete="new-password"
            className="pr-12"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
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
        <p className="text-sm">
          <Link href="/resetpassword" className="text-blue-500 hover:underline">
            Forgot password?
          </Link>
        </p>
        <p className="text-sm text-gray-700">
          New to Reddit?{" "}
          <Link href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-500">{error}</p>}

        <Button
          type="submit"
          disabled={isSubmitting}
          variant="main"
          className="w-full h-12">
          {isSubmitting ? "Logging In.." : "Log In"}
        </Button>
      </form>
    </div>
  );
}
