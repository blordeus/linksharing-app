"use client";

import Image from "next/image";
import { platforms } from "@/lib/platforms";

type Link = {
  id: string;
  platform: string;
  url: string;
};

type Props = {
  username?: string;
  avatarUrl?: string;
  themeColor?: string;
  links: Link[];
};

function formatPreviewUrl(url: string) {
  const trimmed = url.trim();

  if (!trimmed) return "#";

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

function getPlatformData(platform: string, themeColor: string) {
  return (
    platforms[platform] ?? {
      backgroundColor: themeColor,
      textColor: "#FFFFFF",
    }
  );
}

export default function PhonePreview({
  username,
  avatarUrl,
  themeColor = "#633CFF",
  links,
}: Props) {
  return (
    <aside className="hidden lg:flex w-full max-w-[420px] items-center justify-center rounded-[24px] bg-white p-6 shadow-sm">
      <div className="relative h-[631px] w-[307px]">
        <Image
          src="/assets/images/illustration-phone-mockup.svg"
          alt="Phone mockup"
          fill
          className="pointer-events-none select-none object-contain"
        />

        <div className="absolute inset-0 flex flex-col items-center px-[34px] pt-[64px]">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={username || "Profile avatar"}
              width={96}
              height={96}
              className="mb-6 h-24 w-24 rounded-full border-4 object-cover"
              style={{ borderColor: themeColor }}
            />
          ) : (
            <div
              className="mb-6 h-24 w-24 rounded-full border-4 bg-[#EEEEEE]"
              style={{ borderColor: themeColor }}
            />
          )}

          <div className="mb-3 min-h-[32px]">
            {username ? (
              <p className="text-center text-[18px] font-bold leading-none text-[#333333]">
                {username}
              </p>
            ) : (
              <div className="h-4 w-40 rounded-full bg-[#EEEEEE]" />
            )}
          </div>

          <div className="mb-10 h-2 w-24 rounded-full bg-[#EEEEEE]" />

          <div className="w-full space-y-5">
            {links.length === 0
              ? Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-11 rounded-lg bg-[#EEEEEE]" />
                ))
              : links.slice(0, 5).map((link) => {
                  const platformData = getPlatformData(link.platform, themeColor);
                  const Icon = "icon" in platformData ? platformData.icon : null;

                  return (
                    <a
                      key={link.id}
                      href={formatPreviewUrl(link.url)}
                      target="_blank"
                      rel="noreferrer"
                      className="flex h-11 items-center justify-between rounded-lg px-4 text-sm font-medium transition hover:scale-[1.01]"
                      style={{
                        backgroundColor: platformData.backgroundColor,
                        color: platformData.textColor,
                        border:
                          platformData.backgroundColor === "#FFFFFF"
                            ? "1px solid #D9D9D9"
                            : "none",
                      }}
                    >
                      <span className="flex min-w-0 items-center gap-2">
                        {Icon ? <Icon size={16} /> : null}
                        <span className="truncate">{link.platform}</span>
                      </span>

                      <span aria-hidden="true">→</span>
                    </a>
                  );
                })}
          </div>
        </div>
      </div>
    </aside>
  );
}