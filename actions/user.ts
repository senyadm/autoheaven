"use server";

import { clientUsers } from "../app/GlobalRedux/client";

const fetchUserData = async (token: string) => {
  const response = await clientUsers.get("/api/users/me/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
