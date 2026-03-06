"use client"

type Link = {
  id: string
  platform: string
  url: string
}

type Props = {
  username?: string
  links: Link[]
}

export default function PhonePreview({ username, links }: Props) {
  return (
    <div className="hidden lg:flex w-[340px] items-center justify-center">

      <div className="h-[640px] w-[300px] rounded-[40px] border bg-white shadow-lg p-6">

        <div className="text-center mb-6">

          <div className="h-20 w-20 rounded-full bg-slate-200 mx-auto mb-3" />

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
                className="block rounded-lg bg-black text-white text-center py-3 font-medium"
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