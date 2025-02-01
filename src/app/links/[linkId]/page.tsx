import { getLinkById } from "@/services/link";
import React from "react";
import AddConnection from "./AddConnection";
import EditConnection from "./EditConnection";
import DeleteConnection from "./DeleteConnection";
import Link from "next/link";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";
import Activation from "./Activation";
// import ConnectionStatus from "./ConnectionStatus";

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
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-medium">
          Connection List of <span className="font-bold">{link.name}</span>
        </h1>

        {/* <div className="font-medium rounded border border-black flex items-center justify-between gap-1 relative min-w-48">
          <div className="flex items-center gap-2 w-full justify-center">
            <p className="py-3 px-2">{link.name}</p>
          </div>
        </div> */}
      </div>
      <div className="flex flex-col lg:flex-row justify-center gap-5 w-full mt-5">
        <div className="flex-1 w-full">
          <AddConnection link={{ id: link.id, name: link.name }} />
          <div className="w-full overflow-x-auto rounded-lg shadow">
      <table className="w-full table-auto border-collapse min-w-[640px]">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-3 px-4 text-left font-semibold">Name</th>
            <th className="py-3 px-4 text-left font-semibold">Protocol</th>
            <th className="py-3 px-4 text-left font-semibold">IP</th>
            <th className="py-3 px-4 text-left font-semibold">Port</th>
            <th className="py-3 px-4 text-left font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {link.connections.map((connection, index) => {
            const domain = `https://${connection.name}-${link.name}.${rootDomain}`;
            return (
              <tr 
                key={index} 
                className="border-b hover:bg-gray-50 transition-colors"
              >
                <td className="py-3 px-4 text-blue-500">
                  <Link href={domain} target="_blank" className="hover:underline">
                    {connection.name}
                  </Link>
                </td>
                <td className="py-3 px-4">{connection.serviceProtocol}</td>
                <td className="py-3 px-4">{connection.serviceIp}</td>
                <td className="py-3 px-4">{connection.servicePort}</td>
                <td className="py-3 px-4">
                  <div className="flex gap-3 items-center">
                    <EditConnection
                      connection={connection}
                      linkName={link.name}
                    />
                    <DeleteConnection connectionId={connection.id} />
                  </div>
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
      </div>
    </>
  );
}
