"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { userService } from "../../services/userService";

/** Mutation for logging in */
export function useLogin() {
  return useMutation({
    // Step 1: Receives { email, password } when you call mutate()
    // On success it returns { token, user }
    mutationFn: (loginData) => userService.login(loginData),
  });
}

// Step 2: True if the email or password is wrong (backend sends 401)
export function isInvalidCredentials(error) {
  return axios.isAxiosError(error) && error.response?.status === 401;
}

// Step 3: Pull a readable message out of the backend error
export function getLoginError(error) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Something went wrong. Please try again.";
  }
  return "Something went wrong. Please try again.";
}