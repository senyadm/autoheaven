import { clientUsers } from "@/app/GlobalRedux/client";

export const getUserInfo = async (token: string) => {
  try {
    await clientUsers.get("/api/users/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return true;
  } catch {
    return false;
  }
};
