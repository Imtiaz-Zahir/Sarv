import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sarv - Connect your applications to the internet",
  description:
    "Sarv is a simple, fast, and secure way to connect your applications to the internet.",
  openGraph: {
    title: "Sarv - Connect your applications to the internet",
    description:
      "Sarv is a simple, fast, and secure way to connect your applications to the internet.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <body
          className={`${poppins.className} antialiased max-w-[1920px] mx-auto`}
        >
          <Nav />
          {children}
        </body>
      </SessionProvider>
      <Analytics />
    </html>
  );
}
