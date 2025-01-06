"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { AlertCircle, ChevronRight } from "lucide-react";
import { useFormik } from "formik";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import axios, { axiosErrorCatch } from "@/lib/axios";
import { logoutClearCookie } from "@/lib/actions/auth";

export default function DeleteAccount() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setError(null);
      try {
        await axios.post("/user/delete-account", values, {
          withCredentials: true,
        });
        await logoutClearCookie();
        window.location.href = "/";
      } catch (error) {
        setError(axiosErrorCatch(error));
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="group flex items-center justify-between text-start w-full    ">
          <div>
            <h3 className="flex items-center gap-2 text-red-600">
              Delete account
              <AlertCircle strokeWidth={1.2} />
            </h3>
            <p className="text-sm  text-red-400 dark:text-red-900 ">
              Proceed with caution!! This action cannot be undone and your
              account will be gone forever!!
            </p>
          </div>
          <ChevronRight
            width={40}
            height={40}
            color="red"
            className="bg-transparent p-2 rounded-full group-hover:bg-red-200 dark:group-hover:bg-red-800 transition-colors duration-200"
            strokeWidth={1.2}
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-500">Delete account</DialogTitle>
          <DialogDescription className="dark:text-red-600 ">
            Proceed with caution!! This action cannot be undone and your account
            will be gone forever!!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block">
              Username
            </label>
            <Input
              required
              placeholder="Your username"
              type="username"
              id="username"
              name="username"
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block">
              Password
            </label>
            <Input
              required
              placeholder="Your password"
              type="password"
              id="password"
              name="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button
            size="lg"
            variant="destructive"
            type="submit"
            disabled={isSubmitting}
            className="w-full">
            Delete account
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
