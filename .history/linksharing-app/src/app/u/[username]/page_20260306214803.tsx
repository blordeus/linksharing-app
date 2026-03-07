"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/browser";
import CopyProfileLinkButton from "@/components/CopyProfileLinkButton";

export default function ProfilePage() {
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState("");

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
        setAvatarUrl(data.avatar_url || "");
      }

      setLoading(false);
    }

    loadProfile();
  }, [supabase]);

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage("");

    const validTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
    const maxSize = 2 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
      setErrorMessage("Please upload a PNG, JPG, or WEBP image.");
      return;
    }

    if (file.size > maxSize) {
      setErrorMessage("Image must be 2MB or smaller.");
      return;
    }

    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  }

  async function uploadAvatar(userId: string) {
    if (!avatarFile) return avatarUrl;

    const fileExt = avatarFile.name.split(".").pop()?.toLowerCase() || "png";
    const filePath = `${userId}/avatar-${Date.now()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, avatarFile, {
        cacheControl: "3600",
        upsert: true,
      });

    if (uploadError) {
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    return data.publicUrl;
  }

  async function saveProfile() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    setSaving(true);
    setSavedMessage("");
    setErrorMessage("");

    try {
      const normalizedUsername = username.trim().toLowerCase();
      const uploadedAvatarUrl = await uploadAvatar(user.id);

      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        username: normalizedUsername,
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        avatar_url: uploadedAvatarUrl,
      });

      if (error) {
        throw new Error(error.message);
      }

      setUsername(normalizedUsername);
      setAvatarUrl(uploadedAvatarUrl || "");
      setAvatarFile(null);
      setSavedMessage("Your changes have been successfully saved!");

      setTimeout(() => {
        setSavedMessage("");
      }, 2500);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Something went wrong.";
      setErrorMessage(message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-[500px] items-center justify-center">
        <p className="text-sm font-medium text-[#737373]">Loading profile...</p>
      </div>
    );
  }

  const currentAvatar = avatarPreview || avatarUrl;

  return (
    <section className="rounded-xl bg-white">
      <div className="p-6 md:p-10">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-[24px] font-bold leading-none text-[#333333] md:text-[32px]">
              Profile Details
            </h1>
            <p className="mt-2 text-[16px] leading-[24px] text-[#737373]">
              Add your details to create a personal touch to your profile.
            </p>
          </div>

          {username ? <CopyProfileLinkButton username={username} /> : null}
        </div>

        <div className="mt-10 space-y-6">
          <div className="rounded-xl bg-[#FAFAFA] p-5 md:p-6">
            <div className="flex flex-col gap-4 md:grid md:grid-cols-[180px_1fr_180px] md:items-center">
              <p className="text-sm text-[#737373]">Profile picture</p>

              <div className="flex items-center justify-center">
                <label className="group flex h-[193px] w-[193px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl bg-[#EFEBFF] text-center transition hover:bg-[#e4dcff]">
                  {currentAvatar ? (
                    <Image
                      src={currentAvatar}
                      alt="Profile preview"
                      width={193}
                      height={193}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center px-4">
                      <div className="mb-4 h-12 w-12 rounded-full bg-[#633CFF]" />
                      <span className="text-sm font-semibold text-[#633CFF]">
                        + Upload Image
                      </span>
                    </div>
                  )}

                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg,image/webp"
                    onChange={handleAvatarChange}
                    className="hidden"
                  />
                </label>
              </div>

              <p className="text-sm leading-5 text-[#737373]">
                Image should be under 2MB.
                <br />
                Use PNG, JPG, or WEBP format.
              </p>
            </div>
          </div>

          <div className="rounded-xl bg-[#FAFAFA] p-5 md:p-6">
            <div className="space-y-6">
              <div className="grid gap-2 md:grid-cols-[160px_1fr] md:items-center">
                <label htmlFor="username" className="text-sm text-[#737373]">
                  Username*
                </label>
                <input
                  id="username"
                  className="h-12 w-full rounded-lg border border-[#D9D9D9] bg-white px-4 text-sm text-[#333333] outline-none transition placeholder:text-[#737373] focus:border-[#633CFF] focus:ring-2 focus:ring-[#EFEBFF]"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="yourusername"
                />
              </div>

              <div className="grid gap-2 md:grid-cols-[160px_1fr] md:items-center">
                <label htmlFor="firstName" className="text-sm text-[#737373]">
                  First name*
                </label>
                <input
                  id="firstName"
                  className="h-12 w-full rounded-lg border border-[#D9D9D9] bg-white px-4 text-sm text-[#333333] outline-none transition placeholder:text-[#737373] focus:border-[#633CFF] focus:ring-2 focus:ring-[#EFEBFF]"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Bryan"
                />
              </div>

              <div className="grid gap-2 md:grid-cols-[160px_1fr] md:items-center">
                <label htmlFor="lastName" className="text-sm text-[#737373]">
                  Last name*
                </label>
                <input
                  id="lastName"
                  className="h-12 w-full rounded-lg border border-[#D9D9D9] bg-white px-4 text-sm text-[#333333] outline-none transition placeholder:text-[#737373] focus:border-[#633CFF] focus:ring-2 focus:ring-[#EFEBFF]"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Lordeus"
                />
              </div>

              <div className="grid gap-2 md:grid-cols-[160px_1fr] md:items-center">
                <label htmlFor="email" className="text-sm text-[#737373]">
                  Email
                </label>
                <input
                  id="email"
                  className="h-12 w-full rounded-lg border border-[#D9D9D9] bg-white px-4 text-sm text-[#333333] outline-none transition placeholder:text-[#737373] focus:border-[#633CFF] focus:ring-2 focus:ring-[#EFEBFF]"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#D9D9D9] p-4 md:flex md:items-center md:justify-between md:px-10 md:py-6">
        <div className="mb-4 space-y-1 md:mb-0">
          {savedMessage ? (
            <p className="text-sm text-[#633CFF]">{savedMessage}</p>
          ) : null}
          {errorMessage ? (
            <p className="text-sm text-[#FF3939]">{errorMessage}</p>
          ) : null}
        </div>

        <button
          onClick={saveProfile}
          disabled={saving}
          className="w-full rounded-lg bg-[#633CFF] px-6 py-3 text-[16px] font-semibold text-white transition hover:bg-[#7B5CFF] disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
        >
          {saving ? "Saving..." : "Save"}
        </button>
      </div>
    </section>
  );
}