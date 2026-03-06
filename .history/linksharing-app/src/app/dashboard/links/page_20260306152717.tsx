"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";

type Link = {
  id: string;
  platform: string;
  url: string;
  sort_order: number;
};

export default function LinksPage() {
  const supabase = createClient();

  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false)

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
  const tempId = `temp-${Date.now()}`

  setLinks((prev) => [
    ...prev,
    {
      id: tempId,
      platform: "GitHub",
      url: "",
      sort_order: prev.length,
    },
  ])
}

  function updateLink(index: number, field: keyof Link, value: string) {
    const updated = [...links];
    updated[index] = { ...updated[index], [field]: value };
    setLinks(updated);
  }

  async function saveLinks() {
    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      return;
    }

    // 1) Load current DB rows
    const { data: currentLinks, error: currentError } = await supabase
      .from("links")
      .select("id")
      .eq("user_id", user.id);

    if (currentError) {
      alert(currentError.message);
      setSaving(false);
      return;
    }

    const dbIds = (currentLinks ?? []).map((link) => link.id);

    // 2) Figure out which existing rows still remain in UI
    const keptExistingIds = links
      .filter((link) => !link.id.startsWith("temp-"))
      .map((link) => link.id);

    // 3) Delete removed rows
    const idsToDelete = dbIds.filter((id) => !keptExistingIds.includes(id));

    if (idsToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from("links")
        .delete()
        .in("id", idsToDelete);

      if (deleteError) {
        alert(deleteError.message);
        setSaving(false);
        return;
      }
    }

    // 4) Update existing rows
    const existingRows = links
      .filter((link) => !link.id.startsWith("temp-"))
      .map((link, index) => ({
        id: link.id,
        user_id: user.id,
        platform: link.platform,
        url: link.url,
        sort_order: index,
      }));

    if (existingRows.length > 0) {
      const { error: updateError } = await supabase
        .from("links")
        .upsert(existingRows);

      if (updateError) {
        alert(updateError.message);
        setSaving(false);
        return;
      }
    }

    // 5) Insert new rows WITHOUT id so DB generates uuid
    const newRows = links
      .filter((link) => link.id.startsWith("temp-"))
      .map((link, index) => ({
        user_id: user.id,
        platform: link.platform,
        url: link.url,
        sort_order: index,
      }));

    if (newRows.length > 0) {
      const { error: insertError } = await supabase
        .from("links")
        .insert(newRows);

      if (insertError) {
        alert(insertError.message);
        setSaving(false);
        return;
      }
    }

    await loadLinks();
    setSaving(false);
    alert("Links saved");
  }
}
