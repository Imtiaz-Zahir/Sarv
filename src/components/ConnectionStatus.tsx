"use client";
import { getConnectionStatusAction } from "@/actions/connection";
import React, { useEffect, useState } from "react";

export default function ConnectionStatus({ href }: Readonly<{ href: string }>) {
  const [status, setStatus] = useState<"inactive" | "active" | "loading">(
    "loading"
  );

  useEffect(() => {
    async function checkStatus() {
      try {
        setStatus("loading");
        const status = await getConnectionStatusAction(href);
        setStatus(status);
      } catch (error) {
        setStatus("inactive");
        console.error(error);
      }
    }

    checkStatus();

    let interval = setInterval(() => {
      checkStatus();
    }, 30000);

    window.onblur = () => clearInterval(interval);

    window.onfocus = () => {
      checkStatus();
      interval = setInterval(() => {
        checkStatus();
      }, 30000);
    };

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
