"use client";

import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import React, { ReactNode } from "react";
import { persistor, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

interface ProvidersProps {
  children: ReactNode;
}

const makeStore = () => store;

export const wrapper = createWrapper(makeStore);

export const Providers = ({ children }: ProvidersProps) => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {children}
    </PersistGate>
  </Provider>
);
