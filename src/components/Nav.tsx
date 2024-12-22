"use client";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Auth from "./Auth";
import { context } from "@/app/Context";

export default function Nav() {
  const appContext = useContext(context);

  // const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (window.scrollY > 0) setScrolled(true);
    window.addEventListener("scroll", () => setScrolled(window.scrollY > 0));
  }, []);

  // useEffect(() => {
  //   if (open) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, [open]);

  return (
    <nav
      className={`px-4 lg:px-28 lg:py-4 py-2 flex items-center justify-between sticky top-0 bg-white z-50 border-b ${
        scrolled && "shadow-lg"
      }`}
    >
      <Link href="/">
        <Image
          src="/logo.png"
          alt="logo"
          width={208}
          height={45}
          className="w-36 lg:w-52"
        />
      </Link>
      {/* {open ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 20 20"
          className="w-8 h-8 cursor-pointer lg:hidden"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setOpen(false)}
        >
          <path
            d="M6 18L18 6M6 6L18 18"
            stroke="#2B2A2A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className="w-8 h-8 cursor-pointer lg:hidden"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => setOpen(true)}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 5C3 4.44772 3.44772 4 4 4H16C16.5523 4 17 4.44772 17 5C17 5.55228 16.5523 6 16 6H4C3.44772 6 3 5.55228 3 5Z"
            fill="#2B2A2A"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 10C3 9.44772 3.44772 9 4 9H16C16.5523 9 17 9.44772 17 10C17 10.5523 16.5523 11 16 11H4C3.44772 11 3 10.5523 3 10Z"
            fill="#2B2A2A"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M3 15C3 14.4477 3.44772 14 4 14H16C16.5523 14 17 14.4477 17 15C17 15.5523 16.5523 16 16 16H4C3.44772 16 3 15.5523 3 15Z"
            fill="#2B2A2A"
          />
        </svg>
      )} */}

      <div className="flex items-center gap-5 text-lg font-medium">
        {appContext?.user && (
          <ul>
            <Link href="/dashboard"> 
              <li>Dashboard</li>
            </Link>
          </ul>
        )}
        <Auth />
      </div>
    </nav>
  );
}
