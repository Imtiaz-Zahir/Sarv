import { getLinkById } from "@/services/link";
import React from "react";
import AddConnection from "./AddConnection";
import CopyButton from "./CopyButton";
import EditConnection from "./EditConnection";
import DeleteConnection from "./DeleteConnection";
import Link from "next/link";
import { auth } from "@/auth";
import { signOut } from "next-auth/react";
import ConnectionStatus from "./ConnectionStatus";

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
      <div className="flex justify-center gap-5 w-full mt-5">
        <div className="max-w-4xl w-full">
          <AddConnection link={{ id: link.id, name: link.name }} />
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
        <Instruction tunnelToken={link.tunnelToken} />
      </div>
    </>
  );
}

function Instruction({ tunnelToken }: { tunnelToken: string }) {
  const installationCommand = `winget install --id Cloudflare.cloudflared; cloudflared.exe service install ${tunnelToken}`;

  return (
    <div>
      <div className="max-w-sm w-full border border-gray-300 shadow-lg rounded-lg p-6 bg-white">
        {/* Instruction Steps */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Setup Instructions
          </h3>
          <ol className="list-decimal list-inside text-sm text-gray-700 space-y-2 pl-4">
            <li>
              Open <strong>PowerShell</strong> in administrator mode. You can do
              this by searching &quot;PowerShell&quot; in the Start Menu,
              right-clicking it, and selecting{" "}
              <strong>Run as Administrator</strong>.
            </li>
            <li>
              Copy the command below by clicking the{" "}
              <strong>Copy Command</strong> button.
            </li>
            <li>
              Paste the command into PowerShell and press <strong>Enter</strong>
              .
            </li>
          </ol>
        </div>

        {/* Command Section */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-700">Command:</label>
          <div className="relative mt-2 bg-gray-100 border border-gray-300 rounded-lg px-4 py-3">
            <input
              type="text"
              readOnly
              value={installationCommand}
              className="w-full bg-transparent text-sm text-gray-800 focus:outline-none"
            />
            <CopyButton command={installationCommand} />
          </div>
        </div>

        {/* Final Note */}
        <div className="bg-blue-50 border border-blue-200 text-blue-700 text-sm rounded-lg px-4 py-3">
          <strong>Important:</strong> Ensure that PowerShell is run as an
          administrator to avoid any permission-related issues during the setup.
        </div>
      </div>
    </div>
  );
}
