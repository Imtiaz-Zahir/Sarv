"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import { createConnectionAction } from "@/actions/connection";
import { useRouter } from "next/navigation";

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if (!rootDomain) {
  throw new Error("Root domain is not defined");
}

export default function AddConnection({
  link,
}: {
  link: { id: string; name: string };
}) {
  const router = useRouter();
  const [newConnection, setNewConnection] = useState({
    address: "",
    ip: "",
    port: "",
    protocol: "",
  });
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleSaveConnection(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (loading) return;
      setLoading(true);

      if (
        !newConnection.address ||
        !newConnection.ip ||
        !newConnection.port ||
        !newConnection.protocol
      ) {
        alert("Please fill all the fields");
        setLoading(false);
        return;
      }

      const newConnectionData = await createConnectionAction({
        linkId: link.id,
        name: newConnection.address,
        serviceIp: newConnection.ip,
        servicePort: parseInt(newConnection.port),
        serviceProtocol: newConnection.protocol.toUpperCase() as
          | "HTTP"
          | "HTTPS",
      });

      if (newConnectionData.id) {
        router.refresh();
      } else {
        alert(newConnectionData.message);
      }

      setLoading(false);
      setNewConnection({
        address: "",
        ip: "",
        port: "",
        protocol: "",
      });
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Something went wrong. Please try again later.");
    }
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <button
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          onClick={() => setIsModalOpen(true)}
        >
          Add New Connection
        </button>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
            <h2 className="text-xl font-semibold mb-4">Add New Connection</h2>
            <form onSubmit={handleSaveConnection}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  URL
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="address"
                    value={newConnection.address}
                    onChange={(e) => {
                      if (
                        e.target.value !== "" &&
                        !/^[a-zA-Z0-9-]+$/.test(e.target.value)
                      )
                        return;

                      setNewConnection({
                        ...newConnection,
                        address: e.target.value,
                      });
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span className="px-1 py-2 bg-gray-200 border-t border-b border-r border-gray-300 text-gray-500">
                    -
                  </span>
                  <span className="px-4 py-2 bg-gray-200 border-t border-b border-r border-gray-300 text-gray-500 whitespace-nowrap">
                    {link.name}
                  </span>
                  <span className="px-1 py-2 bg-gray-200 border-t border-b border-r border-gray-300 text-gray-500">
                    .
                  </span>
                  <span className="px-4 py-2 bg-gray-200 border-t border-b border-r border-gray-300 text-gray-500 rounded-r-lg whitespace-nowrap">
                    {rootDomain}
                  </span>
                </div>
                <p className="text-xs text-gray-500 flex gap-2 items-center mt-2">
                  Your URL will be
                  <strong>
                    {newConnection.address + "-" + link.name + "." + rootDomain}
                  </strong>
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Details
                </label>
                <div className="flex items-center space-x-0">
                  <select
                    name="protocol"
                    value={newConnection.protocol}
                    onChange={(e) =>
                      setNewConnection({
                        ...newConnection,
                        protocol: e.target.value,
                      })
                    }
                    className="px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="" hidden>
                      Protocol
                    </option>
                    <option value="HTTP">HTTP</option>
                    <option value="HTTPS">HTTPS</option>
                  </select>

                  <span className="px-1 py-2 bg-gray-200 border-y border-gray-300 text-gray-500">
                    ://
                  </span>

                  <input
                    type="text"
                    name="ip"
                    value={newConnection.ip}
                    onChange={(e) =>
                      setNewConnection({ ...newConnection, ip: e.target.value })
                    }
                    placeholder="localhost"
                    className="flex-grow px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />

                  <span className="px-1 py-2 bg-gray-200 border-y border-gray-300 text-gray-500">
                    :
                  </span>

                  <input
                    type="text"
                    name="port"
                    value={newConnection.port}
                    onChange={(e) => {
                      const port = Number(e.target.value);
                      if (isNaN(port)) return;
                      if (port > 65535 || port < 0) return;

                      setNewConnection({
                        ...newConnection,
                        port: e.target.value,
                      });
                    }}
                    placeholder="8080"
                    className="w-24 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <Button type="submit" loading={loading}>
                  Add Connection
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
