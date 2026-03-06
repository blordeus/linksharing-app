"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import CopyProfileLinkButton from "@/components/CopyProfileLinkButton";

export default function ProfilePage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

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
  }, []);

  async function saveProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      username,
      first_name: firstName,
      last_name: lastName,
      email,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Profile saved");
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <div>
    <h1 className="text-2xl font-bold">Profile Details</h1>
    <p className="mt-2 text-sm text-slate-600">
      Edit your details here.
    </p>
  </div>

  


      <div className="mt-6 space-y-4 max-w-md">

        <div>
          <label className="text-sm font-medium">Username</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">First Name</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Last Name</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button
          onClick={saveProfile}
          className="mt-4 bg-black text-white px-4 py-2 rounded-lg"
        >
          Save Profile
        </button>

        <div className="mb-4 flex items-center justify-between">

</div>

      </div>
    </div>
  );
}