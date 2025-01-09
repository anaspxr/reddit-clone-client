"use client";

import {
  usePathname,
  useRouter,
  useSearchParams as useSearchParamsOriginal,
} from "next/navigation";
import { useCallback } from "react";

export default function useSearchParams() {
  const searchParams = useSearchParamsOriginal();
  const pathname = usePathname();
  const router = useRouter();

  const getNewPath = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) params.delete(name);
      else params.set(name, value);
      return pathname + "?" + params.toString();
    },
    [pathname, searchParams]
  );

  const setSearchParams = useCallback(
    (name: string, value: string | null) => {
      router.push(getNewPath(name, value));
    },
    [getNewPath, router]
  );

  return { searchParams, setSearchParams, getNewPath } as const;
}
