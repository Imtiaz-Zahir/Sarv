import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
// import DeleteAccountDialog from "@/components/delete-account-dialog";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { auth } from "@/auth";
import Image from "next/image";
import LogoutButton from "@/components/logout-button";

export default async function accountPage() {
  const session = await auth();

  if (!session?.user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const user = session?.user;

  return (
    <main className="flex-1 py-12">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              My Account
            </h1>
            <p className="text-gray-400 mt-1">View your account information</p>
          </div>

          {/* Profile Information Card */}
          <Card className="border-gray-800 bg-gray-900/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Profile Information</CardTitle>
              <CardDescription className="text-gray-400">
                Your personal account details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                {user.image && user.name ? (
                  <Image
                    src={user.image}
                    alt={user.name}
                    width={96}
                    height={96}
                    className="rounded-full border border-gray-400/50"
                    unoptimized
                  />
                ) : (
                  <div className="relative h-24 w-24 rounded-full overflow-hidden bg-gray-800 flex-shrink-0"></div>
                )}
                <div className="space-y-4 text-center sm:text-left">
                  <div>
                    <h2 className="text-xl font-bold text-white">
                      {user.name}
                    </h2>
                    <p className="text-gray-400">{user.email}</p>
                  </div>

                  {/* <div className="space-y-1">
                    <div className="text-xs text-gray-500">Member since</div>
                    <div className="text-sm text-gray-300">"2021-01-01"</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs text-gray-500">Active tunnels</div>
                    <div className="text-sm text-gray-300">5</div>
                  </div> */}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-gray-800 pt-4 flex flex-wrap gap-3 justify-between">
              <Button
                variant="outline"
                className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800"
                asChild
              >
                <Link href="/links" title="Manage Links">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Manage Links
                </Link>
              </Button>
              <LogoutButton />
            </CardFooter>
          </Card>

          {/* Delete Account Card */}
          {/* <Card className="border-gray-800 bg-red-950/30 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                Delete Account
              </CardTitle>
              <CardDescription className="text-gray-400">
                Permanently delete your account and all of your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert
                variant="destructive"
                className="bg-red-950/50 border-red-800 text-red-300"
              >
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter>
              <DeleteAccountDialog />
            </CardFooter>
          </Card> */}
        </div>
      </div>
    </main>
  );
}
