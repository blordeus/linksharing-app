"use client";

import { useState } from "react";

type Props = {
  username: string;
  label?: string;
};

export default function CopyProfileLinkButton({
  username,
  label = "Copy Profile Link",
}: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const url = `${window.location.origin}/u/${username}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      console.error("Failed to copy link");
    }
  }

  return (
    <button
      type="button"
      disabled={!username}
      onClick={handleCopy}
      className={`rounded-lg border px-4 py-3 text-sm font-semibold transition ${
        copied
          ? "border-[#633CFF] bg-[#633CFF] text-white"
          : "border-[#633CFF] text-[#633CFF] hover:bg-[#EFEBFF]"
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {copied ? "Link Copied!" : label}
    </button>
  );
}