"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { updateConnectionAction } from "@/actions/connection"

const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
if(!rootDomain) {
  throw new Error("NEXT_PUBLIC_ROOT_DOMAIN is not defined")
}

interface Connection {
  id: string
  linkId: string
  name: string
  createdAt: Date
  updatedAt: Date
  serviceIp: string
  servicePort: number
  serviceProtocol: "HTTP" | "HTTPS" | "UNIX" | "TCP" | "SSH" | "RDP" | "SMB" | "HTTP_STATUS" | "BASTION"
}

interface EditConnectionDialogProps {
  connection: Connection
  linkName: string
  onClose: () => void
}

export default function EditConnectionDialog({ connection, linkName, onClose }: EditConnectionDialogProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [updated, setUpdated] = useState<{
    name?: string
    serviceIp?: string
    servicePort?: string
    serviceProtocol?: "HTTP" | "HTTPS" | "UNIX" | "TCP" | "SSH" | "RDP" | "SMB" | "HTTP_STATUS" | "BASTION"
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === "name" && value !== "" && !/^[a-zA-Z0-9-]+$/.test(value)) {
      return
    }

    if (name === "servicePort") {
      const port = Number(value)
      if (isNaN(port) || port > 65535 || port < 0) return
    }

    setUpdated({
      ...updated,
      [name]: value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (loading) return

    setError("")

    if (Object.keys(updated).length === 0) {
      onClose()
      return
    }

    setLoading(true)

    try {
      const newConnectionData = await updateConnectionAction(connection.id, {
        name: updated.name,
        serviceIp: updated.serviceIp,
        servicePort: updated.servicePort ? Number.parseInt(updated.servicePort) : undefined,
        serviceProtocol: updated.serviceProtocol,
      })

      if (newConnectionData.id) {
        router.refresh()
        onClose()
      } else {
        setError(newConnectionData.message || "Failed to update connection")
      }
    } catch (error) {
      console.error(error)
      setError("Something went wrong. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-gray-800 bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-white">Edit Connection</DialogTitle>
          <DialogDescription className="text-gray-400">Update the details of your connection</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Connection Name</Label>
              <div className="flex flex-wrap items-center gap-1">
                <div className="flex-1">
                  <Input
                    id="name"
                    name="name"
                    value={updated.name || connection.name}
                    onChange={handleChange}
                    className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    required
                  />
                </div>
                <div className="flex items-center bg-gray-800 border border-gray-700 rounded-md px-2 py-2 text-gray-400 text-sm">
                  <span>-</span>
                  <span className="px-1">{linkName}</span>
                  <span>.</span>
                  <span className="px-1">{rootDomain}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Your URL will be{" "}
                <span className="font-mono text-cyan-400">
                  {updated.name || connection.name}-{linkName}.{rootDomain}
                </span>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="serviceProtocol">Service Details</Label>
              <div className="flex flex-wrap items-center gap-2">
                <select
                  id="serviceProtocol"
                  name="serviceProtocol"
                  value={updated.serviceProtocol || connection.serviceProtocol}
                  onChange={handleChange}
                  className="bg-gray-800 border-gray-700 text-white rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  required
                >
                  <option value="HTTP">HTTP</option>
                  <option value="HTTPS">HTTPS</option>
                </select>

                <span className="text-gray-400">://</span>

                <Input
                  id="serviceIp"
                  name="serviceIp"
                  value={updated.serviceIp || connection.serviceIp}
                  onChange={handleChange}
                  className="flex-1 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  required
                />

                <span className="text-gray-400">:</span>

                <Input
                  id="servicePort"
                  name="servicePort"
                  value={updated.servicePort || connection.servicePort.toString()}
                  onChange={handleChange}
                  className="w-24 bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                  required
                />
              </div>
              <p className="text-xs text-gray-500">The local service you want to expose</p>
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
              onClick={onClose}
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
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

