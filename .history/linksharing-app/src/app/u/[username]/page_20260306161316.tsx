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
    <main style={{ padding: 40 }}>
      <h1>
        {profile.first_name} {profile.last_name}
      </h1>

      <p>@{profile.username}</p>

      <div style={{ marginTop: 20 }}>
        {links?.map((link) => (
          <div key={link.id}>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.platform}
            </a>
          </div>
        ))}
      </div>
    </main>
  )
}