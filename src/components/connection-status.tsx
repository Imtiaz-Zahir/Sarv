"use client"

import { useEffect, useState } from "react"
import { getConnectionStatusAction } from "@/actions/connection"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ConnectionStatusProps {
  href: string
}

export default function ConnectionStatus({ href }: ConnectionStatusProps) {
  const [status, setStatus] = useState<"inactive" | "active" | "loading">("loading")

  useEffect(() => {
    async function checkStatus() {
      try {
        setStatus("loading")
        const status = await getConnectionStatusAction(href)
        setStatus(status)
      } catch (error) {
        setStatus("inactive")
        console.error(error)
      }
    }

    checkStatus()

    let interval = setInterval(() => {
      checkStatus()
    }, 30000)

    window.onblur = () => clearInterval(interval)

    window.onfocus = () => {
      checkStatus()
      interval = setInterval(() => {
        checkStatus()
      }, 30000)
    }

    return () => clearInterval(interval)
  }, [href])

  const statusColors = {
    loading: "bg-gray-500 animate-pulse",
    active: "bg-emerald-500",
    inactive: "bg-red-500",
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={`w-3 h-3 rounded-full ${statusColors[status]}`} />
        </TooltipTrigger>
        <TooltipContent side="right">
          <p className="capitalize">{status}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

