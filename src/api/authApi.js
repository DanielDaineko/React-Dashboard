import axios from "axios";

const AUTH_BASE_URL = "https://dummyjson.com";

export async function loginUser(credentials) {
  const response = await axios.post(
    `${AUTH_BASE_URL}/auth/login`,
    credentials,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
}
