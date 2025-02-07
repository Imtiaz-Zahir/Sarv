"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import { updateConnectionAction } from "@/actions/connection";
import { useRouter } from "next/navigation";

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if (!rootDomain) {
  throw new Error("Root domain is not defined");
}

export default function EditConnection({
  connection,
  linkName,
}: Readonly<{
  connection: {
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
  };
  linkName: string;
}>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [updated, setUpdated] = useState<{
    name?: string;
    serviceIp?: string;
    servicePort?: string;
    serviceProtocol?:
      | "HTTP"
      | "HTTPS"
      | "UNIX"
      | "TCP"
      | "SSH"
      | "RDP"
      | "SMB"
      | "HTTP_STATUS"
      | "BASTION";
  }>({});

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const key = e.target.name as
      | "name"
      | "serviceIp"
      | "servicePort"
      | "serviceProtocol";

    if (e.target.name === "servicePort") {
      const port = Number(e.target.value);
      if (isNaN(port)) return;

      if (port > 65535 || port < 0) return;
    }

    setUpdated({
      ...updated,
      [key]: e.target.value,
    });
  }

  async function handleEditConnection(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (loading) return;
      setLoading(true);

      if (Object.keys(updated).length === 0) {
        setIsModalOpen(false);
        setUpdated({});
        setLoading(false);
        return;
      }

      const newConnectionData = await updateConnectionAction(connection.id, {
        name: updated.name,
        serviceIp: updated.serviceIp,
        servicePort: updated.servicePort
          ? parseInt(updated.servicePort)
          : undefined,
        serviceProtocol: updated.serviceProtocol,
      });

      if (newConnectionData.id) {
        router.refresh();
      } else {
        alert(newConnectionData.message);
      }

      setLoading(false);
      setUpdated({});
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
      alert("Something went wrong. Please try again later.");
    }
  }

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="cursor-pointer w-5 h-5"
        onClick={() => setIsModalOpen(true)}
      >
        <path
          fill="#3b82f6"
          d="M5,18H9.24a1,1,0,0,0,.71-.29l6.92-6.93h0L19.71,8a1,1,0,0,0,0-1.42L15.47,2.29a1,1,0,0,0-1.42,0L11.23,5.12h0L4.29,12.05a1,1,0,0,0-.29.71V17A1,1,0,0,0,5,18ZM14.76,4.41l2.83,2.83L16.17,8.66,13.34,5.83ZM6,13.17l5.93-5.93,2.83,2.83L8.83,16H6ZM21,20H3a1,1,0,0,0,0,2H21a1,1,0,0,0,0-2Z"
        ></path>
      </svg>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
            <h2 className="text-xl font-semibold mb-4">Edit Connection</h2>
            <form onSubmit={handleEditConnection}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  URL
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    name="name"
                    value={updated.name || connection.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <span className="px-1 py-2 bg-gray-200 border-t border-b border-r border-gray-300 text-gray-500">
                    -
                  </span>
                  <span className="px-4 py-2 bg-gray-200 border-t border-b border-r border-gray-300 text-gray-500 whitespace-nowrap">
                    {linkName}
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
                    {updated.name ||
                      connection.name + "-" + linkName + "." + rootDomain}
                  </strong>
                </p>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Service Details
                </label>
                <div className="flex items-center space-x-0">
                  <select
                    name="serviceProtocol"
                    value={
                      updated.serviceProtocol || connection.serviceProtocol
                    }
                    onChange={handleChange}
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
                    name="serviceIp"
                    value={updated.serviceIp || connection.serviceIp}
                    onChange={handleChange}
                    placeholder="localhost"
                    className="flex-grow px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />

                  <span className="px-1 py-2 bg-gray-200 border-y border-gray-300 text-gray-500">
                    :
                  </span>

                  <input
                    type="text"
                    name="servicePort"
                    value={
                      updated.servicePort || connection.servicePort.toString()
                    }
                    onChange={handleChange}
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
                  Save Connection
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
