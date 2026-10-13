import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api/axios.js";

export const USER_KEY = ["user"];

async function fetchUser() {
  try {
    const { data } = await api.get("users/user");
    return data;
  } catch (err) {
    if (err.response?.status === 401) return null;
    throw err;
  }
}

export function useUser() {
  return useQuery({
    queryKey: USER_KEY,
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000,   
    retry: false,
    refetchOnWindowFocus: true, // notice if the session expired
  });
}

export function useLogout() {
  const qc = useQueryClient();
  return async () => {
    await api.post("logout");
    qc.setQueryData(USER_KEY, null); // instantly logged out in the UI
  };
}