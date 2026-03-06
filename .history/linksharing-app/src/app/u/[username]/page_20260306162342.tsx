import { createClient } from "@/lib/supabase/server"

export default async function PublicProfilePage({
  params,
}: {
  params: Promise<{ username: string }>
}) {
  const { username } = await params
  const supabase = await createClient()

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", username.trim())
    .single()

  if (profileError || !profile) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Profile not found</h1>
      </div>
    )
  }

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("user_id", profile.id)
    .order("sort_order")

  return (
  <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
    <div className="w-[340px] rounded-[40px] bg-white p-8 shadow-lg">

      <div className="text-center mb-6">
        <div className="h-20 w-20 rounded-full bg-slate-200 mx-auto mb-3" />
        <h1 className="text-lg font-semibold">
          {profile.first_name} {profile.last_name}
        </h1>
        <p className="text-sm text-slate-500">@{profile.username}</p>
      </div>

      <div className="space-y-3">
        {links?.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="block rounded-lg bg-black text-white text-center py-3 font-medium hover:opacity-90"
          >
            {link.platform}
          </a>
        ))}
      </div>

    </div>
  </main>
)
}