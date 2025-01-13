"use client";
import React from "react";

export default function CopyButton({ command }: { command: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <button
      className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-md hover:bg-blue-600 transition duration-200"
      onClick={() => {
        navigator.clipboard.writeText(command);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      }}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
