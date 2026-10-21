"use client";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { contactKeys } from "../../../../../libs/queryKeys";
import { contactService } from "../../services/contactService";


export function useSendContact() {
  return useMutation({
    mutationKey: contactKeys.send(),
    mutationFn: (payload) => contactService.send(payload),
  });
}

// backend ka error message nikalne ke liye
export function getContactError(error) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Something went wrong. Please try again.";
  }
  return "Something went wrong. Please try again.";
}