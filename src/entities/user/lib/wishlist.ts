"use client";
import { useEffect } from "react";
import {
  AppDispatch,
  RootState,
  useAppSelector,
} from "../../../../app/GlobalRedux/store";
import { useAppStore } from '@/app/GlobalRedux/store';
import { fetchWishlistCars } from "../api/userSlice";
import { useSelector } from "react-redux";
import { useUser } from "./useUser";

export function useWishlist(
  requiresLogin: boolean = false
): [number[] | undefined | null, AppDispatch] {
  const [{ wishlist, isLoggedIn }, dispatch] = useUser(requiresLogin);
  const [ws] = useAppStore((state: RootState) => state.user);
  useEffect(() => {
    if (wishlist) return;
    if (!requiresLogin && !isLoggedIn) return;
    dispatch(fetchWishlistCars());
  }, [dispatch, isLoggedIn, requiresLogin, wishlist]);
  return [wishlist, dispatch];
}

export const WishlistProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [wishlist, dispatch] = useWishlist();
  return children;
};
