import { clientUsers } from "@/app/GlobalRedux/client";

export const validateToken = async () => {
  const token = getToken();
  try {
    const resp = await clientUsers.get("/api/users/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("user info ", resp)
    return true;
  } catch {
    return false;
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
}