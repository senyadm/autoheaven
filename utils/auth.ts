"use client"
import { clientUsers } from "@/app/GlobalRedux/client";

export const validateToken = async () => {
  const token = getToken();
  try {
    const resp = await clientUsers.get("/api/users/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("user info ", resp);
    return true;
  } catch {
    return false;
  }
};

export const getToken = () => {
  return localStorage.getItem("token");
};
export const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};
// before redirecting to login page, save the original url
export const getOriginalUrl = () => {
  return localStorage.getItem("originalUrl");
};
