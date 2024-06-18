"use client";
import { useEffect } from "react";
import { useAppStore } from "../../../../app/GlobalRedux/useStore";
import { UserState, fetchUserData } from "../api/userSlice";
import { AppDispatch } from "../../../../app/GlobalRedux/store";

export function useUser(): [UserState, AppDispatch] {
  const [user, dispatch] = useAppStore((state) => state.user);
  useEffect(() => {
    if (!user.isLoggedIn) {
      // fetch user data
      dispatch(fetchUserData());
    }
  }, [dispatch, user.isLoggedIn]);

  return [user, dispatch];
}
