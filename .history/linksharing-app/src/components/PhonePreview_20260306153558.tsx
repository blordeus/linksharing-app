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