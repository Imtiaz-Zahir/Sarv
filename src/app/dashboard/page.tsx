// import React from "react";
import { auth, signOut } from "@/auth";
import { getLinks } from "@/services/link";
import { redirect } from "next/navigation";

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if (!rootDomain) {
  throw new Error("Root domain is not defined");
}

export default async function Page() {
  const session = await auth();
  if (!session?.user?.email) {
    return signOut({ redirectTo: "/" });
  }

  const links = await getLinks(session?.user?.email);

  redirect(
    links.length > 0
      ? "/dashboard/links/" + links[0].id
      : "/dashboard/links/new"
  );
}
