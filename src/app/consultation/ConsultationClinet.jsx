"use client";

import { useState } from "react";
import axios from "axios";
// 1. react-day-picker (v9) + date-fns helpers
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { format, parse, startOfDay } from "date-fns";
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Loader2,
  CalendarCheck,
  CheckCircle2,
} from "lucide-react";

// 2. Change these to your real values
const API_URL = "http://localhost:5000/api/consulting"; // TODO: your booking endpoint
const CONTACT = {
  phone: "+91 00000 00000",
  email: "contact@yourdomain.com",
  address: "Your office address, City",
};

// 3. Dropdown options (edit freely)
const SERVICES = [
  "Planning Your Entry into India",
  "Setting Up Your Business",
  "Licences and Registrations",
  "Foreign Investment Reporting",
  "Income Tax",
  "Goods and Services Tax (GST)",
  "Accounting and Audit Support",
  "Company Law Compliance",
  "Acquisitions and Restructuring",
  "Bringing Money Home and Exiting",
];
const MODES = ["Video call", "Phone call", "In person"];

// 4. Empty form (same field names the backend mailer expects)
const EMPTY_FORM = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  date: "", // stored as "yyyy-MM-dd"
  time: "",
  mode: "",
  message: "",
};

const wrap = "mx-auto max-w-screen-2xl px-5 xl:px-8 2xl:px-12";

// Shared input style
const inputClass =
  "w-full rounded-xl border border-transparent bg-grayy px-4 py-3 text-blackk placeholder:text-blackk/50 outline-none transition focus:border-bluee focus:bg-white";

// Small label + input wrapper
function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-blackk">
        {label}
        {required && <span className="text-bluee"> *</span>}
      </span>
      {children}
    </label>
  );
}

const ConsultationClinet = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [isSending, setIsSending] = useState(false);

  // Inline message shown above the button: { type: "success" | "error", text }
  const [status, setStatus] = useState(null);

  // 5. Calendar limits: no past dates, months/years dropdown up to 2 years ahead
  const today = startOfDay(new Date());
  const lastMonth = new Date(today.getFullYear() + 2, 11, 31);

  // DayPicker wants a Date object, our form stores "yyyy-MM-dd"
  const selectedDate = form.date
    ? parse(form.date, "yyyy-MM-dd", new Date())
    : undefined;

  // 6. One handler for every normal input (uses the input's name)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (status) setStatus(null); // clear the old message when user types again
  };

  // 7. Called when the user clicks a day on the calendar
  const handleSelectDate = (day) => {
    if (!day) return; // clicking the same day again would unselect it, ignore that
    setForm((prev) => ({ ...prev, date: format(day, "yyyy-MM-dd") }));
    if (status) setStatus(null);
  };

  // Readable text for the picked date, e.g. "Tuesday, 27 October 2026"
  const selectedLabel = selectedDate
    ? format(selectedDate, "EEEE, d MMMM yyyy")
    : "";

  // 8. Submit: basic check, send to backend, show message, reset
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);

    if (!form.name.trim() || !form.email.trim() || !form.date || !form.time) {
      setStatus({
        type: "error",
        text: "Please fill name, email, date and time.",
      });
      return;
    }

    try {
      setIsSending(true);
      await axios.post(API_URL, form);
      setStatus({
        type: "success",
        text: "Request sent! Please check your email for confirmation.",
      });
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus({
        type: "error",
        text:
          err?.response?.data?.message ||
          "Could not send your request. Try again.",
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="bg-grayy">
      {/* Calendar theme (brand colours) */}
      <style>{`
        .consult-dp .rdp-root {
          --rdp-accent-color: #3670ff;
          --rdp-accent-background-color: rgba(54,112,255,0.10);
          --rdp-day-height: 52px;
          --rdp-day-width: auto;
          --rdp-day_button-height: 44px;
          --rdp-day_button-width: 44px;
          --rdp-day_button-border-radius: 9999px;
          width: 100%;
        }

        /* full width month */
        .consult-dp .rdp-months,
        .consult-dp .rdp-month,
        .consult-dp .rdp-month_grid {
          width: 100%;
          max-width: none;
          table-layout: fixed;
          border-collapse: collapse;
        }
        .consult-dp .rdp-weekday,
        .consult-dp .rdp-day {
          width: 14.2857%;
          text-align: center;
        }
        .consult-dp .rdp-day_button { margin: 0 auto; }

        /* header: dropdowns + arrows */
        .consult-dp .rdp-month_caption { height: 44px; margin-bottom: 8px; }
        .consult-dp .rdp-dropdowns { gap: 8px; }
        .consult-dp .rdp-dropdown_root { border-radius: 9999px; }
        .consult-dp .rdp-dropdown {
          font-weight: 600;
          color: #171717;
        }
        .consult-dp .rdp-months_dropdown,
        .consult-dp .rdp-years_dropdown { font-weight: 600; }
        .consult-dp .rdp-caption_label {
          padding: 6px 12px;
          border-radius: 9999px;
          background: #f3f3f3;
          font-size: 14px;
          font-weight: 600;
          color: #171717;
        }
        .consult-dp .rdp-button_previous,
        .consult-dp .rdp-button_next {
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          background: #f3f3f3;
          transition: background 0.15s ease;
        }
        .consult-dp .rdp-button_previous:hover:not(:disabled),
        .consult-dp .rdp-button_next:hover:not(:disabled) { background: #3670ff; }
        .consult-dp .rdp-button_previous:hover:not(:disabled) .rdp-chevron,
        .consult-dp .rdp-button_next:hover:not(:disabled) .rdp-chevron { fill: #fff; }
        .consult-dp .rdp-chevron { fill: #171717; }
        .consult-dp .rdp-button_previous:disabled,
        .consult-dp .rdp-button_next:disabled { opacity: 0.3; cursor: not-allowed; }

        /* weekday names */
        .consult-dp .rdp-weekday {
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: rgba(23,23,23,0.5);
          padding: 8px 0 10px;
        }

        /* day numbers */
        .consult-dp .rdp-day_button {
          font-size: 14px;
          font-weight: 500;
          color: #171717;
          border: 2px solid transparent;
          transition: background 0.15s ease;
        }
        .consult-dp .rdp-day:not(.rdp-disabled):not(.rdp-selected) .rdp-day_button:hover {
          background: rgba(54,112,255,0.10);
        }

        /* today: yellow ring */
        .consult-dp .rdp-today:not(.rdp-selected) .rdp-day_button {
          border-color: #f9d601;
          font-weight: 700;
          color: #171717;
        }

        /* selected: solid blue circle */
        .consult-dp .rdp-selected .rdp-day_button {
          background: #3670ff;
          border-color: #3670ff;
          color: #fff;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(54,112,255,0.35);
        }
        .consult-dp .rdp-selected { font-size: inherit; font-weight: inherit; }

        /* past / blocked days */
        .consult-dp .rdp-disabled { opacity: 1; }
        .consult-dp .rdp-disabled .rdp-day_button {
          color: rgba(23,23,23,0.25);
          cursor: not-allowed;
        }
        .consult-dp .rdp-outside { opacity: 0.4; }
      `}</style>

      {/* Heading */}
      <section className="bg-white">
        <div className={`${wrap} py-12 text-center xl:py-16`}>
          <div className="mx-auto h-1 w-16 rounded-full bg-yelloww" />
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-blackk sm:text-5xl xl:text-6xl">
            Book a Consultation
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blackk/70">
            Tell us about your plans and pick a time that suits you. Our team
            will confirm your slot shortly.
          </p>
        </div>
      </section>

      {/* Form + side card */}
      <section className={`${wrap} py-10 xl:py-16`}>
        <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
          {/* Left: form */}
          <form
            onSubmit={handleSubmit}
            noValidate
            className="rounded-2xl bg-white p-6 xl:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Name" required>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your full name"
                  autoComplete="name"
                  className={inputClass}
                />
              </Field>

              <Field label="Email" required>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@company.com"
                  autoComplete="email"
                  className={inputClass}
                />
              </Field>

              <Field label="Phone">
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone number"
                  autoComplete="tel"
                  className={inputClass}
                />
              </Field>

              <Field label="Company">
                <input
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  placeholder="Company name"
                  autoComplete="organization"
                  className={inputClass}
                />
              </Field>

              <Field label="Service">
                <select
                  name="service"
                  value={form.service}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select a service</option>
                  {SERVICES.map((service) => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label="Mode">
                <select
                  name="mode"
                  value={form.mode}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select mode</option>
                  {MODES.map((mode) => (
                    <option key={mode} value={mode}>
                      {mode}
                    </option>
                  ))}
                </select>
              </Field>

              {/* Calendar (full width). A div, not a label, so clicks don't act on the label */}
              <div className="sm:col-span-2">
                <span className="mb-1.5 block text-sm font-medium text-blackk">
                  Preferred date <span className="text-bluee">*</span>
                </span>

                <div className="consult-dp rounded-2xl border border-grayy bg-white p-3 sm:p-4">
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={handleSelectDate}
                    disabled={{ before: today }} // past days blocked
                    captionLayout="dropdown" // month + year dropdown
                    startMonth={today}
                    endMonth={lastMonth}
                    defaultMonth={selectedDate || today}
                  />

                  {/* Legend */}
                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 px-1 text-xs text-blackk/60">
                    <span className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-bluee" />
                      Selected
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full ring-2 ring-yelloww" />
                      Today
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-blackk/15" />
                      Unavailable
                    </span>
                  </div>
                </div>

                {/* Selected date pill */}
                <div className="mt-3">
                  {selectedLabel ? (
                    <span className="inline-flex items-center gap-2 rounded-full bg-bluee/10 px-4 py-2 text-sm font-semibold text-bluee">
                      <CalendarCheck size={16} />
                      {selectedLabel}
                    </span>
                  ) : (
                    <p className="text-sm text-blackk/70">
                      Click a day to select your preferred date.
                    </p>
                  )}
                </div>
              </div>

              <Field label="Preferred time" required>
                <input
                  type="time"
                  name="time"
                  value={form.time}
                  onChange={handleChange}
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="mt-5">
              <Field label="Message">
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us briefly what you need help with"
                  className={`${inputClass} resize-none`}
                />
              </Field>
            </div>

            {/* Inline success / error message */}
            {status && (
              <p
                role={status.type === "error" ? "alert" : "status"}
                className={`mt-6 rounded-xl px-4 py-3 text-sm font-medium ${
                  status.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {status.text}
              </p>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-bluee px-8 py-3 font-semibold text-white transition-colors hover:bg-blackk disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSending ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
              {isSending ? "Sending..." : "Book consultation"}
            </button>
          </form>

          {/* Right: what happens next */}
          <aside className="h-fit rounded-2xl bg-blackk p-6 text-white xl:p-8">
            <CalendarCheck size={32} className="text-yelloww" />
            <h2 className="mt-4 text-2xl font-semibold">What happens next</h2>
            <ul className="mt-5 space-y-4 text-grayy">
              {[
                "We receive your request and send a confirmation email.",
                "Our team reviews it and confirms your slot.",
                "We connect with you at the chosen date and time.",
              ].map((step) => (
                <li key={step} className="flex gap-3">
                  <CheckCircle2
                    size={20}
                    className="mt-0.5 shrink-0 text-yelloww"
                  />
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Info cards */}
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {[
            { icon: Phone, label: "Call us", value: CONTACT.phone, href: `tel:${CONTACT.phone}` },
            { icon: Mail, label: "Email us", value: CONTACT.email, href: `mailto:${CONTACT.email}` },
            { icon: MapPin, label: "Visit us", value: CONTACT.address },
          ].map(({ icon: Icon, label, value, href }) => {
            const content = (
              <>
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-bluee/10 text-bluee">
                  <Icon size={22} />
                </span>
                <span className="mt-4 text-sm text-blackk/60">{label}</span>
                <span className="mt-1 break-words text-lg font-semibold text-blackk">
                  {value}
                </span>
              </>
            );

            const cardClass =
              "flex flex-col rounded-2xl bg-white p-6 transition-shadow hover:shadow-md";

            return href ? (
              <a key={label} href={href} className={cardClass}>
                {content}
              </a>
            ) : (
              <div key={label} className={cardClass}>
                {content}
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default ConsultationClinet;