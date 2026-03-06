import { createClient } from "@/lib/supabase/server";

export default async function PublicProfilePage({
  params,
}: {
  params: { username: string };
}) {
  const supabase = await createClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", params.username)
    .single();

  if (!profile) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p className="text-lg">Profile not found</p>
      </main>
    );
  }

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", profile.id)
    .order("sort_order");

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">

        <div className="text-center mb-6">
          <div className="h-20 w-20 rounded-full bg-slate-200 mx-auto mb-3" />
          <h1 className="text-xl font-semibold">
            {profile.first_name} {profile.last_name}
          </h1>
          <p className="text-sm text-slate-500">
            @{profile.username}
          </p>
        </div>

        <div className="space-y-3">
          {links?.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-lg bg-black text-white text-center py-2"
            >
              {link.platform}
            </a>
          ))}
        </div>

      </div>
    </main>
  );
}