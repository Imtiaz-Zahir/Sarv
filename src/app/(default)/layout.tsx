import type { Metadata } from "next";
// import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/header";
import Footer from "@/components/footer";
// import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Sarv",
  description:
    "Expose your local web server to the world with a free public URL and SSL certificate. No configuration, no cost.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <body className="flex min-h-screen flex-col dark bg-gray-950 text-gray-50">
        <SessionProvider>
          <Header />
          {children}
          <Footer />
        </SessionProvider>
        {/* <Analytics mode="production" /> */}
      </body>
  );
}
