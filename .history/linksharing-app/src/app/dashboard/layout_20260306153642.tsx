import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
type LinkItem = {
  id: string
  platform: string
  url: string
}

type Props = {
  username?: string
  links: LinkItem[]
}

export default function PhonePreview({ username, links }: Props) {
  return (
    <div className="hidden lg:flex w-[320px] items-center justify-center">
      <div className="h-[600px] w-[280px] rounded-[40px] border bg-white shadow-lg p-6 flex flex-col">

        <div className="text-center mb-6">
          <div className="h-16 w-16 rounded-full bg-slate-200 mx-auto mb-2" />
          <p className="font-semibold">
            {username || "Your Name"}
          </p>
        </div>

        <div className="space-y-3">
          {links.length === 0 ? (
            <p className="text-sm text-slate-400 text-center">
              Your links will appear here
            </p>
          ) : (
            links.map((link) => (
              <a
                key={link.id}
                href={link.url || "#"}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg bg-black text-white text-sm text-center py-2"
              >
                {link.platform}
              </a>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

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