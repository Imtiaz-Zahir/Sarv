import React from "react";
import { notFound } from "next/navigation";
import Payment from "./payment";

export default async function ProxyDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;

  if (!id) {
    return notFound();
  }

  const res = await fetch(`https://proxymailer.online/api/proxy/${id}`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    return notFound();
  }

  const data: {
    id: string;
    serverIp: string;
    domain: string;
    port: number;
    userEmail: string;
    subscriptionEndAt: null | string;
    createdAt: string;
    updatedAt: string;
  } = await res.json();

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-6">
            Your Proxy Details
          </h1>
          <p className="text-gray-400 mb-8">
            Connection information for your active proxy
          </p>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-700 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Proxy Information
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-gray-600 pb-3">
                <span className="text-gray-300">Server IP</span>
                <span className="text-blue-400 font-medium">
                  {data.serverIp}
                </span>
              </div>

              <div className="flex justify-between items-center border-b border-gray-600 pb-3">
                <span className="text-gray-300">Mail Server Domain</span>
                <span className="text-blue-400 font-medium">{data.domain}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-300">Mail Server Port</span>
                <span className="text-blue-400 font-medium">{data.port}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
            <div>
              <p className="text-gray-300">Subscription Status</p>
              <p className="text-sm text-gray-400">
                {data.subscriptionEndAt
                  ? `Expires: ${new Date(
                      data.subscriptionEndAt
                    ).toLocaleDateString()}`
                  : "Not Subscribed"}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                data.subscriptionEndAt &&
                new Date(data.subscriptionEndAt) > new Date()
                  ? "bg-green-900 text-green-300"
                  : "bg-red-900 text-red-300"
              }`}
            >
              {data.subscriptionEndAt &&
              new Date(data.subscriptionEndAt) > new Date()
                ? "Active"
                : "Inactive"}
            </span>
          </div>

          {data.subscriptionEndAt &&
          new Date(data.subscriptionEndAt) > new Date() ? (
            ""
          ) : (
            <Payment proxyId={id} userEmail={data.userEmail} />
          )}

          <p className="text-center mt-6 text-blue-400 hover:text-blue-300 text-sm">
            Need help? Contact us at support@proxymailer.online
          </p>
        </div>
      </div>
    </div>
  );
}
