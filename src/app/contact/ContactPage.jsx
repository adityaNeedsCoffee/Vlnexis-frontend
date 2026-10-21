"use client";

import React, { useEffect, useState } from "react";
import { getContactError, useSendContact } from "../api/hooks/contact/useContact";

// Yahan apni real business details daal dijiye
const CONTACT_DETAILS = [
  { label: "Email", value: "support@yourdomain.com", href: "mailto:support@yourdomain.com" },
  { label: "Phone", value: "+91 00000 00000", href: "tel:+910000000000" },
  { label: "Address", value: "Your street address, City, State, PIN" },
  { label: "Working hours", value: "Mon to Sat, 10:00 AM to 7:00 PM" },
];

const EMPTY_FORM = { name: "", email: "", phone: "", message: "", website: "" };

// Backend ke zod schema ke hisaab se
function validate(form) {
  const errors = {};
  const name = form.name.trim();
  const message = form.message.trim();

  if (name.length < 2) errors.name = "Please enter your full name (at least 2 characters).";
  else if (name.length > 100) errors.name = "Name must be 100 characters or fewer.";

  if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) errors.email = "Please enter a valid email address.";

  if (form.phone.trim().length > 30) errors.phone = "Phone number must be 30 characters or fewer.";

  if (message.length < 10) errors.message = "Your message needs at least 10 characters.";
  else if (message.length > 3000) errors.message = "Message must be 3000 characters or fewer.";

  return errors;
}

/* ---------- small icons ---------- */
const Svg = ({ children, className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    {children}
  </svg>
);

const UserIcon = () => (
  <Svg>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
  </Svg>
);
const MailIcon = () => (
  <Svg>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </Svg>
);
const PhoneIcon = () => (
  <Svg>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </Svg>
);
const ChatIcon = () => (
  <Svg>
    <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" />
  </Svg>
);
const CheckIcon = ({ className = "h-3 w-3" }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
    <path d="m5 12 5 5 9-10" />
  </svg>
);
const StampIcon = () => (
  <Svg className="h-4 w-4">
    <path d="M9 4h6v5l1.5 3H7.5L9 9z" />
    <path d="M5 16h14v4H5z" />
  </Svg>
);

/* ---------- status pill (Paid / Unpaid jaisa) ---------- */
function Pill({ state }) {
  const map = {
    done: { text: "Done", dot: "bg-emerald-500", icon: <CheckIcon className="h-2.5 w-2.5 text-white" /> },
    pending: { text: "Pending", dot: "bg-orange-500", icon: <span className="block h-1.5 w-1.5 rounded-full bg-white" /> },
    optional: { text: "Optional", dot: "bg-blackk/30", icon: <span className="block h-1.5 w-1.5 rounded-full bg-white" /> },
  };
  const s = map[state];
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-bluee/15 bg-white px-2.5 py-1 text-xs font-medium text-blackk/80 shadow-sm">
      <span className={`flex h-4 w-4 items-center justify-center rounded-full ${s.dot}`}>{s.icon}</span>
      {s.text}
    </span>
  );
}

/* ---------- ek line item (avatar | divider | field) ---------- */
function LineItem({ id, label, icon, state, error, children }) {
  return (
    <div className="flex gap-4 border-b border-bluee/10 py-4 last:border-b-0">
      <div className="flex w-12 shrink-0 items-start justify-center border-r border-bluee/10 pr-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-grayy text-bluee shadow-sm ring-1 ring-bluee/10">
          {icon}
        </span>
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between gap-3">
          <label htmlFor={id} className="text-sm font-medium text-blackk">
            {label}
          </label>
          <Pill state={state} />
        </div>
        {children}
        {error && (
          <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

const inputBase =
  "w-full rounded-md border bg-grayy/60 px-3 py-2.5 text-base text-blackk placeholder:text-blackk/40 transition-colors focus:border-bluee focus:outline-none focus:ring-2 focus:ring-yelloww";

/* ---------- progress stepper (Payment Status bar jaisa) ---------- */
function Stepper({ steps, current, sent }) {
  return (
    <div className="flex items-center" role="list" aria-label="Form progress">
      {steps.map((step, i) => {
        const done = sent || i < current;
        const active = !sent && i === current;
        const last = i === steps.length - 1;
        return (
          <React.Fragment key={step}>
            <div role="listitem" aria-label={`${step}${done ? ", completed" : active ? ", current" : ""}`} className="flex flex-col items-center">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full shadow ring-4 ring-white ${
                  done ? "bg-emerald-500 text-white" : active ? "bg-blackk" : "bg-white text-blackk/50 ring-1 ring-bluee/15"
                }`}
              >
                {done && !last ? <CheckIcon /> : last ? (done ? <CheckIcon /> : <StampIcon />) : null}
              </span>
            </div>
            {!last && <span className={`h-1 flex-1 rounded-full ${i < current || sent ? "bg-blackk" : "bg-bluee/10"}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
}

const ContactPage = () => {
  const { mutate, isPending, isSuccess, error, data, reset } = useSendContact();
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [today, setToday] = useState("");

  // hydration mismatch se bachne ke liye date client pe set hoti hai
  useEffect(() => {
    setToday(new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors((prev) => ({ ...prev, [name]: undefined }));
    if (isSuccess || error) reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(form);
    setFieldErrors(errors);
    if (Object.keys(errors).length) return;

    mutate(
      {
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        message: form.message.trim(),
        website: form.website, // honeypot, real users ke liye hamesha khali
      },
      { onSuccess: () => setForm(EMPTY_FORM) }
    );
  };

  const handleClear = () => {
    setForm(EMPTY_FORM);
    setFieldErrors({});
    reset();
  };

  /* live status for pills + stepper */
  const live = validate(form);
  const nameOk = !live.name;
  const emailOk = !live.email;
  const messageOk = !live.message;
  const phoneFilled = form.phone.trim().length > 0;
  const phoneState = !phoneFilled ? "optional" : live.phone ? "pending" : "done";

  const stepsDone = [nameOk && emailOk, messageOk, nameOk && emailOk && messageOk && !live.phone];
  const current = stepsDone.findIndex((d) => !d);
  const currentStep = current === -1 ? 3 : current;
  const sent = isSuccess;

  const statusLabel = sent ? "SENT" : isPending ? "SENDING" : currentStep === 3 ? "READY" : "DRAFT";
  const statusColor = sent ? "text-emerald-600" : currentStep === 3 ? "text-bluee" : "text-blackk";

  const borderFor = (field) => (fieldErrors[field] ? "border-red-600" : "border-bluee/20");
  const describe = (field) => (fieldErrors[field] ? `${field}-error` : undefined);

  return (
    <main className="min-h-screen bg-grayy font-sans">
      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6 md:py-16">
        <h1 className="sr-only">Contact us</h1>

        {/* Printer */}
        <div className="relative z-10 rounded-2xl bg-blackk px-5 pb-7 pt-5 shadow-xl">
          <div className="flex items-center justify-between text-grayy">
            <span className="text-sm font-medium">Get in touch</span>
            <span className="text-xs text-grayy/60">Reply within 1 business day</span>
          </div>
          <div className="mx-auto mt-4 h-3 rounded-full bg-black/70 shadow-inner" />
        </div>

        {/* Receipt coming out of the printer */}
        <form
          id="contact-form"
          onSubmit={handleSubmit}
          noValidate
          className="relative z-0 -mt-5 mx-4 overflow-hidden rounded-b-2xl bg-white px-5 pb-6 pt-10 shadow-xl sm:mx-6 sm:px-7"
        >
          {/* printer shadow on the paper */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-blackk/25 to-transparent" aria-hidden="true" />

          {/* receipt header */}
          <div className="relative border-y border-dashed border-blackk/60 py-2 text-center font-mono text-sm text-blackk sm:text-base">
            Contact Request: Support Desk
          </div>

          <dl className="mt-5 space-y-2 text-base">
            <div className="flex items-baseline justify-between">
              <dt className="text-blackk/60">Date</dt>
              <dd className="font-medium text-blackk">{today || "\u00A0"}</dd>
            </div>
            <div className="flex items-baseline justify-between">
              <dt className="text-blackk/60">Reply time</dt>
              <dd className="font-medium text-blackk">1 business day</dd>
            </div>
          </dl>

          <div className="mt-4 border-t border-bluee/10" />

          {/* line items = form fields */}
          <div>
            <LineItem id="name" label="Full name" icon={<UserIcon />} state={nameOk ? "done" : "pending"} error={fieldErrors.name}>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Jane Doe"
                aria-invalid={!!fieldErrors.name}
                aria-describedby={describe("name")}
                className={`${inputBase} ${borderFor("name")}`}
              />
            </LineItem>

            <LineItem id="email" label="Email address" icon={<MailIcon />} state={emailOk ? "done" : "pending"} error={fieldErrors.email}>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={form.email}
                onChange={handleChange}
                placeholder="jane@example.com"
                aria-invalid={!!fieldErrors.email}
                aria-describedby={describe("email")}
                className={`${inputBase} ${borderFor("email")}`}
              />
            </LineItem>

            <LineItem id="phone" label="Phone number" icon={<PhoneIcon />} state={phoneState} error={fieldErrors.phone}>
              <input
                id="phone"
                name="phone"
                type="tel"
                autoComplete="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 00000 00000"
                aria-invalid={!!fieldErrors.phone}
                aria-describedby={describe("phone")}
                className={`${inputBase} ${borderFor("phone")}`}
              />
            </LineItem>

            <LineItem id="message" label="Message" icon={<ChatIcon />} state={messageOk ? "done" : "pending"} error={fieldErrors.message}>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                aria-invalid={!!fieldErrors.message}
                aria-describedby={describe("message")}
                className={`${inputBase} ${borderFor("message")} resize-y`}
              />
              <p className="mt-1.5 text-right text-xs text-blackk/50">{form.message.length} / 3000</p>
            </LineItem>
          </div>

          {/* Honeypot: real users ko nahi dikhna chahiye (display:none nahi, kuch bots skip kar dete hain) */}
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
            <label htmlFor="website">Website</label>
            <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
          </div>

          {/* status card */}
          <div className="mt-4 rounded-2xl border border-bluee/10 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-blackk">Message status</span>
              <span className={`text-xl font-semibold tracking-wide ${statusColor}`}>{statusLabel}</span>
            </div>
            <Stepper steps={["Details", "Message", "Review", "Sent"]} current={currentStep} sent={sent} />
            <div className="mt-2 flex justify-between text-[11px] text-blackk/50">
              <span>Details</span>
              <span>Message</span>
              <span>Review</span>
              <span>Sent</span>
            </div>
          </div>

          {/* receipt actions */}
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={handleClear}
              className="rounded-full bg-white px-6 py-3 text-base font-medium text-blackk shadow-md ring-1 ring-bluee/10 transition-colors hover:bg-grayy focus:outline-none focus-visible:ring-2 focus-visible:ring-yelloww sm:flex-1"
            >
              Clear form
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-blackk px-6 py-3 text-base font-semibold text-white shadow-md transition-colors hover:bg-bluee focus:outline-none focus-visible:ring-2 focus-visible:ring-yelloww focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:flex-1"
            >
              {isPending ? "Sending..." : "Send message"}
            </button>
          </div>

          {/* Status messages */}
          <div aria-live="polite" className="mt-4 empty:mt-0">
            {isSuccess && (
              <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
                {data?.message || "Thanks, we'll get back to you soon."}
              </p>
            )}
            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {getContactError(error)}
              </p>
            )}
          </div>
        </form>

        {/* "Payment Method" row jaisa: contact details */}
        <section aria-label="Contact details" className="mt-8 px-2">
          <dl className="divide-y divide-bluee/10 border-y border-bluee/10">
            {CONTACT_DETAILS.map((item) => (
              <div key={item.label} className="flex items-baseline justify-between gap-4 py-3.5">
                <dt className="shrink-0 text-base text-blackk/60">{item.label}</dt>
                <dd className="text-right text-base font-medium text-blackk">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="underline-offset-4 hover:text-bluee hover:underline focus:outline-none focus-visible:text-bluee focus-visible:underline"
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </main>
  );
};

export default ContactPage;