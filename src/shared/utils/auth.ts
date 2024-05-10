"use client";
import { clientUsers } from "@/src/shared/api/client";
export const getToken = () => {
  return localStorage.getItem("token");
};
export const validateToken = async () => {
  const token = getToken();
  if (!token) {   
    return false
  };

  try {
    const resp = await clientUsers.get("/api/users/me/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("user info ", resp);
    return true;
  } catch {
    return false;
  }
};

export const saveToken = (token: string) => {
  // document.cookie = `access_token=${token}; path=/`;
  localStorage.setItem("token", token);
};
// before redirecting to login page, save the original url
export const getOriginalUrl = () => {
  return sessionStorage.getItem("originalUrl");
};
export const saveOriginalUrl = (url: string) => {
  sessionStorage.setItem("originalUrl", url);
};
export const deleteOriginalUrl = () => {
  sessionStorage.removeItem("originalUrl");
};
