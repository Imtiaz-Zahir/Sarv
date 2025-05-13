"use client";
import React, { useEffect, useState } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

export default function Payment({
  proxyId,
  userEmail,
}: {
  proxyId: string;
  userEmail: string;
}) {
  const [loading, setLoading] = useState(false);
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
      if (!clientToken) {
        throw new Error(
          "Missing NEXT_PUBLIC_PADDLE_CLIENT_TOKEN environment variable"
        );
      }

      const paddleEnvironment = process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT;
      if (!paddleEnvironment) {
        throw new Error(
          "Missing NEXT_PUBLIC_PADDLE_ENVIRONMENT environment variable"
        );
      }

      setLoading(true);
      initializePaddle({
        token: clientToken,
        environment:
          paddleEnvironment === "production" ? "production" : "sandbox",
      }).then((paddleInstance) => {
        if (!paddleInstance) {
          throw new Error(
            "Failed to initialize Paddle. Please try again later."
          );
        }

        setPaddle(paddleInstance);
        setLoading(false);
      });
    } catch (error) {
      console.error(error);
      setError("Failed to initialize payment system. Please try again later.");
      setLoading(false);
    }
  }, []);

  const handleSubscribe = async () => {
    try {
      setLoading(true);

      if (!paddle) {
        setError("Payment system is not ready. Please try again.");
        setLoading(false);
        return;
      }

      paddle.Checkout.open({
        items: [
          {
            priceId: "pri_01jv15pqqjd8adzx778pymt9d1",
            quantity: 1,
          },
        ],
        customData: {
          proxyId,
        },
        customer: {
          email: userEmail,
        },
        settings: {
          successUrl: `https://www.proxymailer.online/dashboard`,
          theme: "dark",
        },
      });
    } catch (error) {
      console.error(error);
      setError("Failed to open payment form. Please try again later.");
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="mb-4">
        <p className="text-red-400 text-sm mb-2">{error}</p>
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition duration-200 cursor-pointer"
          onClick={() => {
            window.location.reload();
          }}
        >
          Try Again
        </button>
      </div>
    );
  } else if (!paddle) {
    return (
      <div className="flex justify-center py-4">
        <div className="inline-block h-6 w-6 animate-spin rounded-full border-3 border-solid border-cyan-400 border-r-transparent"></div>
      </div>
    );
  } else {
    return (
      <button
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-md transition duration-200 cursor-pointer"
        onClick={handleSubscribe}
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent mr-2"></div>
            <span>Processing...</span>
          </div>
        ) : (
          "Subscribe Now"
        )}
      </button>
    );
  }
}
