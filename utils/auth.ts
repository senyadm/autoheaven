import { clientUsers } from "@/app/GlobalRedux/client"

export const validateToken = async (token: string) => {
  try {
    const response = await clientUsers.get("/api/users/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log(response);
    return response;
  } catch (error) {
    console.error("Error validating token:", error);
    throw error; // Rethrow the error if needed
  }
};