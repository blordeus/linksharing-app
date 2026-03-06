"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  } = useSortable({ id: link.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="rounded-lg border p-4 space-y-3 bg-white"
    >
      <div className="flex items-center justify-between">
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab text-sm text-slate-500 active:cursor-grabbing"
        >
          ☰ Link #{index + 1}
        </button>

        <button
          type="button"
          onClick={() => onRemove(link.id)}
          className="text-sm text-red-600"
        >
          Remove
        </button>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Platform</label>
        <select
          value={link.platform}
          onChange={(e) => onChange(link.id, "platform", e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
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
        <label className="mb-1 block text-sm font-medium">URL</label>
        <input
          value={link.url}
          onChange={(e) => onChange(link.id, "url", e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          placeholder="https://..."
        />
      </div>
    </div>
  );
}