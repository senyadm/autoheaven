"use client";

import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import React, { ReactNode } from "react";
import { store } from "./store";
import { PersistGate } from "redux-persist/integration/react";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => (
  <Provider store={store}>{children}</Provider>
);
