"use client";

import React from "react";
import { ExternalLink, Newspaper } from "lucide-react";
import { getNewsError, useNews } from "../api/hooks/news/getNews";

// Step 1: GDELT date looks like "20261105T123000Z". Convert it to "05 Nov 2026".
const formatNewsDate = (rawDate) => {
  if (!rawDate || rawDate.length < 8) return "";

  const year = Number(rawDate.slice(0, 4));
  const month = Number(rawDate.slice(4, 6)) - 1; // JS months start from 0
  const day = Number(rawDate.slice(6, 8));

  return new Date(Date.UTC(year, month, day)).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
};

// Step 2: Placeholder cards shown while news is loading
const NewsSkeleton = () => (
  <div className="animate-pulse rounded-md border border-grayy bg-white p-5">
    <div className="mb-3 h-3 w-24 rounded bg-grayy" />
    <div className="mb-2 h-4 w-full rounded bg-grayy" />
    <div className="mb-4 h-4 w-3/4 rounded bg-grayy" />
    <div className="h-3 w-20 rounded bg-grayy" />
  </div>
);

const NewsComponent = ({
  topic = "business", // "business" | "fdi" | "gst" | "startup"
  title = "Latest India Business News",
  limit = 6, // how many cards to show
}) => {
  // Step 3: Fetch news using our hook
  const { data: articles, isLoading, isError, error } = useNews(topic);

  // Step 4: Only show the first `limit` articles
  const visibleArticles = (articles || []).slice(0, limit);

  return (
    <section className="w-full bg-white text-blackk">
      <div className="px-5 py-10 xl:px-8 xl:py-14 2xl:px-12">
        {/* Heading */}
        <div className="mb-8 flex items-center gap-3">
          <Newspaper size={26} className="text-bluee" />
          <h2 className="text-2xl font-semibold md:text-3xl">{title}</h2>
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: limit }).map((_, index) => (
              <NewsSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error state */}
        {isError && (
          <p className="rounded-md border border-grayy bg-grayy/40 p-5 text-[15px]">
            {getNewsError(error)}
          </p>
        )}

        {/* Empty state */}
        {!isLoading && !isError && visibleArticles.length === 0 && (
          <p className="rounded-md border border-grayy bg-grayy/40 p-5 text-[15px]">
            No news available right now.
          </p>
        )}

        {/* News cards */}
        {!isLoading && !isError && visibleArticles.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleArticles.map((article) => (
              <a
                key={article.url}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between rounded-md border border-grayy bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div>
                  {/* Source + date */}
                  <p className="mb-3 text-[13px] text-bluee">
                    {article.domain}
                    {article.date && (
                      <span className="text-blackk/60">
                        {" "}
                        • {formatNewsDate(article.date)}
                      </span>
                    )}
                  </p>

                  {/* Title (max 3 lines) */}
                  <h3 className="line-clamp-3 text-[16px] font-medium leading-snug transition-colors group-hover:text-bluee">
                    {article.title}
                  </h3>
                </div>

                {/* Read more */}
                <span className="mt-5 flex items-center gap-1 text-[14px] font-medium text-bluee">
                  Read article
                  <ExternalLink size={14} />
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default NewsComponent;