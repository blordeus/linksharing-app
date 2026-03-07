"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import PhonePreview from "@/components/PhonePreview";
import SortableLinkItem from "@/components/SortableLinkItem";
import Image from "next/image";
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
import Toast from "@/components/Toast";

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
  const [savedMessage, setSavedMessage] = useState("");
  const [username, setUsername] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [toastMessage, setToastMessage] = useState("");
const [toastType, setToastType] = useState<"success" | "error">("success");

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
  );

  const loadLinks = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setLoading(false);
      return;
    }

    const { data: profile } = await supabase
    .from("profiles")
    .select("username, avatar_url")
    .eq("id", user.id)
    .single();

  if (profile) {
    setUsername(profile.username || "");
    setAvatarUrl(profile.avatar_url || "");
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
      prev.map((link) => (link.id === id ? { ...link, [field]: value } : link)),
    );
  }

  function removeLink(id: string) {
    setLinks((prev) =>
      prev
        .filter((link) => link.id !== id)
        .map((link, index) => ({
          ...link,
          sort_order: index,
        })),
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
    setSavedMessage("");

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
    setSavedMessage("Your changes have been successfully saved!");

    setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  }

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <p className="text-sm font-medium text-[#737373]">Loading links...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      <PhonePreview username={username} avatarUrl={avatarUrl} links={links} />

      <section className="flex-1 rounded-xl bg-white">
        <div className="p-6 md:p-10">
          <h1 className="text-[24px] font-bold leading-none text-[#333333] md:text-[32px]">
            Customize your links
          </h1>

          <p className="mt-2 text-[16px] leading-[24px] text-[#737373]">
            Add, edit, remove, and reorder your links below.
          </p>

          <button
            onClick={addLink}
            className="mt-10 w-full rounded-lg border border-[#633CFF] px-4 py-3 text-[16px] font-semibold text-[#633CFF] transition hover:bg-[#EFEBFF]"
          >
            + Add new link
          </button>

          <div className="mt-6">
            {links.length === 0 ? (
              <div className="rounded-xl bg-[#FAFAFA] px-5 py-12 text-center md:px-10 md:py-16">
                <div className="mx-auto max-w-[250px]">
                  <Image
                    src="/assets/images/illustration-empty.svg"
                    alt="No links yet"
                    width={250}
                    height={160}
                    className="mx-auto h-auto w-full"
                  />
                </div>

                <h2 className="mt-10 text-[24px] font-bold text-[#333333]">
                  Let’s get you started
                </h2>

                <p className="mx-auto mt-6 max-w-[488px] text-[16px] leading-[24px] text-[#737373]">
                  Use the “Add new link” button to get started. Once you have
                  more than one link, you can reorder and edit them. We’re here
                  to help you share your profiles with everyone.
                </p>
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
                  <div className="space-y-6">
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
        </div>

        <div className="border-t border-[#D9D9D9] p-4 md:flex md:items-center md:justify-between md:px-10 md:py-6">
          <div className="mb-4 text-sm text-[#633CFF] md:mb-0">
            {savedMessage}
          </div>

          <button
            onClick={saveLinks}
            disabled={saving || links.length === 0}
            className="w-full rounded-lg bg-[#633CFF] px-6 py-3 text-[16px] font-semibold text-white transition hover:bg-[#7B5CFF] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </section>
    </div>
  );
}
