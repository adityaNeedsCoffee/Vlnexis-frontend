"use client";

import { useState } from "react";
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

// Saare inputs ka common style: simple, halka border, focus pe bluee
const inputBase =
  "w-full rounded-lg border bg-white px-4 py-3 text-base text-blackk placeholder:text-blackk/40 transition-colors focus:border-bluee focus:outline-none focus:ring-2 focus:ring-bluee/20";

// Label + input + error ek jagah
function Field({ id, label, optional, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex items-baseline justify-between text-sm font-medium text-blackk">
        <span>{label}</span>
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
    <main className="min-h-screen bg-grayy font-sans">
      <div className="mx-auto max-w-5xl px-5 py-12 md:py-20 xl:px-8">
        <div className="grid gap-12 lg:grid-cols-5 lg:gap-16">
          {/* Left: heading + contact details */}
          <section className="lg:col-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-blackk md:text-5xl">
              Get in <span className="text-bluee">touch</span>
            </h1>
            <div className="mt-4 h-1 w-16 rounded-full bg-yelloww" />
            <p className="mt-6 max-w-sm leading-relaxed text-blackk/70">
              Send us a message and our team will reply within one business day.
            </p>

            <dl className="mt-10 space-y-5">
              {CONTACT_DETAILS.map((item) => (
                <div key={item.label}>
                  <dt className="text-xs font-medium uppercase tracking-widest text-blackk/50">{item.label}</dt>
                  <dd className="mt-1 text-base font-medium text-blackk">
                    {item.href ? (
                      <a
                        href={item.href}
                        className="underline-offset-4 transition-colors hover:text-bluee hover:underline focus:outline-none focus-visible:text-bluee focus-visible:underline"
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

          {/* Right: form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5 rounded-2xl bg-white p-6 shadow-sm md:p-8 lg:col-span-3"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="name" label="Full name" error={fieldErrors.name}>
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

              <Field id="email" label="Email address" error={fieldErrors.email}>
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

            <Field id="message" label="Message" error={fieldErrors.message}>
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
            </Field>

            {/* Honeypot: real users ko nahi dikhna chahiye (display:none nahi, kuch bots skip kar dete hain) */}
            <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={handleChange} />
            </div>

            {/* Submit button: bluee */}
            <button
              type="submit"
              disabled={isPending}
              className="w-full rounded-full bg-bluee px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blackk focus:outline-none focus-visible:ring-2 focus-visible:ring-yelloww focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
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
        </div>
      </div>
    </main>
  );
};

export default ContactPage;