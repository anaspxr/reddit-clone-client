"use client";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Suspense, useState } from "react";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Suspense>
  );
};

export default ReactQueryProvider;
