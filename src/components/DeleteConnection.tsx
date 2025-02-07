"use client";
import React, { useState } from "react";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { deleteConnectionAction } from "@/actions/connection";

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if (!rootDomain) {
  throw new Error("Root domain is not defined");
}

export default function DeleteConnection({
  connectionId,
}: Readonly<{ connectionId: string }>) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function handleDeleteConnection(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      if (loading) return;
      setLoading(true);

      const res = await deleteConnectionAction(connectionId);

      if (!res.success) {
        alert(res.message);
      } else {
        router.refresh();
        setIsModalOpen(false);
      }

      setLoading(false);
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
          fill="#d11a2a"
          d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18ZM20,6H16V5a3,3,0,0,0-3-3H11A3,3,0,0,0,8,5V6H4A1,1,0,0,0,4,8H5V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V8h1a1,1,0,0,0,0-2ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm7,14a1,1,0,0,1-1,1H8a1,1,0,0,1-1-1V8H17Zm-3-1a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z"
        ></path>
      </svg>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">Delete Connection</h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this connection? This action
              cannot be undone.
            </p>
            <form onSubmit={handleDeleteConnection}>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <Button
                  type="submit"
                  loading={loading}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Delete Connection
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
