"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { useActiveLink } from "@/app/Context";

export default function Nav() {
  const { data: session } = useSession();
  const [scrolled, setScrolled] = useState(false);
  const { activeLink } = useActiveLink();

  useEffect(() => {
    if (window.scrollY > 0) setScrolled(true);
    window.addEventListener("scroll", () => setScrolled(window.scrollY > 0));
  }, []);

  return (
    <nav
      className={`px-4 lg:px-28 py-2 flex items-center justify-between sticky top-0 bg-white z-50 border-b ${
        scrolled && "shadow-lg"
      }`}
    >
      <div className="flex items-center gap-2">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={160}
            height={44}
            quality={100}
            priority={true}
            className="w-40"
          />
        </Link>
        {activeLink && (
          <div className="hidden sm:flex items-center gap-2">
            <svg strokeLinejoin="round" viewBox="0 0 16 16" className="h-9 w-9">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.01526 15.3939L4.3107 14.7046L10.3107 0.704556L10.6061 0.0151978L11.9849 0.606077L11.6894 1.29544L5.68942 15.2954L5.39398 15.9848L4.01526 15.3939Z"
                fill="currentColor"
              ></path>
            </svg>
            <h2 className="text-2xl font-medium">{activeLink}</h2>
          </div>
        )}
      </div>

      <div className="flex items-center gap-5 text-lg font-medium">
        <div>
          {session ? (
            <div className="group relative">
              <button
                type="button"
                onClick={() => signOut({ redirectTo: "/" })}
                className="bg-blue-700 text-white py-2 px-5 rounded flex items-center gap-2 font-medium"
              >
                <Image
                  src={session.user?.image ?? "/user.png"}
                  className="hover:group-hover relative overflow-hidden"
                  style={{ borderRadius: "100%" }}
                  height={28}
                  width={28}
                  priority={true}
                  alt={session.user?.name ?? "User"}
                  unoptimized={true}
                />
                Logout
              </button>
              <span className="text-center text-xs absolute z-10 bg-blue-300 px-2 py-1 rounded mt-1 right-0 group-hover:visible invisible">
                {session.user?.name ?? "User"}
                <br />
                {session.user?.email ?? "no email found"}
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => signIn("google", { redirectTo: "/links" })}
              className="bg-blue-700 text-white py-2 px-5 rounded flex items-center gap-2 font-medium"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="#EA4335 "
                  d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z"
                />
                <path
                  fill="#34A853"
                  d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z"
                />
                <path
                  fill="#4A90E2"
                  d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z"
                />
              </svg>
              Sign in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
