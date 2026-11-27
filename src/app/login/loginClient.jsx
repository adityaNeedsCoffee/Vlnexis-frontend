"use client";

import React, { useState } from "react";
import Image from "next/image"; // (NEW) used to show the NEXIS logo image
import { useRouter } from "next/navigation";
import { getLoginError, useLogin } from "../api/hooks/user/useLogin";

const LoginPage = () => {
  const router = useRouter();

  // Step 1: Store what the user types
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // (NEW) Controls whether the password is visible or hidden
  const [showPassword, setShowPassword] = useState(false);

  // Step 2: The login mutation from our hook
  const loginMutation = useLogin();

  // Step 3: Runs when the form is submitted
  const handleSubmit = (event) => {
    event.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: ({ token, user }) => {
          // Step 4: Save the token and user so other pages can use them
          localStorage.setItem("nexis_token", token);
          localStorage.setItem("nexis_user", JSON.stringify(user));

          // Step 5: Send the user to the home page (change this path if needed)
          router.push("/");
        },
      }
    );
  };

  return (
    // Page background: bright gray, form card centered in the middle
    <div className="flex min-h-[80vh] items-center justify-center bg-grayy px-4 py-10">
      {/* Card: left brand panel (desktop only) + right form */}
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-xl md:grid-cols-2">
        {/* ---------------- LEFT PANEL (hidden on mobile) ---------------- */}
        <div className="relative hidden flex-col justify-between overflow-hidden bg-blackk p-10 text-white md:flex">
          {/* Logo: file is in public/HomePageImages, so the path starts with / (no "public") */}
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

          {/* Welcome text */}
          <div className="relative z-10 space-y-3">
            <h2 className="text-4xl font-semibold leading-tight">
              Good to see you again.
            </h2>
            <p className="max-w-xs text-sm text-white/70">
              Log in to continue where you left off.
            </p>
          </div>

          {/* Decorative big yellow circle, cut off at the bottom-right corner */}
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-yelloww" />
        </div>

        {/* ---------------- RIGHT PANEL (the form) ---------------- */}
        <form onSubmit={handleSubmit} className="space-y-6 p-8 sm:p-10">
          {/* Heading (on mobile this is the only branding, so we show a small logo too) */}
          <div className="space-y-2">
            <Image
              src="/HomePageImages/vlnexisLogo.png"
              alt="NEXIS"
              width={160}
              height={48}
              className="h-10 w-auto md:hidden"
            />
            <h1 className="text-3xl font-semibold text-blackk">Log in</h1>
            <p className="text-sm text-blackk/60">
              Enter your email and password to open your NEXIS account.
            </p>
          </div>

          {/* Email field */}
          <div className="space-y-1.5">
            <label htmlFor="email" className="text-sm font-medium text-blackk">
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
              className="w-full rounded-xl border border-transparent bg-grayy px-4 py-3 text-sm text-blackk outline-none transition placeholder:text-blackk/40 focus:border-bluee focus:bg-white focus:ring-4 focus:ring-bluee/15"
            />
          </div>

          {/* Password field (with show / hide button) */}
          <div className="space-y-1.5">
            <label htmlFor="password" className="text-sm font-medium text-blackk">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-xl border border-transparent bg-grayy py-3 pl-4 pr-16 text-sm text-blackk outline-none transition placeholder:text-blackk/40 focus:border-bluee focus:bg-white focus:ring-4 focus:ring-bluee/15"
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

          {/* Error message from the backend (e.g. "Invalid email or password") */}
          {loginMutation.isError && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
            >
              {getLoginError(loginMutation.error)}
            </p>
          )}

          {/* Submit button: yellow with dark text, turns dark on hover */}
          <button
            type="submit"
            disabled={loginMutation.isPending}
            className="w-full rounded-xl bg-yelloww py-3 text-sm font-semibold text-blackk transition hover:bg-blackk hover:text-yelloww focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bluee disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loginMutation.isPending ? "Logging in..." : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;