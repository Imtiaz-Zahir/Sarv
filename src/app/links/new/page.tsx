"use client";

import { useState } from "react";
import { createLinkAction } from "@/actions/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, ExternalLink, LinkIcon } from "lucide-react";
import PaymentComponent from "@/components/PaymentComponent";

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if (!rootDomain)
  throw new Error("Missing NEXT_PUBLIC_ROOT_DOMAIN environment variable");

export default function CreateLinkPage() {
  const [name, setName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [link, setLink] = useState<{
    id: string;
    name: string;
    tunnelId: string;
    tunnelToken: string;
    userEmail: string;
  } | null>(null);

  async function handleAddLink(e: React.FormEvent) {
    try {
      e.preventDefault();
      if (loading) return;

      setError("");
      setLoading(true);

      if (!name) {
        setError("Please enter a name for the link");
        setLoading(false);
        return;
      }

      const response = await createLinkAction(name);

      if (!response.success) {
        setError(response.message || "Failed to create link");
        setLoading(false);
        return;
      }

      if (response.link) {
        setLink(response.link);
        setLoading(false);
        setName("");
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    }
  }

  if (link) {
    return <PaymentComponent
      linkId={link.id}
      linkName={link.name}
      userEmail={link.userEmail}
    />;
  }

  return (
    <main className="flex-1 py-12">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-2 mb-4">
              <LinkIcon className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Create a New Link
            </h1>
            <p className="text-gray-400 mt-2">
              Create a custom link to expose your local server to the internet
            </p>
          </div>

          <Card className="border-gray-800 bg-gray-900/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Link Details</CardTitle>
              <CardDescription className="text-gray-400">
                Choose a name for your link. This will be part of your public
                URL.
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleAddLink}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-white"
                  >
                    Link Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => {
                      if (
                        e.target.value !== "" &&
                        !/^[a-zA-Z0-9-]+$/.test(e.target.value)
                      )
                        return;

                      setName(e.target.value);
                    }}
                    placeholder="my-awesome-link"
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-cyan-500"
                    required
                  />
                  <p className="text-xs text-gray-500">
                    Only letters, numbers, and hyphens are allowed
                  </p>
                </div>

                <div className="rounded-lg border border-gray-800 bg-gray-950/50 p-4 space-y-2">
                  <div className="flex items-center">
                    <ExternalLink className="h-4 w-4 text-cyan-400 mr-2" />
                    <span className="text-sm font-medium text-white">
                      Your public URL will be:
                    </span>
                  </div>
                  <div className="px-3 py-2 bg-gray-800 rounded-md font-mono text-sm text-cyan-300 break-all">
                    {`<connection-name>-${name || "<link-name>"}.${rootDomain}`}
                  </div>
                  <p className="text-xs text-gray-400">
                    Your connection name will be automatically added to the
                    beginning of your link
                  </p>
                </div>

                {error && (
                  <div className="flex items-start text-red-500 text-sm mt-1 bg-red-950/30 border border-red-800 rounded-lg p-3">
                    <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 mt-2 cursor-pointer"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white mr-2"></div>
                      Creating...
                    </>
                  ) : (
                    "Create Link"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div className="mt-8 bg-gray-900/50 border border-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-medium text-white mb-2">
              What are links?
            </h3>
            <p className="text-gray-400 text-sm">
              Links allow you to expose your local web servers to the internet
              with a custom URL. Each link creates a secure tunnel from your
              local machine to our servers, making your local development
              accessible worldwide.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
