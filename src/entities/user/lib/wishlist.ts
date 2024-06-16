"use client";
import { useEffect } from "react";
import {
  AppDispatch,
  RootState,
  useAppSelector,
} from "../../../../app/GlobalRedux/store";
import { useAppStore } from "../../../../app/GlobalRedux/useStore";
import { fetchWishlistCars } from "../api/userSlice";
import { useSelector } from "react-redux";

export function useWishlist(): [number[] | undefined, AppDispatch] {
  const [{ wishlist, isLoggedIn }, dispatch] = useAppStore(
    (state: RootState) => state.user
  );
  const [ws] = useAppStore((state: RootState) => state.user);
  useEffect(() => {
    if (wishlist || !isLoggedIn) return;
    dispatch(fetchWishlistCars());
  }, [dispatch, wishlist]);
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
