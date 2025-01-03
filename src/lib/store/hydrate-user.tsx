import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { hydrateUser } from "./async-thunks/user-thunks";
import { useAppDispatch } from ".";

// the component uses useSearchParams. so it should be wrapped in a Suspense.
export default function HydrateUser() {
  //   hydrate user on first load and set session_ended if token is expired
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const setSessionEnded = () => {
      const params = new URLSearchParams(searchParams.toString());

      if (!params.has("session_ended")) {
        params.set("session_ended", "true");
        router.push(pathname + "?" + params.toString());
      }
    };
    dispatch(hydrateUser(setSessionEnded));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // should only run on first load
  return null;
}
