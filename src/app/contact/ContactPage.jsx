"use client";

import { useState } from "react";
import Image from "next/image";
import { getContactError, useSendContact } from "../api/hooks/contact/useContact";
import { assetPath } from "../../../libs/assetPath";

// Yahan apni real business details daal dijiye
const EMAIL = "support@yourdomain.com";
const CONTACT_DETAILS = [
  { label: "Phone", value: "+91 00000 00000", href: "tel:+910000000000" },
  { label: "Address", value: "Your street address, City, State, PIN" },
  { label: "Working hours", value: "Mon to Sat, 10:00 AM to 7:00 PM" },
];

const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  message: "",
  website: "", // honeypot
};

// Backend ke zod schema ke hisaab se
function validate(form) {
  const errors = {};
  const name = form.name.trim();
  const message = form.message.trim();

  if (name.length < 2) errors.name = "Please enter your full name (at least 2 characters).";
  else if (name.length > 100) errors.name = "Name must be 100 characters or fewer.";

  if (!/^\S+@\S+\.\S+$/.test(form.email.trim()))
    errors.email = "Please enter a valid email address.";

  if (form.phone.trim().length > 30)
    errors.phone = "Phone number must be 30 characters or fewer.";

  if (message.length < 10) errors.message = "Your message needs at least 10 characters.";
  else if (message.length > 3000) errors.message = "Message must be 3000 characters or fewer.";

  return errors;
}

const inputBase =
  "w-full rounded-lg border bg-white px-4 py-3 text-base text-blackk placeholder:text-blackk/40 transition-colors focus:border-bluee focus:outline-none focus:ring-2 focus:ring-bluee/20";

// Label + input + error ek jagah
function Field({ id, label, required, optional, error, children }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-blackk"
      >
        <span>
          {label}
          {required && <span className="ml-0.5 text-bluee">*</span>}
        </span>
        {optional && <span className="text-xs font-normal text-blackk/50">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

const ContactPage = () => {
  const { mutate, isPending, isSuccess, error, data, reset } = useSendContact();
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});

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

  const borderFor = (field) => (fieldErrors[field] ? "border-red-600" : "border-blackk/15");
  const describe = (field) => (fieldErrors[field] ? `${field}-error` : undefined);

  return (
    <main className="bg-grayy px-5 py-10 font-sans text-blackk md:py-16 xl:px-8 2xl:px-12">
      <div className="mx-auto grid max-w-[1600px] overflow-hidden rounded-3xl bg-white lg:grid-cols-2">
        {/* Left: heading + form */}
        <section className="px-6 py-10 sm:px-10 md:py-14 lg:px-14 xl:px-20 xl:py-20">
          <h1 className="max-w-md text-4xl font-medium leading-[1.1] tracking-tight md:text-5xl">
            Let&rsquo;s talk about your business in India
          </h1>
          <p className="mt-5 text-lg text-blackk/70">
            You can reach us anytime via{" "}
            <a
              href={`mailto:${EMAIL}`}
              className="font-medium text-bluee underline-offset-4 hover:underline focus:outline-none focus-visible:underline"
            >
              {EMAIL}
            </a>
          </p>

          <form onSubmit={handleSubmit} noValidate className="mt-10 max-w-xl space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Full name" required error={fieldErrors.name}>
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
              </Field>

              <Field id="email" label="Email address" required error={fieldErrors.email}>
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
              </Field>
            </div>

            <Field id="phone" label="Phone number" optional error={fieldErrors.phone}>
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
            </Field>

            <Field id="message" label="Message" required error={fieldErrors.message}>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder="Leave us a message..."
                aria-invalid={!!fieldErrors.message}
                aria-describedby={describe("message")}
                className={`${inputBase} ${borderFor("message")} resize-y`}
              />
              <p className="mt-1.5 text-right text-xs text-blackk/50">
                {form.message.length} / 3000
              </p>
            </Field>

            {/* Honeypot: real users ko nahi dikhna chahiye */}
            <div
              aria-hidden="true"
              style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}
            >
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-lg bg-bluee px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blackk focus:outline-none focus-visible:ring-2 focus-visible:ring-yelloww focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending ? "Sending..." : "Send message"}
            </button>

            {/* Status messages */}
            <div aria-live="polite" className="empty:hidden">
              {isSuccess && (
                <p className="rounded-lg border border-bluee/20 bg-grayy px-4 py-3 text-sm font-medium text-bluee">
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

          {/* Other ways to reach us */}
          <dl className="mt-12 grid max-w-xl gap-6 border-t border-blackk/10 pt-8 sm:grid-cols-3">
            {CONTACT_DETAILS.map((item) => (
              <div key={item.label}>
                <dt className="text-sm text-blackk/50">{item.label}</dt>
                <dd className="mt-1 text-sm font-medium leading-snug">
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

        {/* Right: image (mobile par form ke upar) */}
        <div className="relative order-first h-64 sm:h-80 lg:order-last lg:h-auto lg:min-h-[640px]">
          <Image
            src={assetPath("/images/smilingwomen.png")}
            alt="A Nexis consultant smiling during a client meeting"
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default ContactPage;