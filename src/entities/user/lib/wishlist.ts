"use client";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../../../../app/GlobalRedux/store";
import { useAppStore } from "../../../../app/GlobalRedux/useStore";
import { fetchWishlistCars } from "../api/userSlice";

export function useWishlist(): [number[] | undefined, AppDispatch] {
  const [wishlist, dispatch] = useAppStore(
    (state: RootState) => state.user.wishlist
  );
  useEffect(() => {
    if (wishlist) return;
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
