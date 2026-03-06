"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";

type Link = {
  id?: string;
  platform: string;
  url: string;
  sort_order: number;
};

export default function LinksPage() {
  const supabase = createClient();

  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLinks();
  }, []);

  async function loadLinks() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { data } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", user.id)
      .order("sort_order");

    if (data) {
      setLinks(data);
    }

    setLoading(false);
  }

  function addLink() {
    setLinks([
      ...links,
      {
        platform: "GitHub",
        url: "",
        sort_order: links.length,
      },
    ]);
  }

  function updateLink(index: number, field: keyof Link, value: string) {
    const updated = [...links];
    updated[index] = { ...updated[index], [field]: value };
    setLinks(updated);
  }

  async function saveLinks() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const payload = links.map((link, index) => ({
      ...link,
      user_id: user.id,
      sort_order: index,
    }));

    const { error } = await supabase.from("links").upsert(payload);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Links saved");
    loadLinks();
  }

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Customize your links</h1>

      <button
        onClick={addLink}
        className="mt-4 rounded-lg border px-4 py-2"
      >
        + Add new link
      </button>

      <div className="mt-6 space-y-4 max-w-xl">

        {links.map((link, index) => (
          <div
            key={index}
            className="rounded-lg border p-4 space-y-2"
          >
            <div>
              <label className="text-sm font-medium">Platform</label>
              <select
                value={link.platform}
                onChange={(e) =>
                  updateLink(index, "platform", e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2"
              >
                <option>GitHub</option>
                <option>Frontend Mentor</option>
                <option>Twitter</option>
                <option>LinkedIn</option>
                <option>YouTube</option>
                <option>Facebook</option>
                <option>Twitch</option>
                <option>Dev.to</option>
                <option>Codewars</option>
                <option>CodePen</option>
                <option>freeCodeCamp</option>
                <option>GitLab</option>
                <option>Hashnode</option>
                <option>Stack Overflow</option>
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">URL</label>
              <input
                value={link.url}
                onChange={(e) =>
                  updateLink(index, "url", e.target.value)
                }
                className="w-full border rounded-lg px-3 py-2"
                placeholder="https://..."
              />
            </div>
          </div>
        ))}

      </div>

      {links.length > 0 && (
        <button
          onClick={saveLinks}
          className="mt-6 bg-black text-white px-4 py-2 rounded-lg"
        >
          Save Links
        </button>
      )}
    </div>
  );
}