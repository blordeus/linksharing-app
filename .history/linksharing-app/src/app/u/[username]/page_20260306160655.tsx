import { createClient } from "@/lib/supabase/server"

export default async function PublicProfilePage({
  params,
}: {
  params: { username: string }
}) {

  const supabase = await createClient()

  // Load profile
  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("*")
    .ilike("username", `%${params.username}%`)
    .single()

  if (profileError || !profile) {
    return (
      <div style={{ padding: 40 }}>
        <h1>Profile not found</h1>
      </div>
    )
  }

  // Load links
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
            <a href={link.url} target="_blank">
              {link.platform}
            </a>
          </div>
        ))}
      </div>
    </main>
  )
}