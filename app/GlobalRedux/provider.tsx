'use client';

import { Provider } from 'react-redux';
import { createWrapper } from 'next-redux-wrapper';
import React, { ReactNode } from 'react';
import { store } from './store'; 

interface ProvidersProps {
    children: ReactNode;
}

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export const Providers = ({ children }: ProvidersProps) => (
  <Provider store={store}>
    {children}
  </Provider>
);
