import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout Recovery",
  description:
    "Recover your previous checkout session and complete your purchase seamlessly.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <body className="antialiased">{children}</body>;
}
