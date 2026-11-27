"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSignupError, useSignup } from "../api/hooks/user/useSingup";


// Shared input styling so all fields look the same
const inputClass =
  "w-full rounded-xl border border-transparent bg-grayy px-4 py-3 text-sm text-blackk outline-none transition placeholder:text-blackk/40 focus:border-bluee focus:bg-white focus:ring-4 focus:ring-bluee/15";
const labelClass = "text-sm font-medium text-blackk";

const SignupClient = () => {
  const router = useRouter();

  // Step 1: Store what the user types
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: Our own error message (for checks we do before calling the backend)
  const [formError, setFormError] = useState("");

  // Step 3: The signup mutation from our hook
  const signupMutation = useSignup();

  // Step 4: Runs when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();
    setFormError("");

    // Step 5: Check the passwords before sending anything to the backend
    if (password.length < 6) {
      setFormError("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }

    // Step 6: Send the data to the backend
    signupMutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          // Step 7: Account created, so send the user to the login page
          router.push("/login");
        },
      }
    );
  };

  // Shows our own error first, otherwise the backend error
  const errorMessage = formError
    ? formError
    : signupMutation.isError
    ? getSignupError(signupMutation.error)
    : "";

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-grayy px-4 py-10">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        {/* ---------------- LEFT PANEL (hidden on mobile) ---------------- */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-blackk p-10 text-white md:flex">
          <div className="flex items-center">
            <Image
              src="/HomePageImages/vlnexisLogo.png"
              alt="NEXIS"
              width={160}
              height={48}
              priority
              className="h-10 w-auto"
            />
          </div>

          <div className="relative z-10 space-y-3">
            <h2 className="text-4xl font-semibold leading-tight">
              Create your account.
            </h2>
            <p className="max-w-xs text-sm text-white/70">
              It takes less than a minute to get started.
            </p>
          </div>

          {/* Decorative big yellow circle, cut off at the bottom-right corner */}
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-yelloww" />
        </div>

        {/* ---------------- RIGHT PANEL (the form) ---------------- */}
        <form onSubmit={handleSubmit} className="space-y-5 p-8 sm:p-10">
          <div className="space-y-2">
            <Image
              src="/HomePageImages/vlnexisLogo.png"
              alt="NEXIS"
              width={160}
              height={48}
              className="h-10 w-auto md:hidden"
            />
            <h1 className="text-3xl font-semibold text-blackk">Sign up</h1>
            <p className="text-sm text-blackk/60">
              Fill in your details to create a NEXIS account.
            </p>
          </div>

          {/* Name */}
          <div className="space-y-1.5">
            <label htmlFor="name" className={labelClass}>
              Full name
            </label>
            <input
              id="name"
              type="text"
              required
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your full name"
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className={inputClass}
            />
          </div>

          {/* Password (with show / hide button) */}
          <div className="space-y-1.5">
            <label htmlFor="password" className={labelClass}>
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 6 characters"
                className={`${inputClass} pr-16`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-bluee hover:bg-bluee/10 focus-visible:outline-2 focus-visible:outline-bluee"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div className="space-y-1.5">
            <label htmlFor="confirmPassword" className={labelClass}>
              Confirm password
            </label>
            <input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Type the password again"
              className={inputClass}
            />
          </div>

          {/* Error message (our own check or the backend message) */}
          {errorMessage && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {errorMessage}
            </p>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={signupMutation.isPending}
            className="w-full rounded-xl bg-yelloww py-3 text-sm font-semibold text-blackk transition hover:bg-blackk hover:text-yelloww focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bluee disabled:cursor-not-allowed disabled:opacity-60"
          >
            {signupMutation.isPending ? "Creating account..." : "Create account"}
          </button>

          {/* Link to the login page */}
          <p className="text-center text-sm text-blackk/60">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-bluee hover:underline focus-visible:outline-2 focus-visible:outline-bluee"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupClient;