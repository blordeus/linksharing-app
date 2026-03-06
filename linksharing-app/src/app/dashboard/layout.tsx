import Link from "next/link"
import LogoutButton from "@/components/LogoutButton"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-7xl p-6">

        {/* Header */}
        <header className="mb-6 flex items-center justify-between rounded-xl bg-white p-4 shadow-sm">

          <h1 className="font-semibold text-lg">
            Link Sharing
          </h1>

          <nav className="flex gap-2">

            <Link
              href="/dashboard/links"
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-100"
            >
              Links
            </Link>

            <Link
              href="/dashboard/profile"
              className="rounded-lg px-4 py-2 text-sm font-medium hover:bg-slate-100"
            >
              Profile Details
            </Link>

          </nav>

          <LogoutButton />

        </header>

        {/* Page Content */}
        <div className="rounded-xl bg-white p-6 shadow-sm">
          {children}
        </div>

      </div>

    </main>
  )
}