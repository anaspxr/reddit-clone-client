import { ChevronRight } from "lucide-react";
import Link from "next/link";
import DeleteAccount from "./delete-account";

export default function AccountSettings() {
  return (
    <div>
      <h2 className="text-lg font-semibold border-b">Account</h2>
      <div className="space-y-6 py-4">
        <Link href="/login/reset-password">
          <button className="group flex items-center justify-between text-start w-full">
            <div>
              <h3>Reset password</h3>
              <p className="text-sm text-gray-500">Change your password</p>
            </div>
            <ChevronRight
              width={40}
              height={40}
              className="bg-transparent p-2 rounded-full group-hover:bg-gray-200 dark:group-hover:bg-gray-800 transition-colors duration-200"
              strokeWidth={1.2}
            />
          </button>
        </Link>
        <DeleteAccount />
      </div>
    </div>
  );
}
