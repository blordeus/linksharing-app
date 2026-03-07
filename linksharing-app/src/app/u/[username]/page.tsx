import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { platforms } from "@/lib/platforms";

function formatExternalUrl(url: string) {
  const trimmed = url.trim();

  if (!trimmed) return "#";

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  const normalizedUsername = username.trim().toLowerCase();

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", normalizedUsername)
    .single();

  if (profileError || !profile) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] px-4 py-16">
        <div className="mx-auto max-w-[349px] rounded-3xl bg-white p-10 text-center shadow-sm">
          <h1 className="text-[24px] font-bold text-[#333333]">
            Profile not found
          </h1>
          <p className="mt-3 text-sm text-[#737373]">
            This profile does not exist or is no longer available.
          </p>
        </div>
      </main>
    );
  }

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", profile.id)
    .order("sort_order", { ascending: true });

  const fullName =
    [profile.first_name, profile.last_name].filter(Boolean).join(" ").trim() ||
    profile.username;

  const themeColor = profile.theme_color || "#633CFF";

  return (
    <main className="min-h-screen bg-[#FAFAFA]">
      <div className="h-[357px] rounded-b-[32px]" style={{ backgroundColor: themeColor }} />

      <div className="-mt-[220px] px-4 pb-16">
        <div className="mx-auto w-full max-w-[349px] rounded-[24px] bg-white px-6 pb-12 pt-12 shadow-[0_0_32px_rgba(0,0,0,0.08)] md:px-10">
          <div className="text-center">
            <div
              className="mx-auto mb-6 h-24 w-24 overflow-hidden rounded-full border-4 bg-[#EEEEEE]"
              style={{ borderColor: themeColor }}
            >
              {profile.avatar_url ? (
                <Image
                  src={profile.avatar_url}
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

            <p className="mt-2 text-[16px] text-[#737373]">
              @{profile.username}
            </p>

            {profile.email ? (
              <p className="mt-2 text-sm text-[#737373]">{profile.email}</p>
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
                      backgroundColor: platform?.backgroundColor || themeColor,
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
    </main>
  );
}