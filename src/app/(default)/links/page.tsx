import React from "react";
import { auth, signOut } from "@/auth";
import { getLinks } from "@/services/link";
import Link from "next/link";
import { LinkIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  return (
    <main className="flex-1 py-12">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-2">
                <LinkIcon className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">My Links</h1>
                <p className="text-gray-400">Manage your public links</p>
              </div>
            </div>
            <Link href="/links/new">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 cursor-pointer">
                <Plus className="h-4 w-4 mr-2" />
                Create New Link
              </Button>
            </Link>
          </div>

          {/* Links List */}
          {links.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {links.map((link) => (
                <LinkCard key={link.id} link={link} formatDate={formatDate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

function LinkCard({
  link,
  formatDate,
}: {
  link: { id: string; name: string; createdAt: Date };
  formatDate: (date: Date) => string;
}) {
  return (
    <Link href={`/links/${link.id}`} title={link.name}>
      <Card className="border-gray-800 bg-gray-900/50 shadow-lg backdrop-blur hover:border-gray-700 transition-colors">
        <CardHeader className="pb-2">
          <CardTitle className="text-white text-xl flex items-center">
            <span className="truncate">{link.name}</span>
          </CardTitle>
          <CardDescription className="text-gray-400">
            Created on {formatDate(link.createdAt)}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 border border-dashed border-gray-700 rounded-lg bg-gray-900/30">
      <div className="inline-flex rounded-full bg-gray-800 p-3 mb-4">
        <LinkIcon className="h-6 w-6 text-cyan-400" />
      </div>
      <h3 className="text-xl font-medium text-white mb-2">No links yet</h3>
      <p className="text-gray-400 mb-6 max-w-md mx-auto">
        Create your first link to start exposing your local services to the
        internet
      </p>
      <Button
        // onClick={() => router.push("/links/create")}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0"
      >
        <Plus className="h-4 w-4 mr-2" />
        Create Your First Link
      </Button>
    </div>
  );
}
