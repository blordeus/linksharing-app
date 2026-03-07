"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

function navLinkClass(isActive: boolean) {
  return [
    "flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm font-semibold transition",
    isActive
      ? "bg-[#EFEBFF] text-[#633CFF]"
      : "text-[#737373] hover:bg-[#F5F5F5]",
  ].join(" ");
}

export default function DashboardHeader() {
  const pathname = usePathname();

  const isLinks = pathname === "/dashboard/links";
  const isProfile = pathname === "/dashboard/profile";

  return (
    <header className="mb-6 rounded-xl bg-white p-4 shadow-sm md:px-6 md:py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/dashboard/links" className="shrink-0">
          <div className="hidden md:block">
            <Image
              src="assets/images/logo-devlinks-large.svg"
              alt="devlinks"
              width={146}
              height={32}
              priority
            />
          </div>

          <div className="block md:hidden">
            <Image
              src="/images/logo-devlinks-small.svg"
              alt="devlinks"
              width={32}
              height={32}
              priority
            />
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-2">
          <Link href="/dashboard/links" className={navLinkClass(isLinks)}>
            <Image
              src="/images/icon-links-header.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Links</span>
          </Link>

          <Link href="/dashboard/profile" className={navLinkClass(isProfile)}>
            <Image
              src="/images/icon-profile-details-header.svg"
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
            <span className="hidden sm:inline">Profile Details</span>
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href={pathname === "/preview" ? "/dashboard/links" : "/preview"}
            className="rounded-lg border border-[#633CFF] px-4 py-3 text-sm font-semibold text-[#633CFF] transition hover:bg-[#EFEBFF]"
          >
            <span className="hidden sm:inline">Preview</span>
            <span className="sm:hidden">Preview</span>
          </Link>

          <div className="hidden md:block">
            <LogoutButton />
          </div>
        </div>
      </div>

      <div className="mt-4 md:hidden">
        <LogoutButton />
      </div>
    </header>
  );
}