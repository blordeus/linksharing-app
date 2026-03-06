"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import CopyProfileLinkButton from "@/components/CopyProfileLinkButton";

export default function ProfilePage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (data) {
        setUsername(data.username || "");
        setFirstName(data.first_name || "");
        setLastName(data.last_name || "");
        setEmail(data.email || "");
      }

      setLoading(false);
    }

    loadProfile();
  }, [supabase]);

  async function saveProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setSaving(true);

    const normalizedUsername = username.trim().toLowerCase();

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      username: normalizedUsername,
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
    });

    if (error) {
      alert(error.message);
      setSaving(false);
      return;
    }

    setUsername(normalizedUsername);
    setSaving(false);
    alert("Profile saved");
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Profile Details</h1>
          <p className="mt-2 text-sm text-slate-600">
            Edit your details here.
          </p>
        </div>

        {username ? <CopyProfileLinkButton username={username} /> : null}
      </div>

      <div className="mt-6 max-w-md space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Username</label>
          <input
            className="w-full rounded-lg border px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="yourusername"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">First Name</label>
          <input
            className="w-full rounded-lg border px-3 py-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Bryan"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Last Name</label>
          <input
            className="w-full rounded-lg border px-3 py-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Lordeus"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Email</label>
          <input
            className="w-full rounded-lg border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            type="email"
          />
        </div>

        <button
          onClick={saveProfile}
          disabled={saving}
          className="mt-4 rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}