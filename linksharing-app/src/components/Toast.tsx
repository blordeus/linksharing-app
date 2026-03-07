"use client";

type Props = {
  message: string;
  type?: "success" | "error";
};

export default function Toast({ message, type = "success" }: Props) {
  if (!message) return null;

  const isError = type === "error";

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl px-6 py-4 text-sm font-semibold shadow-lg ${
        isError
          ? "bg-[#FF3939] text-white"
          : "bg-[#333333] text-white"
      }`}
    >
      {message}
    </div>
  );
}