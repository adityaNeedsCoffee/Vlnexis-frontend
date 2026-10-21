"use client";


import Link from "next/link";

import { getServiceError, useService } from "@/app/api/hooks/services/useService";
import Reveal from "@/app/Components/Reusable/Reveal";
import { assetPath } from "../../../../libs/assetPath";
// apna sahi path

const wrap = "mx-auto max-w-screen-2xl px-5 xl:px-8 2xl:px-12";

// Title ke piche halka shadow, taaki image ke upar bhi sharp dikhe
const titleShadow = {
  textShadow: "0 2px 4px rgba(0,0,0,0.45), 0 4px 18px rgba(0,0,0,0.35)",
};

// DB ka HTML (<p>, <ul>, <li>, <strong>, <h3>) style karne ke liye.
// Tailwind me typography plugin nahi hai, isliye child tags ko yahin style kiya hai.
const htmlClass =
  "leading-relaxed text-blackk/80 " +
  "[&_p]:mt-3 [&_p:first-child]:mt-0 " +
  "[&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_ol]:mt-3 [&_ol]:list-decimal [&_ol]:pl-6 " +
  "[&_li]:mt-1.5 " +
  "[&_h3]:mt-5 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-blackk " +
  "[&_h4]:mt-4 [&_h4]:font-semibold [&_h4]:text-blackk " +
  "[&_strong]:font-semibold [&_strong]:text-blackk " +
  "[&_a]:text-bluee [&_a]:underline";

// Sub-service string ho ya object, dono chalega (model ke field names ke hisaab se adjust karein)
// Ab slug aur contentHtml bhi pass hote hain
function normalizeItem(item) {
  if (typeof item === "string") {
    return { slug: "", title: item, description: "", contentHtml: "" };
  }
  return {
    slug: item?.slug ?? "",
    title: item?.title ?? item?.name ?? "",
    description: item?.description ?? item?.summary ?? item?.text ?? "",
    contentHtml: item?.contentHtml ?? "",
  };
}

function LoadingState() {
  return (
    <main className="bg-grayy" aria-busy="true" aria-label="Loading service">
      <div className="animate-pulse bg-bluee">
        <div className={`${wrap} py-14 xl:py-20`}>
          <div className="h-4 w-32 rounded bg-white/20" />
          <div className="mt-5 h-10 w-2/3 rounded bg-white/20" />
          <div className="mt-4 h-5 w-1/2 rounded bg-white/20" />
        </div>
      </div>
      <div className={`${wrap} grid gap-5 py-10 sm:grid-cols-2 xl:py-16`}>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-40 animate-pulse rounded-2xl bg-white" />
        ))}
      </div>
    </main>
  );
}

function MessageState({ title, text, children }) {
  return (
    <main className="bg-grayy">
      <div className={`${wrap} py-20 xl:py-28`}>
        <div role="alert" className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center">
          <h1 className="text-2xl font-semibold text-blackk">{title}</h1>
          <p className="mt-3 text-blackk/80">{text}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>
        </div>
      </div>
    </main>
  );
}

// Light (white) background pe: bluee button
const primaryBtn =
  "inline-block rounded-full bg-bluee px-8 py-3 font-semibold text-white transition-colors hover:bg-blackk disabled:opacity-60";

// Dark (blackk) background pe: yelloww button
const darkBtn =
  "inline-block rounded-full bg-yelloww px-8 py-3 font-semibold text-blackk transition-colors hover:bg-grayy disabled:opacity-60";

export default function ServiceDetail({ slug }) {
  const { data, isLoading, isError, error, refetch, isFetching } = useService(slug);

  if (isLoading) return <LoadingState />;

  if (isError) {
    if (isServiceNotFound(error)) {
      return (
        <MessageState title="Service not found" text="This service does not exist or may have been moved.">
          <Link href="/services" className={primaryBtn}>
            View all services
          </Link>
        </MessageState>
      );
    }
    return (
      <MessageState title="We could not load this service." text={getServiceError(error)}>
        <button type="button" onClick={() => refetch()} disabled={isFetching} className={primaryBtn}>
          {isFetching ? "Retrying..." : "Try again"}
        </button>
        <Link href="/services" className="inline-block rounded-full border border-bluee px-8 py-3 font-semibold text-bluee transition-colors hover:bg-bluee hover:text-white">
          All services
        </Link>
      </MessageState>
    );
  }

  const { service, previous, next } = data ?? {};
  if (!service) return null;

  const items = (service.items ?? []).map(normalizeItem);

  return (
    <main className="bg-grayy">
      {/* Hero: banner image ke upar sirf title + tagline */}
      <section
        className={`relative isolate overflow-hidden text-white ${
          service.bannerImage ? "bg-blackk" : "bg-bluee"
        }`}
      >
        {/* Layer 1: banner image (z-0) */}
        {service.bannerImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={assetPath(service.bannerImage)}
            alt=""
            className="absolute inset-0 z-0 h-full w-full object-cover"
          />
        )}

        {/* Layer 2: overlay (z-10) */}
        {service.bannerImage && (
          <div
            aria-hidden
            className="absolute inset-0 z-10"
            style={{
              background:
                "linear-gradient(90deg, rgba(23,23,23,0.88) 0%, rgba(23,23,23,0.65) 40%, rgba(23,23,23,0.20) 100%), linear-gradient(0deg, rgba(23,23,23,0.45) 0%, rgba(23,23,23,0) 50%)",
            }}
          />
        )}

        {/* Layer 3: text (z-20) */}
        <div className="relative z-20 flex min-h-[300px] items-center md:min-h-[400px] xl:min-h-[440px]">
          <div className={`${wrap} w-full py-14`}>
            <Reveal>
              <div className="h-1 w-16 rounded-full bg-yelloww shadow-md" />
            </Reveal>

            <Reveal delay={150}>
              <h1
                className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl xl:text-6xl"
                style={titleShadow}
              >
                {service.title}
              </h1>
            </Reveal>

            {service.tagline && (
              <Reveal delay={300}>
                <p
                  className="mt-6 max-w-2xl border-l-4 border-yelloww pl-4 text-lg font-medium leading-relaxed text-grayy md:text-xl"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.5)" }}
                >
                  {service.tagline}
                </p>
              </Reveal>
            )}
          </div>
        </div>
      </section>

      {/* NEW: Intro (introHtml). Sirf tab dikhega jab DB me introHtml ho */}
      {service.introHtml && (
        <section className={`${wrap} pt-10 xl:pt-16`}>
          <Reveal>
            <div className="max-w-4xl rounded-2xl bg-white p-6 shadow-sm xl:p-8">
              {/* introHtml tumhare apne DB/seed ka HTML hai, isliye dangerouslySetInnerHTML safe hai */}
              <div
                className={`text-base md:text-lg ${htmlClass}`}
                dangerouslySetInnerHTML={{ __html: service.introHtml }}
              />
            </div>
          </Reveal>
        </section>
      )}

      {/* Sub-services */}
      <section className={`${wrap} py-10 xl:py-16`}>
        <Reveal>
          <h2 className="text-2xl font-semibold text-blackk md:text-3xl">
            What this includes
          </h2>
        </Reveal>

        {items.length ? (
          // Pehle 3 columns ka grid tha. contentHtml lamba hota hai, isliye ab ek column me full-width cards
          <ul className="mt-8 space-y-5 xl:space-y-6">
            {items.map((item, index) => (
              // id = item.slug, taaki #slug se seedha is card pe aa sako
              <li key={`${item.slug || item.title}-${index}`} id={item.slug || undefined} className="scroll-mt-28">
                <Reveal>
                  <div className="rounded-2xl bg-white p-6 xl:p-8">
                    {/* Left me yelloww bar + title */}
                    <h3 className="border-l-4 border-yelloww pl-4 text-lg font-semibold text-blackk md:text-xl">
                      {item.title}
                    </h3>

                    {/* Short description */}
                    {item.description && (
                      <p className="mt-4 leading-relaxed text-blackk/80">{item.description}</p>
                    )}

                    {/* NEW: contentHtml (detail content) */}
                    {item.contentHtml && (
                      <div
                        className={`mt-4 border-t border-blackk/10 pt-4 ${htmlClass}`}
                        dangerouslySetInnerHTML={{ __html: item.contentHtml }}
                      />
                    )}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-blackk">Details for this service will be added shortly.</p>
        )}
      </section>

      {/* Previous / Next */}
      {(previous || next) && (
        <nav aria-label="More services" className={`${wrap} pb-10 xl:pb-16`}>
          <div className="grid gap-5 sm:grid-cols-2">
            {previous && (
              <Link
                href={`/services-provided/${previous.slug}`}
                className="group rounded-2xl border border-bluee/20 p-6 transition-colors hover:bg-bluee"
              >
                <span className="text-sm text-blackk/70 transition-colors group-hover:text-grayy">
                  Previous
                </span>
                <span className="mt-1 block text-lg font-semibold text-blackk transition-colors group-hover:text-white">
                  {String(previous.number).padStart(2, "0")}. {previous.title}
                </span>
              </Link>
            )}
            {next && (
              <Link
                href={`/services-provided/${next.slug}`}
                className="group rounded-2xl border border-bluee/20 p-6 text-left transition-colors hover:bg-bluee sm:text-right"
              >
                <span className="text-sm text-blackk/70 transition-colors group-hover:text-grayy">
                  Next
                </span>
                <span className="mt-1 block text-lg font-semibold text-blackk transition-colors group-hover:text-white">
                  {String(next.number).padStart(2, "0")}. {next.title}
                </span>
              </Link>
            )}
          </div>
        </nav>
      )}

      {/* CTA */}
      <section className="bg-blackk text-grayy">
        <div className={`${wrap} flex flex-col items-start gap-6 py-12 xl:flex-row xl:items-center xl:justify-between xl:py-16`}>
          <Reveal direction="left">
            <h2 className="text-2xl font-semibold md:text-3xl">Need help with {service.title}?</h2>
            <p className="mt-2 text-grayy">
              Tell us about your plans and our team will get back to you.
            </p>
          </Reveal>
          <Reveal direction="right" delay={150}>
            <Link href="/contact" className={darkBtn}>
              Contact Us
            </Link>
          </Reveal>
        </div>
      </section>
    </main>
  );
}5