"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { userService } from "../../services/userService";

export function useSignup() {
  return useMutation({
    mutationFn: (signupData) => userService.create(signupData),
  });
}

export function isEmailAlreadyUsed(error) {
  return axios.isAxiosError(error) && error.response?.status === 409;
}

export function getSignupError(error) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Something went wrong. Please try again.";
  }
  return "Something went wrong. Please try again.";
}