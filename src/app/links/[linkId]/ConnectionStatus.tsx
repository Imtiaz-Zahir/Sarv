"use client";
import React, { useEffect, useState } from "react";

export default function ConnectionStatus({ href }: { href: string }) {
  const [status, setStatus] = useState<"inactive" | "active" | "loading">(
    "loading"
  );

  useEffect(() => {
    const cloudflareTunnelErrorStatusCodes = [
      502, // Bad Gateway
      520, // Web Server Returned an Unknown Error
      521, // Web Server Is Down
      522, // Connection Timed Out
      523, // Origin Is Unreachable
      524, // A Timeout Occurred
      525, // SSL Handshake Failed
      526, // Invalid SSL Certificate
      527, // Railgun Listener to Origin Error
      530, // Origin DNS Error
    ];

    async function checkStatus() {
      try {
        setStatus("loading");
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(href, { signal: controller.signal });
        clearTimeout(timeoutId);

        if (!cloudflareTunnelErrorStatusCodes.includes(response.status)) {
          setStatus("active");
        } else {
          setStatus("inactive");
        }
      } catch (error) {
        setStatus("inactive");
        console.error(error);
      }
    }

    checkStatus();

    const interval = setInterval(() => {
      checkStatus();
    }, 10000);

    return () => clearInterval(interval);
  }, [href]);

  return (
    <p
      className={`w-4 h-4 rounded-full hover:h-6 hover:w-16 group transition-all duration-300 flex items-center justify-center overflow-hidden ${
        status === "loading"
          ? "bg-slate-500 animate-pulse"
          : status === "active"
          ? "bg-green-500"
          : "bg-red-500"
      }`}
    >
      <span className="hidden group-hover:block text-xs text-white transition-all cursor-default">
        {status}
      </span>
    </p>
  );
}
