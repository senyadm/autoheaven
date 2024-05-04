"use server";

import { clientUsers } from "../src/shared/api/client";

const fetchUserData = async (token: string) => {
  const response = await clientUsers.get("/api/users/me/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
