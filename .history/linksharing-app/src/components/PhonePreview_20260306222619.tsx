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

function getPlatformData(platform: string) {
  return (
    platforms[platform] ?? {
      backgroundColor: "#633CFF",
      textColor: "#FFFFFF",
    }
  );
}

  const map: Record<
    string,
    {
      backgroundColor: string;
      color: string;
      icon?: React.ComponentType<{ size?: number }>;
    }
  > = {
    github: {
      backgroundColor: "#1A1A1A",
      color: "#FFFFFF",
      icon: platforms["github"]?.icon,
    },
    "frontend mentor": {
      backgroundColor: "#FFFFFF",
      color: "#333333",
      icon: platforms["frontend mentor"]?.icon,
    },
    linkedin: {
      backgroundColor: "#2D68FF",
      color: "#FFFFFF",
      icon: platforms["linkedin"]?.icon,
    },
    youtube: {
      backgroundColor: "#EE3939",
      color: "#FFFFFF",
      icon: platforms["youtube"]?.icon,
    },
    "dev.to": {
      backgroundColor: "#333333",
      color: "#FFFFFF",
      icon: platforms["dev.to"]?.icon,
    },
    twitter: {
      backgroundColor: "#43B7E9",
      color: "#FFFFFF",
      icon: platforms["twitter"]?.icon,
    },
    facebook: {
      backgroundColor: "#2442AC",
      color: "#FFFFFF",
      icon: platforms["facebook"]?.icon,
    },
    twitch: {
      backgroundColor: "#EE3FC8",
      color: "#FFFFFF",
      icon: platforms["twitch"]?.icon,
    },
    codewars: {
      backgroundColor: "#8A1A50",
      color: "#FFFFFF",
      icon: platforms["codewars"]?.icon,
    },
    codepen: {
      backgroundColor: "#302267",
      color: "#FFFFFF",
      icon: platforms["codepen"]?.icon,
    },
    freecodecamp: {
      backgroundColor: "#302267",
      color: "#FFFFFF",
      icon: platforms["freecodecamp"]?.icon,
    },
    gitlab: {
      backgroundColor: "#EB4925",
      color: "#FFFFFF",
      icon: platforms["gitlab"]?.icon,
    },
    hashnode: {
      backgroundColor: "#0330D1",
      color: "#FFFFFF",
      icon: platforms["hashnode"]?.icon,
    },
    "stack overflow": {
      backgroundColor: "#EC7100",
      color: "#FFFFFF",
      icon: platforms["stack overflow"]?.icon,
    },
  };

  return (
    map[key] ?? {
      backgroundColor: "#633CFF",
      color: "#FFFFFF",
    }
  );
}

function formatPreviewUrl(url: string) {
  const trimmed = url.trim();

  if (!trimmed) return "#";

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export default function PhonePreview({ username, avatarUrl, links }: Props) {
  return (
    <aside className="hidden lg:flex w-full max-w-[420px] items-center justify-center rounded-[24px] bg-white p-6 shadow-sm">
      <div className="relative h-[631px] w-[307px] rounded-[40px] border-[1.5px] border-[#737373] bg-white px-6 pt-14 pb-8 shadow-sm">
        <div className="absolute left-1/2 top-3 h-8 w-40 -translate-x-1/2 rounded-b-2xl border-x-[1.5px] border-b-[1.5px] border-[#737373] bg-white" />

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

        <div className="space-y-5">
          {links.length === 0
            ? Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="h-11 rounded-lg bg-[#EEEEEE]" />
              ))
            : links.slice(0, 5).map((link) => {
                const platformData = getPlatformData(link.platform);
                const Icon = platformData.icon;

                return (
                  <a
                    key={link.id}
                    href={formatPreviewUrl(link.url)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 items-center justify-between rounded-lg px-4 text-sm font-medium transition hover:scale-[1.01]"
                    style={{
                      backgroundColor: platformData.backgroundColor,
                      color: platformData.color,
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
    </aside>
  );
}
