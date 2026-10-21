"use client";


import Link from "next/link";

import { getServiceError, useServiceSummaries } from "../api/hooks/services/useService";
import Reveal from "../Components/Reusable/Reveal";


const gridClass = "grid gap-5 sm:grid-cols-2 xl:grid-cols-3 xl:gap-6";

function SkeletonCard() {
  return (
    <div className="h-64 animate-pulse rounded-2xl bg-white p-6 xl:p-8" aria-hidden="true">
      <div className="h-10 w-16 rounded bg-grayy" />
      <div className="mt-6 h-6 w-3/4 rounded bg-grayy" />
      <div className="mt-4 h-4 w-full rounded bg-grayy" />
      <div className="mt-2 h-4 w-2/3 rounded bg-grayy" />
    </div>
  );
}

export default function ServicesGrid() {
  const { data, isLoading, isError, error, refetch, isFetching } = useServiceSummaries();
  const services = Array.isArray(data) ? data : [];

  if (isLoading) {
    return (
      <div className={gridClass} aria-busy="true" aria-label="Loading services">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div role="alert" className="rounded-2xl bg-white p-8 text-center">
        <p className="text-lg font-semibold text-blackk">We could not load our services.</p>
        <p className="mt-2 text-blackk/80">{getServiceError(error)}</p>
        <button
          type="button"
          onClick={() => refetch()}
          disabled={isFetching}
          className="mt-6 rounded-full bg-bluee px-8 py-3 font-semibold text-white transition-colors hover:bg-blackk disabled:opacity-60"
        >
          {isFetching ? "Retrying..." : "Try again"}
        </button>
      </div>
    );
  }

  if (!services.length) {
    return (
      <p className="rounded-2xl bg-white p-8 text-center text-blackk">
        Our services will be listed here shortly.
      </p>
    );
  }

  return (
    <div className={gridClass}>
      {services.map((service, index) => (
        // Har row mein max 300ms ka stagger, taaki neeche ke cards late na aayein
        <Reveal key={service.slug} delay={(index % 3) * 100} className="h-full">
          <Link
            href={`/services-provided/${service.slug}`}
            className="group flex h-full flex-col justify-between rounded-2xl bg-white p-6 transition-colors hover:bg-bluee xl:p-8"
          >
            <div>
              <span className="text-4xl font-semibold text-bluee transition-colors group-hover:text-yelloww md:text-5xl">
                {String(service.number).padStart(2, "0")}
              </span>
              <h2 className="mt-4 text-xl font-semibold text-blackk transition-colors group-hover:text-white md:text-2xl">
                {service.title}
              </h2>
              <p className="mt-3 leading-relaxed text-blackk/80 transition-colors group-hover:text-grayy">
                {service.tagline}
              </p>
            </div>

            <div className="mt-8 flex items-center justify-between text-sm font-medium text-blackk transition-colors group-hover:text-white">
              <span>{service.itemCount} services</span>
              <span className="text-2xl text-bluee transition-transform group-hover:translate-x-1 group-hover:text-yelloww">
                →
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}