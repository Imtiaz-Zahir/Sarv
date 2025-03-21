"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteConnectionAction } from "@/actions/connection";

interface DeleteConnectionDialogProps {
  connectionId: string;
  onClose: () => void;
}

export default function DeleteConnectionDialog({
  connectionId,
  onClose,
}: DeleteConnectionDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    if (loading) return;

    setError("");
    setLoading(true);

    try {
      const res = await deleteConnectionAction(connectionId);

      if (!res.success) {
        setError(res.message || "Failed to delete connection");
      } else {
        router.refresh();
        onClose();
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md border-gray-800 bg-gray-900 text-white">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
            Delete Connection
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            This action cannot be undone. This will permanently delete your
            connection.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="bg-red-950/30 border border-red-800 rounded-lg p-4 text-sm text-red-300">
            <p>Are you sure you want to delete this connection? This will:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Remove the public URL for this connection</li>
              <li>Stop forwarding traffic to your local service</li>
              <li>Delete all connection settings</li>
            </ul>
          </div>

          {error && (
            <div className="flex items-start text-red-500 text-sm mt-4 bg-red-950/30 border border-red-800 rounded-lg p-3">
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
            type="button"
            variant="destructive"
            className="bg-red-600 hover:bg-red-700 cursor-pointer"
            disabled={loading}
            onClick={handleDelete}
          >
            {loading ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-white mr-2"></div>
                Deleting...
              </>
            ) : (
              "Delete Connection"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
