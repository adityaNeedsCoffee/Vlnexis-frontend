'use client'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useMemo } from 'react'

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { QueryClientProvider } from "@tanstack/react-query";

import { getQueryClient } from '../../../libs/get-query-client';
import { getPersister } from '../../../libs/persister';

export default function Provider({ children }) {
  const queryClient = getQueryClient();
  const persister = useMemo(() => getPersister(), []);



  const content = (
    <>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  );

  if (!persister) {
    return (
      <QueryClientProvider client={queryClient}>
        {content}
      </QueryClientProvider>
    );
  }

  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: 1000 * 60 * 60 * 24,
        dehydrateOptions: {
          shouldDehydrateQuery: (query) =>
            query.meta?.persist === true,
        },
      }}
    >
      {content}
    </PersistQueryClientProvider>
  );
}