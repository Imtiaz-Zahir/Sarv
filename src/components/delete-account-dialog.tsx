"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, Trash2 } from "lucide-react";
import { signOut } from "next-auth/react";

export default function DeleteAccountDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [confirmation, setConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmation(e.target.value);
    if (error) setError("");
  };

  const handleDeleteAccount = async () => {
    try {
      if (confirmation !== "DELETE") {
        setError("Please type DELETE to confirm");
        return;
      }

      setIsSubmitting(true);

      await signOut({ redirectTo: "/" });

      setIsSubmitting(false);
    } catch (error) {
      console.error("Failed to delete account", error);
      setError("Failed to delete account. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="bg-red-600 hover:bg-red-700 cursor-pointer"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Account
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md border-gray-800 bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            Delete Account
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            This action cannot be undone. This will permanently delete your
            account and remove all your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="bg-red-950/30 border border-red-800 rounded-lg p-4 text-sm text-red-300">
            <p>You will lose access to:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>All your tunnels and subdomains</li>
              <li>Your account settings and preferences</li>
              <li>Your usage history and statistics</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmation" className="text-white">
              Type <span className="font-bold">DELETE</span> to confirm
            </Label>
            <Input
              id="confirmation"
              value={confirmation}
              onChange={handleConfirmationChange}
              className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500"
            />
            {error && (
              <div className="flex items-center text-red-500 text-sm mt-1">
                <AlertCircle className="h-4 w-4 mr-1" />
                {error}
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="sm:justify-between">
          <Button
            type="button"
            variant="outline"
            className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 cursor-pointer"
            onClick={handleDeleteAccount}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white mr-2"></div>
                Deleting...
              </>
            ) : (
              "Delete Account"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
