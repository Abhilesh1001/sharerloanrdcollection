"use client"

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
const queryClient = new QueryClient()

interface ProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<ProviderProps> = ({ children }: ProviderProps) => {
  return (
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      {children}
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default AppProvider;