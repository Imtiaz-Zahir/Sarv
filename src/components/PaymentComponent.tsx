"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check, Shield, Clock, Zap } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

export default function PaymentComponent({
  linkId,
  linkName,
  userEmail,
}: {
  linkId: string;
  linkName: string;
  userEmail: string;
}) {
  const [loading, setLoading] = useState(false);
  const [paddle, setPaddle] = useState<Paddle | null>(null);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN;
  if (!rootDomain) {
    throw new Error("Missing NEXT_PUBLIC_ROOT_DOMAIN environment variable");
  }

  useEffect(() => {
    const currentUrl = window.location.href;
    if (currentUrl.includes("success=true")) {
      setPaymentSuccess(true);
      setTimeout(
        () => window.location.reload(),
        30000
      );
      return;
    }
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

      const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;
      if (!priceId) {
        setError("Missing payment configuration. Please contact support.");
        setLoading(false);
        return;
      }

      paddle.Checkout.open({
        items: [
          {
            priceId,
            quantity: 1,
          },
        ],
        customData: {
          linkId,
        },
        customer: {
          email: userEmail,
        },
        settings: {
          successUrl: `${window.location.origin}/links/${linkId}?success=true`,
          theme: "dark",
        },
      });
    } catch (error) {
      console.error(error);
      setError("Failed to open payment form. Please try again later.");
      setLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-medium text-white">
            Payment Successful!
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            Please wait for a few minutes for the link to be activated. then
            refresh the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      <div className="text-center mb-6">
        <h2 className="text-xl font-medium text-white">
          Your link is
          <span className="text-cyan-400">{" " + linkName}</span>
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Complete your subscription to activate your link
        </p>
      </div>

      <Card className="border-gray-800 bg-gray-900/50 shadow-md">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white text-lg">Pro Plan</CardTitle>
              <CardDescription className="text-gray-400 text-sm">
                $25/month after 7-day free trial
              </CardDescription>
            </div>
            <div className="bg-cyan-500/20 py-1 px-3 rounded-full">
              <span className="text-xs font-medium text-cyan-400 flex items-center">
                <Zap className="h-3 w-3 mr-1" />
                7-DAY FREE
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="col-span-2 md:col-span-1">
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-cyan-400" />
                  <span className="text-gray-300">Unlimited tunnels</span>
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-cyan-400" />
                  <span className="text-gray-300">Custom subdomains</span>
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-cyan-400" />
                  <span className="text-gray-300">Free SSL certificates</span>
                </li>
              </ul>
            </div>
            <div className="col-span-2 md:col-span-1">
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-cyan-400" />
                  <span className="text-gray-300">Multi-port support</span>
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-cyan-400" />
                  <span className="text-gray-300">Web dashboard</span>
                </li>
                <li className="flex items-center text-sm">
                  <Check className="h-4 w-4 mr-2 text-cyan-400" />
                  <span className="text-gray-300">Priority support</span>
                </li>
              </ul>
            </div>
          </div>

          {error ? (
            <div className="mb-4">
              <p className="text-red-400 text-sm mb-2">{error}</p>
              <Button
                onClick={() => window.location.reload()}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white cursor-pointer"
              >
                Try Again
              </Button>
            </div>
          ) : !paddle ? (
            <div className="flex justify-center py-4">
              <div className="inline-block h-6 w-6 animate-spin rounded-full border-3 border-solid border-cyan-400 border-r-transparent"></div>
            </div>
          ) : (
            <Button
              onClick={handleSubscribe}
              className="w-full bg-cyan-500 hover:bg-cyan-600 text-white cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent mr-2"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Start Free Trial"
              )}
            </Button>
          )}

          <div className="flex items-center justify-center space-x-4 mt-4 text-xs text-gray-400">
            <div className="flex items-center">
              <Shield className="h-3 w-3 mr-1 text-cyan-400" />
              <span>Secure Payment</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1 text-cyan-400" />
              <span>14-day Money Back</span>
            </div>
          </div>
          
          <div className="mt-4 text-xs text-center text-gray-400">
            <p>Your first 7 days are completely free. You won&apos;t be charged until the trial ends.</p>
          </div>
        </CardContent>
      </Card>

      <p className="text-xs text-center text-gray-400 mt-4">
        Need help? Contact us at support@sarv.live
      </p>
    </div>
  );
}