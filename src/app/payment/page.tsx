"use client";
import React, { useEffect, useState } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";
import { useSearchParams } from "next/navigation";

export default function RecoveryPage() {
  const searchParams = useSearchParams();
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const paction = searchParams.get("_paction");
  const ptxn = searchParams.get("_ptxn");

  useEffect(() => {
    const initPaddleAndOpenRecovery = async () => {
      try {
        const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
        const environment = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT;

        if (!clientToken || !environment) {
          throw new Error("Missing Paddle environment variables");
        }

        setLoading(true);
        const paddleInstance = await initializePaddle({
          token: clientToken,
          environment: environment === "production" ? "production" : "sandbox",
        });

        if (!paddleInstance) {
          throw new Error("Failed to initialize Paddle.");
        }

        setPaddle(paddleInstance);

        if (ptxn) {
          paddleInstance.Checkout.open({
            transactionId: ptxn,
          });
        }

        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Something went wrong. Please try again later.");
        setLoading(false);
      }
    };

    initPaddleAndOpenRecovery();
  }, [paction, ptxn]);

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      {loading || !paddle ? (
        <div className="h-6 w-6 animate-spin rounded-full border-4 border-cyan-500 border-r-transparent"></div>
      ) : (
        <p className="text-sm text-gray-500">Redirecting to recovery checkout...</p>
      )}
    </div>
  );
}
