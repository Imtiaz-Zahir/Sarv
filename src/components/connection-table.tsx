"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, Edit, Trash2 } from "lucide-react";
import ConnectionStatus from "@/components/connection-status";
import EditConnectionDialog from "@/components/edit-connection-dialog";
import DeleteConnectionDialog from "@/components/delete-connection-dialog";

interface Connection {
  id: string;
  linkId: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  serviceIp: string;
  servicePort: number;
  serviceProtocol:
    | "HTTP"
    | "HTTPS"
    | "UNIX"
    | "TCP"
    | "SSH"
    | "RDP"
    | "SMB"
    | "HTTP_STATUS"
    | "BASTION";
}

interface LinkData {
  id: string;
  name: string;
  tunnelToken: string;
  userEmail: string;
  connections: Connection[];
}

interface ConnectionTableProps {
  link: LinkData;
}

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if (!rootDomain) {
  throw new Error("NEXT_PUBLIC_ROOT_DOMAIN is not defined");
}

export default function ConnectionTable({ link }: ConnectionTableProps) {
  const [editConnection, setEditConnection] = useState<Connection | null>(null);
  const [deleteConnectionId, setDeleteConnectionId] = useState<string | null>(
    null
  );

  if (link.connections.length === 0) {
    return (
      <div className="text-center py-12 border border-dashed border-gray-700 rounded-lg bg-gray-900/30">
        <h3 className="text-lg font-medium text-white mb-2">
          No connections yet
        </h3>
        <p className="text-gray-400 mb-6 max-w-md mx-auto">
          Add your first connection to start exposing your local services to the
          internet
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-gray-800">
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Status
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Name
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Protocol
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              IP
            </th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
              Port
            </th>
            <th className="py-3 px-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {link.connections.map((connection) => {
            const domain = `https://${connection.name}-${link.name}.${rootDomain}`;

            return (
              <tr key={connection.id} className="hover:bg-gray-900/50">
                <td className="py-4 px-4">
                  <ConnectionStatus href={domain} />
                </td>
                <td className="py-4 px-4">
                  <Link
                    href={domain}
                    target="_blank"
                    className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    {connection.name}
                    <ExternalLink className="h-3.5 w-3.5 ml-1" />
                  </Link>
                  <span className="text-xs text-gray-500 block mt-1">
                    {connection.name}-{link.name}.{rootDomain}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-300">
                  {connection.serviceProtocol}
                </td>
                <td className="py-4 px-4 text-gray-300 font-mono text-sm">
                  {connection.serviceIp}
                </td>
                <td className="py-4 px-4 text-gray-300 font-mono text-sm">
                  {connection.servicePort}
                </td>
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800 cursor-pointer"
                      onClick={() => setEditConnection(connection)}
                    >
                      <Edit className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-gray-800 cursor-pointer"
                      onClick={() => setDeleteConnectionId(connection.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Edit Connection Dialog */}
      {editConnection && (
        <EditConnectionDialog
          connection={editConnection}
          linkName={link.name}
          onClose={() => setEditConnection(null)}
        />
      )}

      {/* Delete Connection Dialog */}
      {deleteConnectionId && (
        <DeleteConnectionDialog
          connectionId={deleteConnectionId}
          onClose={() => setDeleteConnectionId(null)}
        />
      )}
    </div>
  );
}
