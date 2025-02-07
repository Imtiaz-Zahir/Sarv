import { getLinkById } from "@/services/link";
import React from "react";
import AddConnection from "@/components/AddConnection";
import EditConnection from "@/components/EditConnection";
import DeleteConnection from "@/components/DeleteConnection";
import Link from "next/link";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";
import Activation from "@/components/Activation";
import ConnectionStatus from "@/components/ConnectionStatus";

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if (!rootDomain) {
  throw new Error("Root domain is not defined");
}

export default async function page({
  params,
}: {
  params: Promise<{ linkId: string }>;
}) {
  const session = await auth();

  if (!session?.user?.email) {
    return signOut({ redirectTo: "/" });
  }

  const { linkId } = await params;

  const link = await getLinkById(linkId);
  if (!link) return <div>Not Found</div>;

  if (link.userEmail !== session.user.email) {
    return <div>Unauthorized</div>;
  }

  return (
    <section className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-28 lg:py-4 py-2 flex flex-col lg:flex-row justify-center gap-5 w-full">
      <div className="flex-1 w-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Connection List of {link.name}
          </h2>
          <AddConnection link={{ id: link.id, name: link.name }} />
        </div>
        <div className="w-full overflow-x-auto rounded-lg shadow">
          <table className="w-full table-auto border-collapse border border-gray-300 text-center">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Protocol</th>
                <th className="py-2 px-4">IP</th>
                <th className="py-2 px-4">Port</th>
                <th className="py-2 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {link.connections.map((connection, index) => {
                const domain = `https://${connection.name}-${link.name}.${rootDomain}`;
                return (
                  <tr key={index} className="hover:bg-gray-50 border-b">
                    <td className="flex justify-center items-center">
                      <ConnectionStatus href={domain} />
                    </td>
                    <td className="py-2 px-4 text-blue-500">
                      <Link href={domain} target="_blank">
                        {connection.name}
                      </Link>
                    </td>
                    <td className="py-2 px-4">{connection.serviceProtocol}</td>
                    <td className="py-2 px-4">{connection.serviceIp}</td>
                    <td className="py-2 px-4">{connection.servicePort}</td>
                    <td className="py-2 px-4 flex gap-3 justify-center items-center">
                      <EditConnection
                        connection={connection}
                        linkName={link.name}
                      />
                      <DeleteConnection connectionId={connection.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Activation
        tunnel={{
          token: link.tunnelToken,
          name: link.name,
        }}
      />
    </section>
  );
}
