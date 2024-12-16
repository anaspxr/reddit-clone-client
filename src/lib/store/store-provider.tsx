"use client";

import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "@/lib/store";
import { hydrateUser } from "./async-thunks/user-thunks";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // todo: hydrate the user with redux-persist before tha api call

    // Hydrate the user data on app load with an api call
    setTimeout(() => {
      // the set time out is to avoid the hydration error
      storeRef.current?.dispatch(hydrateUser());
    }, 100);
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
