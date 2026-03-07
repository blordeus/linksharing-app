import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard/links");
  }

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
          <div className="text-left">
            <h1 className="text-[32px] font-bold leading-none text-[#333333]">
              Share all your links in one place
            </h1>

            <p className="mt-4 text-[16px] leading-6 text-[#737373]">
              Create a profile, organize your links, preview your page, and
              share a polished public profile.
            </p>
          </div>

          <div className="mt-8 space-y-4">
            <Link
              href="/signup"
              className="block w-full rounded-lg bg-[#633CFF] px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#7B5CFF]"
            >
              Get started
            </Link>

            <Link
              href="/login"
              className="block w-full rounded-lg border border-[#633CFF] px-4 py-3 text-center text-sm font-semibold text-[#633CFF] transition hover:bg-[#EFEBFF]"
            >
              Log in
            </Link>
          </div>

          <div className="mt-8 rounded-xl bg-[#FAFAFA] p-4">
            <div className="space-y-3">
              <div className="h-3 w-28 rounded-full bg-[#E9E9E9]" />
              <div className="h-11 rounded-lg bg-[#633CFF]" />
              <div className="h-11 rounded-lg bg-[#1A1A1A]" />
              <div className="h-11 rounded-lg bg-[#2D68FF]" />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}