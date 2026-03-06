import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto flex max-w-6xl gap-6 p-6">
        <aside className="w-64 rounded-xl bg-white p-4 shadow-sm">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-semibold">Link Sharing</h2>
            <LogoutButton />
          </div>

          <nav className="space-y-2">
            <Link
              href="/dashboard/links"
              className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100"
            >
              Links
            </Link>
            <Link
              href="/dashboard/profile"
              className="block rounded-lg px-3 py-2 text-sm hover:bg-slate-100"
            >
              Profile Details
            </Link>
          </nav>
        </aside>

        <section className="flex-1 rounded-xl bg-white p-6 shadow-sm">
          {children}
        </section>
      </div>
    </main>
  );
}