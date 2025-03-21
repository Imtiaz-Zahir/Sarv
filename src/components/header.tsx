"use client";

import Link from "next/link";
import Image from "next/image";
import Profile from "./profile";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-gray-950/80 backdrop-blur supports-[backdrop-filter]:bg-gray-950/60 container px-4 sm:px-6 lg:px-8 mx-auto flex h-16 items-center justify-between">
      <Link href="/" title="Sarv">
        <Image src="/logo.png" alt="Sarv" width={120} height={40} priority />
      </Link>
      <nav className="hidden md:flex gap-6">
        <Link
          href="#how-it-works"
          title="How It Works"
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          How It Works
        </Link>
        <Link
          href="#features"
          title="Features"
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          Features
        </Link>
        <Link
          href="#use-cases"
          title="Use Cases"
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          Use Cases
        </Link>
        <Link
          href="#faq"
          title="FAQ"
          className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
        >
          FAQ
        </Link>
      </nav>
      <Profile />
    </header>
  );
}
