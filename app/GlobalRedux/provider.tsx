"use client";

import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import React, { ReactNode, useEffect, useRef } from "react";
import { AppStore, makeStore } from "./store";
import { fetchAndSetUser } from "../../src/shared/utils/user";

interface ProvidersProps {
  children: ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  useEffect(() => {
    if (!storeRef.current) return;
    fetchAndSetUser(storeRef.current.dispatch);
  }, []);
  return <Provider store={storeRef.current}>{children}</Provider>;
};
