"use client";

import { useState } from "react";

type Props = {
  username: string;
};

export default function CopyProfileLinkButton({ username }: Props) {
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
      alert("Failed to copy link");
    }
  }

  return (
    <button
      type="button"
      disabled={!username}
      onClick={handleCopy}
      className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-slate-50"
    >
      {copied ? "Copied!" : "Copy Profile Link"}
    </button>
  );
}