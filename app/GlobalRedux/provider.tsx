"use client";

import { Provider } from "react-redux";
import { createWrapper } from "next-redux-wrapper";
import React, { ReactNode, useEffect, useRef } from "react";
import { AppStore, makeStore } from "./store";
import { fetchAndSetUser } from "../../src/shared/utils/user";
import { ThemeProvider } from "@/components/global/ThemeProvider";
import { Locale } from "@/src/app/i18n.config";
import { PageData } from "@/types";
import { setDict, setParams } from "@/src/shared/model/page-data";

interface ProvidersProps {
  children: ReactNode;
 dict: PageData;
 params: any;
}

export const Providers = ({ children, dict, params }: ProvidersProps) => {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }
  useEffect(() => {
    if (!storeRef.current) return;
    const dispatch = storeRef.current.dispatch;
    fetchAndSetUser(dispatch);
    dispatch(setDict(dict));
    dispatch(setParams(params));
  }, []);
  return (
    <Provider store={storeRef.current}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </Provider>
  );
};
