"use client";

import { useState } from "react";

export function CopyText({ text, label }: { text: string; label: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
    window.setTimeout(() => setStatus("idle"), 2400);
  }

  const buttonLabel =
    status === "copied" ? "Copied" : status === "error" ? "Select the bio instead" : label;

  return (
    <div>
      <button type="button" className="button mt-6" onClick={onCopy}>
        {buttonLabel}
      </button>
      <p className="sr-only" role="status">
        {status === "copied" ? "Copied to clipboard." : ""}
        {status === "error" ? "Could not copy automatically." : ""}
      </p>
    </div>
  );
}
