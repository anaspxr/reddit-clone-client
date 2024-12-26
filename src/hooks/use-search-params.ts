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

  const setSearchParam = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value === null) params.delete(name);
      else params.set(name, value);
      router.push(pathname + "?" + params.toString());
    },
    [pathname, router, searchParams]
  );

  return [searchParams, setSearchParam] as const;
}
