"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type ReactNode, useState, useEffect } from "react";
import { type State, WagmiProvider } from "wagmi";
import { cookieToInitialState } from "wagmi";
import { getConfig } from "@/wagmi";

export function Providers(props: { children: ReactNode }) {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());
  const [initialState, setInitialState] = useState<State | undefined>(
    undefined
  );

  useEffect(() => {
    const initial = cookieToInitialState(getConfig(), document.cookie);
    setInitialState(initial ?? undefined);
  }, []);

  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
