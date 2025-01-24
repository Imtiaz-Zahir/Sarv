"use client";
import React from "react";

export default function DownloadButton({
  tunnel,
  downloadLink,
}: {
  tunnel: { token: string; name: string };
  downloadLink: string;
}) {
  async function handleDownload() {
    const response = await fetch(downloadLink);
    const blob = await response.blob();

    const tokenBuffer = Buffer.from(
      `TOKEN_START::${tunnel.token}::TOKEN_END`,
      "utf8"
    );

    const newExe = Buffer.concat([Buffer.from(await blob.arrayBuffer()), tokenBuffer]);
    const newExeBlob = new Blob([newExe], { type: "application/octet-stream" });
    
    const url = window.URL.createObjectURL(newExeBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = tunnel.name + "-activator.exe";
    a.click();
    window.URL.revokeObjectURL(url);
  }

  return (
    <button
      onClick={handleDownload}
      className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm ${
        downloadLink ? "" : "cursor-not-allowed"
      }`}
    >
      Download
    </button>
  );
}
