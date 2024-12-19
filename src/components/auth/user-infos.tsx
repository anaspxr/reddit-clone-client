import axios from "@/lib/axios";
import { useFormik } from "formik";
import { useState } from "react";
import { z } from "zod";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { axiosErrorCatch } from "../../lib/axios";
import { useAppDispatch } from "@/lib/store";
import { stateLogin } from "@/lib/store/slices/userSlice";
import { setLoginCookie } from "@/lib/actions/auth";

const validationSchema = toFormikValidationSchema(
  z.object({
    username: z
      .string({ message: "Enter a valid username" })
      .min(3, "Username must be at least 3 characters long")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers and underscores"
      ),
    password: z
      .string({ message: "Enter a password" })
      .min(8, { message: "Password must be at least 8 characters long" }),

    confirmPassword: z.string({
      message: "Please confirm your password",
    }),
  })
);

export default function UserInfos({ email }: { email: string }) {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
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
    setErrors,
  } = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (values.password !== values.confirmPassword) {
        setErrors({
          confirmPassword: "Passwords do not match",
        });
        return;
      }
      try {
        const { data } = await axios.post(
          "/auth/register",
          {
            email,
            username: values.username,
            password: values.password,
          },
          {
            withCredentials: true,
          }
        );

        await setLoginCookie({ username: values.username });

        dispatch(stateLogin(data.data));

        router.push("/");
      } catch (error) {
        setError(axiosErrorCatch(error));
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            type="text"
            placeholder="Username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.username && touched.username && (
            <p className="text-red-500 text-sm">{errors.username}</p>
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
            tabIndex={-1} // Prevents the button from being focused when tabbing
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
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={values.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirmPassword && touched.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-main hover:bg-main py-4 hover:opacity-80 w-full h-12 font-semibold">
          {isSubmitting ? "Signing In.." : "Sign Up"}
        </Button>
      </form>
    </>
  );
}
