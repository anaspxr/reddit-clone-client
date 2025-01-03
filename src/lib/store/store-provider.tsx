"use client";

import { Provider } from "react-redux";
import React, { Suspense, useRef } from "react";
import { type Persistor, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { type AppStore, makeStore } from "@/lib/store";
import MainSkeleton from "@/components/skeletons/main-skeleton";
import HydrateUser from "./hydrate-user";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(null);
  const persistorRef = useRef<Persistor>({} as Persistor);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    persistorRef.current = persistStore(storeRef.current);
  }

  return (
    <Provider store={storeRef.current}>
      <Suspense>
        <HydrateUser />
      </Suspense>
      <PersistGate loading={<MainSkeleton />} persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
