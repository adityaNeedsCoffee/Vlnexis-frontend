"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { getLoginError, useLogin } from "../api/hooks/user/useLogin";

const LoginPage = () => {
  const router = useRouter();

  // Step 1: Store what the user types
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    <div className="flex min-h-screen items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md space-y-5 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
      >
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Welcome back</h1>
          <p className="text-sm text-gray-500">Log in to your NEXIS account</p>
        </div>

        {/* Email field */}
        <div className="space-y-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-900"
          />
        </div>

        {/* Password field */}
        <div className="space-y-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-gray-900"
          />
        </div>

        {/* Error message from the backend (e.g. "Invalid email or password") */}
        {loginMutation.isError && (
          <p className="text-sm text-red-600">{getLoginError(loginMutation.error)}</p>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full rounded-lg bg-gray-900 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-60"
        >
          {loginMutation.isPending ? "Logging in..." : "Log in"}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;