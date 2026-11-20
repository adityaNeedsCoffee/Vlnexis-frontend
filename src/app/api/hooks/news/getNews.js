"use client";

// hooks/getNews.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { newsService } from "../../services/newsService";


// News is treated as fresh for 15 min (backend cache is also 15 min)
const FIFTEEN_MINUTES = 15 * 60 * 1000;

// Query keys (kept in this file for now, can be moved to libs/queryKeys later)
const newsKeys = {
  all: ["news"],
  list: (topic) => ["news", "list", topic],
};

/**
 * Latest news by topic
 * @param {string} topic - "business" | "fdi" | "gst" | "startup"
 */
export function useNews(topic = "business") {
  return useQuery({
    queryKey: newsKeys.list(topic),
    queryFn: () => newsService.getLatest(topic),
    staleTime: FIFTEEN_MINUTES,
    refetchOnWindowFocus: false, // GDELT has a rate limit, avoid repeated refetches
  });
}

// Readable error message
export function getNewsError(error) {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Unable to load news. Please try again.";
  }
  return "Unable to load news. Please try again.";
}