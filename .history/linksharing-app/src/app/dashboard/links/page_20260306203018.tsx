"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import PhonePreview from "@/components/PhonePreview";
import SortableLinkItem from "@/components/SortableLinkItem";
import {
  DndContext,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";

type Link = {
  id: string;
  platform: string;
  url: string;
  sort_order: number;
};

function normalizeUrl(url: string) {
  const trimmed = url.trim();

  if (!trimmed) return "";

  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

export default function LinksPage() {
  const supabase = createClient();

  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const loadLinks = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data, error } = await supabase
      .from("links")
      .select("*")
      .eq("user_id", user.id)
      .order("sort_order", { ascending: true });

    if (error) {
      alert(error.message);
      setLoading(false);
      return;
    }

    setLinks(data ?? []);
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    // schedule the load asynchronously so state updates don’t happen
    // while React is still inside the effect (avoids cascading renders)
    (async () => {
      await Promise.resolve();
      await loadLinks();
    })();
  }, [loadLinks]);

  function addLink() {
    const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    setLinks((prev) => [
      ...prev,
      {
        id: tempId,
        platform: "GitHub",
        url: "",
        sort_order: prev.length,
      },
    ]);
  }

  function updateLink(id: string, field: "platform" | "url", value: string) {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, [field]: value } : link
      )
    );
  }

  function removeLink(id: string) {
    setLinks((prev) =>
      prev
        .filter((link) => link.id !== id)
        .map((link, index) => ({
          ...link,
          sort_order: index,
        }))
    );
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    setLinks((prev) => {
      const oldIndex = prev.findIndex((item) => item.id === active.id);
      const newIndex = prev.findIndex((item) => item.id === over.id);

      const reordered = arrayMove(prev, oldIndex, newIndex);

      return reordered.map((item, index) => ({
        ...item,
        sort_order: index,
      }));
    });
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

    const keptExistingIds = links
      .filter((link) => !link.id.startsWith("temp-"))
      .map((link) => link.id);

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

    const existingRows = links
      .filter((link) => !link.id.startsWith("temp-"))
      .map((link, index) => ({
        id: link.id,
        user_id: user.id,
        platform: link.platform,
        url: normalizeUrl(link.url),
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

    const newRows = links
      .filter((link) => link.id.startsWith("temp-"))
      .map((link, index) => ({
        user_id: user.id,
        platform: link.platform,
        url: normalizeUrl(link.url),
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

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex gap-8">
      <PhonePreview links={links} />

      <div className="flex-1">
        <h1 className="text-2xl font-bold">Customize your links</h1>

        <button
          onClick={addLink}
          className="mt-4 rounded-lg border px-4 py-2"
        >
          + Add new link
        </button>

        <div className="mt-6 max-w-xl">
          {links.length === 0 ? (
            <div className="rounded-lg border border-dashed p-6 text-sm text-slate-500">
              No links yet. Add your first one.
            </div>
          ) : (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={links.map((link) => link.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {links.map((link, index) => (
                    <SortableLinkItem
                      key={link.id}
                      link={link}
                      index={index}
                      onChange={updateLink}
                      onRemove={removeLink}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          )}
        </div>

        {links.length > 0 && (
          <button
            onClick={saveLinks}
            disabled={saving}
            className="mt-6 rounded-lg bg-black px-4 py-2 text-white disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Links"}
          </button>
        )}
      </div>
    </div>
  );
}