"use client";

import { Provider } from "react-redux";
import React, { useEffect, useRef } from "react";
import { type Persistor, persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { type AppStore, makeStore } from "@/lib/store";
import { hydrateUser } from "./async-thunks/user-thunks";
import Spinner from "@/components/ui/spinner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  // hydrate user on first load and set session_ended if token is expired
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const setSessionEnded = () => {
      const params = new URLSearchParams(searchParams.toString());

      if (!params.has("session_ended")) {
        params.set("session_ended", "true");
        router.push(pathname + "?" + params.toString());
      }
    };
    storeRef.current?.dispatch(hydrateUser(setSessionEnded));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // should only run on first load

  return (
    <Provider store={storeRef.current}>
      <PersistGate
        loading={
          <div className="h-screen w-screen flex items-center justify-center">
            <Spinner />
          </div>
        }
        persistor={persistorRef.current}>
        {children}
      </PersistGate>
    </Provider>
  );
}
