"use client";

import { useAppDispatch, useAppSelector } from "@/lib/store";
import { getUserProfile } from "@/lib/store/async-thunks/user-thunks";
import { useEffect } from "react";

export default function DispatchDataFetch() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      dispatch(getUserProfile(user.username));
    }
  }, [dispatch, user]);
  return null;
}
