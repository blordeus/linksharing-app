import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function Home() {

  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/dashboard/links")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">

      <div className="w-full max-w-xl rounded-2xl bg-white p-10 text-center shadow-sm">

        <h1 className="text-3xl font-bold">
          Link Sharing App
        </h1>

        <p className="mt-4 text-slate-600">
          Create your profile, add your links, and share them with a single public page.
        </p>

        <div className="mt-8 flex items-center justify-center gap-4">

          <Link
            href="/signup"
            className="rounded-lg bg-black px-5 py-3 font-medium text-white hover:opacity-90"
          >
            Sign up
          </Link>

          <Link
            href="/login"
            className="rounded-lg border px-5 py-3 font-medium hover:bg-slate-50"
          >
            Log in
          </Link>

        </div>

      </div>

    </main>
  )
}