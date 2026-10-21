"use client";

// hooks/useServices.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { serviceKeys } from "../../../../../libs/queryKeys";
import { serviceService } from "../../services/servicesService";


const FIVE_MINUTES = 5 * 60 * 1000;

/** Saari categories (full data) */
export function useServices() {
  return useQuery({
    queryKey: serviceKeys.list(),
    queryFn: serviceService.getAll,
    staleTime: FIVE_MINUTES,
  });
}

/** Cards ke liye short list */
export function useServiceSummaries() {
  return useQuery({
    queryKey: serviceKeys.summaries(),
    queryFn: serviceService.getSummaries,
    staleTime: FIVE_MINUTES,
  });
}

/** Ek category slug se. slug na ho to request nahi jaati. */
export function useService(slug) {
  return useQuery({
    queryKey: serviceKeys.detail(slug),
    queryFn: () => serviceService.getBySlug(slug),
    enabled: Boolean(slug),
    staleTime: FIVE_MINUTES,
  });
}

// True agar slug backend mein exist hi nahi karta (404)
export function isServiceNotFound(error) {
  return axios.isAxiosError(error) && error.response?.status === 404;
}

export function getServiceError(error) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Something went wrong. Please try again.";
  }
  return "Something went wrong. Please try again.";
}