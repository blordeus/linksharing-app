"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

const [loading, setLoading] = useState(false);

async function handleLogout() {
  setLoading(true);
  await supabase.auth.signOut();
  router.push("/login");
  router.refresh();
}

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
  onClick={handleLogout}
  disabled={loading}
  className="rounded-lg border border-[#D9D9D9] px-4 py-3 text-sm font-semibold text-[#737373] transition hover:bg-[#F5F5F5] disabled:opacity-50"
>
  {loading ? "Logging out..." : "Logout"}
</button>
  );
}