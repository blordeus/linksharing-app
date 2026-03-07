"use client"

import Image from "next/image"

type Link = {
  id: string
  platform: string
  url: string
}

type Props = {
  username?: string
  avatarUrl?: string
  links: Link[]
}

const platformStyles: Record<
  string,
  {
    bg: string
    text: string
    icon?: string
  }
> = {
  github: {
    bg: "#1A1A1A",
    text: "#FFFFFF",
  },
  youtube: {
    bg: "#EE3939",
    text: "#FFFFFF",
  },
  linkedin: {
    bg: "#2D68FF",
    text: "#FFFFFF",
  },
  devto: {
    bg: "#333333",
    text: "#FFFFFF",
  },
  frontendmentor: {
    bg: "#FFFFFF",
    text: "#333333",
  },
}

function getPlatformStyle(platform: string) {
  return (
    platformStyles[platform.toLowerCase()] ?? {
      bg: "#633CFF",
      text: "#FFFFFF",
    }
  )
}

export default function PhonePreview({ username, links }: Props) {
  return (
    <aside className="hidden lg:flex w-full max-w-[420px] items-center justify-center rounded-[24px] bg-white p-6 shadow-sm">
      <div className="relative h-[631px] w-[307px] rounded-[40px] border-[1.5px] border-[#737373] bg-white px-6 pt-14 pb-8 shadow-sm">
        {/* top notch */}
        <div className="absolute left-1/2 top-3 h-8 w-40 -translate-x-1/2 rounded-b-2xl border-x-[1.5px] border-b-[1.5px] border-[#737373] bg-white" />

        {/* profile section */}
        <div className="flex flex-col items-center">
          {avatarUrl ? (
  <Image
    src={avatarUrl}
    alt={username || "Profile avatar"}
    width={96}
    height={96}
    className="mb-6 h-24 w-24 rounded-full border-4 border-[#633CFF] object-cover"
  />
) : (
  <div className="mb-6 h-24 w-24 rounded-full border-4 border-[#633CFF] bg-[#EEEEEE]" />
)}

          <div className="mb-3 min-h-[32px]">
            {username ? (
              <p className="text-[18px] font-bold leading-none text-[#333333]">
                {username}
              </p>
            ) : (
              <div className="h-4 w-40 rounded-full bg-[#EEEEEE]" />
            )}
          </div>

          <div className="mb-10 h-2 w-24 rounded-full bg-[#EEEEEE]" />
        </div>

        {/* links */}
        <div className="space-y-5">
          {links.length === 0 ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-11 rounded-lg bg-[#EEEEEE]"
                />
              ))}
            </>
          ) : (
            links.slice(0, 5).map((link) => {
              const style = getPlatformStyle(link.platform)

              return (
                <a
                  key={link.id}
                  href={link.url || "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-11 items-center justify-between rounded-lg px-4 text-sm font-medium transition-transform hover:scale-[1.01]"
                  style={{
                    backgroundColor: style.bg,
                    color: style.text,
                    border:
                      link.platform.toLowerCase() === "frontendmentor"
                        ? "1px solid #D9D9D9"
                        : "none",
                  }}
                >
                  <span className="truncate">{link.platform}</span>
                  <span aria-hidden="true">→</span>
                </a>
              )
            })
          )}
        </div>
      </div>
    </aside>
  )
}