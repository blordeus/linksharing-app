import { createClient } from "@/lib/supabase/server";
import { platforms } from "@/lib/platforms"


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
      <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-lg font-semibold">Profile not found</h1>
        </div>
      </main>
    );
  }

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", profile.id)
    .order("sort_order", { ascending: true });

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-[340px] rounded-[40px] bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 h-20 w-20 rounded-full bg-slate-200" />
          <h1 className="text-lg font-semibold">
            {profile.first_name} {profile.last_name}
          </h1>
          <p className="text-sm text-slate-500">@{profile.username}</p>
        </div>

        <div className="space-y-3">
  {links && links.length > 0 ? (
    links.map((link) => {
      const platform = platforms[link.platform]
      const Icon = platform?.icon

      return (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className={`flex items-center justify-center gap-2 rounded-lg py-3 font-medium text-white ${
            platform?.color || "bg-black"
          }`}
        >
          {Icon && <Icon size={18} />}
          {link.platform}
        </a>
      )
    })
  ) : (
    <p className="text-center text-sm text-slate-400">
      No links added yet.
    </p>
  )}
</div>
      </div>
    </main>
  );
}