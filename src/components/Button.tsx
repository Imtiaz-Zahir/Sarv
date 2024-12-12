import React from "react";

export default function Button({
  children,
  className,
  gradientBorder = false,
  paddingY = 16,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
  gradientBorder?: boolean;
  paddingY?: number;
}>) {
  return (
    <button
      className={
        `${
          gradientBorder
            ? "gradient-border text-black-800"
            : "bg-gradient-blue-pink text-white"
        } rounded-full font-nunito ` + className
      }
      style={{ paddingTop: paddingY + "px", paddingBottom: paddingY + "px" }}
    >
      {children}
    </button>
  );
}
