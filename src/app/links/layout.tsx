import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return <section className="px-4 lg:px-28 lg:py-4 py-2">{children}</section>;
}
