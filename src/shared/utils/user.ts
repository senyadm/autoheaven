"use client";
import { clientUsers, clientUsersForceAuth } from "@/src/shared/api/client";
import { setUser } from "../../entities/user/api/userSlice";
import { AppDispatch } from "../../../app/GlobalRedux/store";

// export const getUserInfo = async (token: string) => {
//   try {
//     await clientUsers.get("/api/users/me/", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return true;
//   } catch {
//     return false;
//   }
// };

export function fetchAndSetUser(dispatch: AppDispatch, forceAuth = false) {
  const client = forceAuth ? clientUsersForceAuth : clientUsers;
  client
    .get("/api/users/me/")
    .then((userResponse) => {
      dispatch(setUser(userResponse.data));
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}
