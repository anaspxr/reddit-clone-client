import Link from "next/link";
import { Button } from "./button";

type ErrorPageProps = {
  title: string;
  description?: string;
  redirect?: {
    message: string;
    to: string;
  };
};

export default function ErrorPage({
  title,
  description,
  redirect = {
    message: "Go back to home page",
    to: "/",
  },
}: ErrorPageProps) {
  return (
    <div className="h-screen flex items-center flex-col justify-center gap-4">
      <h1 className="text-3xl">{title}</h1>
      <p className=" text-gray-700 dark:text-gray-400 px-4">{description}</p>
      <Link href={redirect.to}>
        <Button className="bg-main hover:bg-main text-white hover:opacity-80">
          {redirect.message}
        </Button>
      </Link>
    </div>
  );
}
