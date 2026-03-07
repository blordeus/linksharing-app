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
      console.error("Clipboard copy failed");
    }
  }

  return (
    <button
      type="button"
      disabled={!username}
      onClick={handleCopy}
      className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed
disabled:border-slate-300
disabled:text-slate-400
      ${
        copied
          ? "bg-[#633CFF] text-white border-[#633CFF]"
          : "border-[#633CFF] text-[#633CFF] hover:bg-[#EFEBFF]"
      }
      disabled:opacity-50`}
    >
      {copied ? "Link Copied!" : "Copy Profile Link"}
    </button>
  );
}