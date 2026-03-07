import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { platforms } from "@/lib/platforms";
import CopyProfileLinkButton from "@/components/CopyProfileLinkButton";

function formatExternalUrl(url: string) {
  const trimmed = url.trim();

  if (!trimmed) return "#";

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export default async function PreviewPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] px-4 py-6">
        <div className="mx-auto max-w-[1392px] rounded-xl bg-white p-6 shadow-sm">
          <p className="text-sm text-[#737373]">
            You need to be logged in to view this page.
          </p>
        </div>
      </main>
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", user.id)
    .order("sort_order", { ascending: true });

  const fullName =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ").trim() ||
    profile?.username ||
    "Your Name";

  const username = profile?.username || "";
  const avatarUrl = profile?.avatar_url || "";

  return (
    <main className="min-h-screen bg-[#FAFAFA] px-4 py-4 md:px-6 md:py-6">
      <div className="mx-auto max-w-[1392px]">
        <header className="rounded-xl bg-white p-4 shadow-sm md:p-6">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/dashboard/links"
              className="rounded-lg border border-[#633CFF] px-4 py-3 text-sm font-semibold text-[#633CFF] transition hover:bg-[#EFEBFF]"
            >
              Back to Editor
            </Link>

            {username ? (
              <CopyProfileLinkButton username={username} label="Share Link" />
            ) : null}
          </div>
        </header>

        <div className="relative mt-6 min-h-[calc(100vh-140px)] overflow-hidden rounded-[32px] bg-[#FAFAFA]">
          <div className="hidden h-[357px] rounded-b-[32px] bg-[#633CFF] md:block" />

          <div className="relative md:-mt-[220px] md:px-4 md:pb-16">
            <div className="mx-auto w-full max-w-[349px] rounded-[24px] bg-white px-6 pb-12 pt-12 shadow-[0_0_32px_rgba(0,0,0,0.08)] md:px-10">
              <div className="text-center">
                <div className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border-4 border-[#633CFF] bg-[#EEEEEE]">
                  {avatarUrl ? (
                    <Image
                      src={avatarUrl}
                      alt={fullName}
                      width={96}
                      height={96}
                      className="h-full w-full object-cover"
                    />
                  ) : null}
                </div>

                <h1 className="text-[32px] font-bold leading-[1.1] text-[#333333]">
                  {fullName}
                </h1>

                {profile?.email ? (
                  <p className="mt-2 text-[16px] text-[#737373]">
                    {profile.email}
                  </p>
                ) : username ? (
                  <p className="mt-2 text-[16px] text-[#737373]">
                    @{username}
                  </p>
                ) : null}
              </div>

              <div className="mt-14 space-y-4">
                {links && links.length > 0 ? (
                  links.map((link) => {
                    const platform = platforms[link.platform];
                    const Icon = platform?.icon;

                    return (
                      <a
                        key={link.id}
                        href={formatExternalUrl(link.url)}
                        target="_blank"
                        rel="noreferrer"
                        className="flex min-h-[56px] items-center justify-between rounded-lg px-4 text-[16px] font-semibold transition hover:opacity-90"
                        style={{
                          backgroundColor:
                            platform?.backgroundColor || "#1A1A1A",
                          color: platform?.textColor || "#FFFFFF",
                          border:
                            platform?.backgroundColor === "#FFFFFF"
                              ? "1px solid #D9D9D9"
                              : "none",
                        }}
                      >
                        <span className="flex min-w-0 items-center gap-3">
                          {Icon ? <Icon size={18} /> : null}
                          <span className="truncate">{link.platform}</span>
                        </span>

                        <span aria-hidden="true" className="shrink-0">
                          →
                        </span>
                      </a>
                    );
                  })
                ) : (
                  <div className="rounded-xl bg-[#FAFAFA] px-6 py-10 text-center">
                    <p className="text-sm text-[#737373]">
                      No links have been added yet.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}