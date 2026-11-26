"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { userService } from "../../services/userService";

const CURRENT_USER_KEY = ["currentUser"];

/** Mutation for logging in. On success it returns the user: { id, name, email, role } */
export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (loginData) => userService.login(loginData),
    // Login ke baad user ko cache mein rakh do, taaki navbar wagairah turant update ho
    onSuccess: (user) => {
      queryClient.setQueryData(CURRENT_USER_KEY, user);
    },
  });
}

/** Mutation for logging out (backend cookie clear karta hai) */
export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => userService.logout(),
    onSuccess: () => {
      queryClient.setQueryData(CURRENT_USER_KEY, null);
    },
  });
}

/** Page refresh pe check karta hai ki cookie valid hai ya nahi */
export function useCurrentUser() {
  return useQuery({
    queryKey: CURRENT_USER_KEY,
    queryFn: async () => {
      try {
        return await userService.me();
      } catch (error) {
        // 401 = logged in nahi hai, ye error nahi, bas "user nahi hai"
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          return null;
        }
        throw error;
      }
    },
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}

// True if the email or password is wrong (backend sends 401)
export function isInvalidCredentials(error) {
  return axios.isAxiosError(error) && error.response?.status === 401;
}

// Pull a readable message out of the backend error
export function getLoginError(error) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Something went wrong. Please try again.";
  }
  return "Something went wrong. Please try again.";
}