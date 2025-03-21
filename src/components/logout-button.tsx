"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {

  return (
    <Button
      variant="outline"
      className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
      onClick={async () => await signOut({ redirectTo: "/" })}
    >
      <LogOut className="mr-2 h-4 w-4" />
      Sign Out
    </Button>
  );
}
