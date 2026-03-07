"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import LogoutButton from "@/components/LogoutButton"

export default function DashboardHeader() {
  const pathname = usePathname()

  const navLinkClass = (href: string) =>
    `rounded-lg px-4 py-2 text-sm font-semibold transition ${
      pathname === href
        ? "bg-[#EFEBFF] text-[#633CFF]"
        : "text-[#737373] hover:bg-[#F5F5F5]"
    }`

  return (
    <header className="mb-6 rounded-2xl bg-white p-4 shadow-sm md:px-6 md:py-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* Top row on mobile */}
        <div className="flex items-center justify-between md:contents">
          <Link href="/dashboard/links" className="shrink-0">
            <span className="text-lg font-bold text-[#333333]">
              devlinks
            </span>
          </Link>

          <div className="md:hidden">
            <Link
              href="/preview"
              className="rounded-lg border border-[#633CFF] px-4 py-2 text-sm font-semibold text-[#633CFF] transition hover:bg-[#EFEBFF]"
            >
              Preview
            </Link>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-2 overflow-x-auto">
          <Link href="/dashboard/links" className={navLinkClass("/dashboard/links")}>
            Links
          </Link>

          <Link href="/dashboard/profile" className={navLinkClass("/dashboard/profile")}>
            Profile Details
          </Link>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/preview"
            className="rounded-lg border border-[#633CFF] px-4 py-2 text-sm font-semibold text-[#633CFF] transition hover:bg-[#EFEBFF]"
          >
            Preview
          </Link>

          <LogoutButton />
        </div>

        {/* Mobile logout */}
        <div className="md:hidden">
          <LogoutButton />
        </div>
      </div>
    </header>
  )
}