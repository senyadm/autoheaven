import exp from "constants";
import { userSlice } from "./api/userSlice";

export const {
  setUser,
  addToWishlist,
  deleteFromWishlist,
  setWishlist,
  setCars,
  logOut,
} = userSlice.actions;

export {
  fetchWishlistCars,
  addToWishlistThunk,
  deleteFromWishlistThunk,
} from "./api/userSlice";

export { useWishlist, WishlistProvider } from "./lib/wishlist";

export default userSlice.reducer;
