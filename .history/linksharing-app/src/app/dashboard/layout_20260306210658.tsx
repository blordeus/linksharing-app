import Link from "next/link"
import { headers } from "next/headers"
import LogoutButton from "@/components/LogoutButton"

function isActive(pathname: string, href: string) {
  return pathname === href
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const pathname = headersList.get("x-next-pathname") || ""

  return (
    <main className="min-h-screen bg-[#FAFAFA] p-4 md:p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-6 rounded-2xl bg-white p-4 shadow-sm md:px-6 md:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/dashboard/links" className="shrink-0">
              <span className="text-lg font-bold text-[#333333]">
                devlinks
              </span>
            </Link>

            {/* Nav */}
            <nav className="flex items-center gap-2">
              <Link
                href="/dashboard/links"
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  isActive(pathname, "/dashboard/links")
                    ? "bg-[#EFEBFF] text-[#633CFF]"
                    : "text-[#737373] hover:bg-[#F5F5F5]"
                }`}
              >
                Links
              </Link>

              <Link
                href="/dashboard/profile"
                className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                  isActive(pathname, "/dashboard/profile")
                    ? "bg-[#EFEBFF] text-[#633CFF]"
                    : "text-[#737373] hover:bg-[#F5F5F5]"
                }`}
              >
                Profile Details
              </Link>
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-3">
              <Link
                href="/preview"
                className="rounded-lg border border-[#633CFF] px-4 py-2 text-sm font-semibold text-[#633CFF] transition hover:bg-[#EFEBFF]"
              >
                Preview
              </Link>

              <LogoutButton />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
          {children}
        </section>
      </div>
    </main>
  )
}