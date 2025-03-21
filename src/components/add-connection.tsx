"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createConnectionAction } from "@/actions/connection";

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || "localexpose.com";

interface AddConnectionProps {
  link: {
    id: string;
    name: string;
  };
}

export default function AddConnection({ link }: AddConnectionProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newConnection, setNewConnection] = useState({
    address: "",
    ip: "",
    port: "",
    protocol: "HTTP",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "address" && value !== "" && !/^[a-zA-Z0-9-]+$/.test(value)) {
      return;
    }

    if (name === "port") {
      const port = Number(value);
      if (isNaN(port) || port > 65535 || port < 0) return;
    }

    setNewConnection({
      ...newConnection,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      if (
        !newConnection.address ||
        !newConnection.ip ||
        !newConnection.port ||
        !newConnection.protocol
      ) {
        setError("Please fill all the fields");
        setLoading(false);
        return;
      }

      const newConnectionData = await createConnectionAction({
        linkId: link.id,
        name: newConnection.address,
        serviceIp: newConnection.ip,
        servicePort: Number.parseInt(newConnection.port),
        serviceProtocol: newConnection.protocol.toUpperCase() as
          | "HTTP"
          | "HTTPS",
      });

      if (newConnectionData.id) {
        router.refresh();
        setIsOpen(false);
        setNewConnection({
          address: "",
          ip: "",
          port: "",
          protocol: "HTTP",
        });
      } else {
        setError(newConnectionData.message || "Failed to create connection");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 cursor-pointer"
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Connection
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md border-gray-800 bg-gray-900 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Connection</DialogTitle>
            <DialogDescription className="text-gray-400">
              Create a new connection to expose your local service
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="address">Connection Name</Label>
                <div className="flex flex-wrap items-center gap-1">
                  <div className="flex-1">
                    <Input
                      id="address"
                      name="address"
                      value={newConnection.address}
                      onChange={handleChange}
                      placeholder="my-app"
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      required
                    />
                  </div>
                  <div className="flex items-center bg-gray-800 border border-gray-700 rounded-md px-2 py-2 text-gray-400 text-sm">
                    <span>-</span>
                    <span className="px-1">{link.name}</span>
                    <span>.</span>
                    <span className="px-1">{rootDomain}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  Your URL will be{" "}
                  <span className="font-mono text-cyan-400">
                    {newConnection.address
                      ? `${newConnection.address}-${link.name}.${rootDomain}`
                      : `<name>-${link.name}.${rootDomain}`}
                  </span>
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="protocol">Service Details</Label>
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    id="protocol"
                    name="protocol"
                    value={newConnection.protocol}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    required
                  >
                    <option value="HTTP">HTTP</option>
                    <option value="HTTPS">HTTPS</option>
                  </select>

                  <span className="text-gray-400">://</span>

                  <Input
                    id="ip"
                    name="ip"
                    value={newConnection.ip}
                    onChange={handleChange}
                    placeholder="localhost"
                    className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    required
                  />

                  <span className="text-gray-400">:</span>

                  <Input
                    id="port"
                    name="port"
                    value={newConnection.port}
                    onChange={handleChange}
                    placeholder="8080"
                    className="w-24 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">
                  The local service you want to expose (e.g.,
                  http://localhost:3000)
                </p>
              </div>

              {error && (
                <div className="flex items-start text-red-500 text-sm mt-1 bg-red-950/30 border border-red-800 rounded-lg p-3">
                  <AlertCircle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white mr-2"></div>
                    Adding...
                  </>
                ) : (
                  "Add Connection"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
