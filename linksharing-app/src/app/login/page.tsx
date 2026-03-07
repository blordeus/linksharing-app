"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLock, FiMail } from "react-icons/fi";
import { createClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard/profile");
    router.refresh();
    setLoading(false);
  }

  const hasError = Boolean(error);

  return (
    <main className="min-h-screen bg-[#FAFAFA] px-4 py-10 md:px-6 md:py-16">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-[476px] flex-col items-center justify-center">
        <div className="mb-10">
          <Image
            src="/assets/images/logo-devlinks-large.svg"
            alt="devlinks"
            width={182}
            height={40}
            priority
            className="h-auto w-auto"
          />
        </div>

        <section className="w-full rounded-2xl bg-white p-8 shadow-sm md:p-10">
          <h1 className="text-[32px] font-bold leading-none text-[#333333]">
            Login
          </h1>

          <p className="mt-2 text-[16px] leading-6 text-[#737373]">
            Add your details below to get back into the app
          </p>

          <form onSubmit={handleLogin} className="mt-10 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-medium text-[#333333]"
              >
                Email address
              </label>

              <div
                className={`flex h-12 items-center gap-3 rounded-lg border bg-white px-4 transition ${
                  hasError
                    ? "border-[#FF3939] ring-1 ring-[#FF3939]/20"
                    : "border-[#D9D9D9] focus-within:border-[#633CFF] focus-within:ring-2 focus-within:ring-[#EFEBFF]"
                }`}
              >
                <FiMail
                  className={hasError ? "text-[#FF3939]" : "text-[#737373]"}
                  size={16}
                />

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. alex@email.com"
                  className="w-full border-0 bg-transparent text-sm text-[#333333] outline-none placeholder:text-[#737373]"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium text-[#333333]"
              >
                Password
              </label>

              <div
                className={`flex h-12 items-center gap-3 rounded-lg border bg-white px-4 transition ${
                  hasError
                    ? "border-[#FF3939] ring-1 ring-[#FF3939]/20"
                    : "border-[#D9D9D9] focus-within:border-[#633CFF] focus-within:ring-2 focus-within:ring-[#EFEBFF]"
                }`}
              >
                <FiLock
                  className={hasError ? "text-[#FF3939]" : "text-[#737373]"}
                  size={16}
                />

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full border-0 bg-transparent text-sm text-[#333333] outline-none placeholder:text-[#737373]"
                  required
                />
              </div>
            </div>

            {error ? (
              <p className="text-sm font-medium text-[#FF3939]">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#633CFF] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#7B5CFF] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#737373]">
            Don’t have an account?{" "}
            <Link
              href="/signup"
              className="font-medium text-[#633CFF] transition hover:underline"
            >
              Create account
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}