"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getUserProfile } from "@/lib/store/async-thunks/user-thunks";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DispatchDataFetch() {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
    if (user) {
      dispatch(getUserProfile(user.username));
    }
  }, [dispatch, loading, router, user]);
  return null;
}
