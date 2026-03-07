"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

type LinkItem = {
  id: string;
  platform: string;
  url: string;
  sort_order: number;
};

type Props = {
  link: LinkItem;
  index: number;
  onChange: (id: string, field: "platform" | "url", value: string) => void;
  onRemove: (id: string) => void;
};

const platformOptions = [
  "GitHub",
  "Frontend Mentor",
  "Twitter",
  "LinkedIn",
  "YouTube",
  "Facebook",
  "Twitch",
  "Dev.to",
  "Codewars",
  "CodePen",
  "freeCodeCamp",
  "GitLab",
  "Hashnode",
  "Stack Overflow",
];

function getPlaceholder(platform: string) {
  switch (platform) {
    case "GitHub":
      return "https://github.com/username";
    case "LinkedIn":
      return "https://www.linkedin.com/in/username";
    case "YouTube":
      return "https://www.youtube.com/@username";
    case "Frontend Mentor":
      return "https://www.frontendmentor.io/profile/username";
    default:
      return "https://example.com/username";
  }
}

export default function SortableLinkItem({
  link,
  index,
  onChange,
  onRemove,
}: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-xl bg-[#FAFAFA] p-5 md:p-6 ${
        isDragging ? "opacity-70 shadow-lg" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="flex cursor-grab items-center gap-2 text-sm font-semibold text-[#737373] active:cursor-grabbing"
          aria-label={`Drag link ${index + 1}`}
        >
          <Image
            src="/assets/images/icon-drag-and-drop.svg"
            alt=""
            width={12}
            height={6}
          />
          <span>Link #{index + 1}</span>
        </button>

        <button
          type="button"
          onClick={() => onRemove(link.id)}
          className="text-sm font-medium text-[#737373] transition hover:text-[#333333]"
        >
          Remove
        </button>
      </div>

      <div className="mt-4">
        <label
          htmlFor={`platform-${link.id}`}
          className="mb-1.5 block text-xs font-medium text-[#333333]"
        >
          Platform
        </label>

        <select
          id={`platform-${link.id}`}
          value={link.platform}
          onChange={(e) => onChange(link.id, "platform", e.target.value)}
          className="h-12 w-full rounded-lg border border-[#D9D9D9] bg-white px-4 text-sm text-[#333333] outline-none transition focus:border-[#633CFF] focus:ring-2 focus:ring-[#EFEBFF]"
        >
          {platformOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3">
        <label
          htmlFor={`url-${link.id}`}
          className="mb-1.5 block text-xs font-medium text-[#333333]"
        >
          Link
        </label>

        <input
          id={`url-${link.id}`}
          value={link.url}
          onChange={(e) => onChange(link.id, "url", e.target.value)}
          className="h-12 w-full rounded-lg border border-[#D9D9D9] bg-white px-4 text-sm text-[#333333] outline-none transition placeholder:text-[#737373] focus:border-[#633CFF] focus:ring-2 focus:ring-[#EFEBFF]"
          placeholder={getPlaceholder(link.platform)}
        />
      </div>
    </div>
  );
}