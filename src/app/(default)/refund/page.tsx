import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function RefundPolicyPage() {
  return (
    <main className="flex-1">
      <RefundHeroSection />
      <RefundContentSection />
    </main>
  );
}

function RefundHeroSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950"></div>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Refund Policy
          </h1>
          <p className="max-w-[600px] text-base sm:text-lg text-gray-400 md:text-xl">
            Understanding Sarv&apos;s subscription refund terms and conditions
          </p>
        </div>
      </div>
    </section>
  );
}

function RefundContentSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-900">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="mx-auto max-w-3xl">
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
            <CardContent className="p-6 sm:p-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">
                  <strong>Last Updated:</strong> April 28, 2025
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  1. Introduction
                </h2>
                <p className="text-gray-400 mb-4">
                  Thank you for choosing Sarv (&quot;we,&quot; &quot;our,&quot;
                  or &quot;us&quot;). This refund policy outlines the terms and
                  conditions regarding subscription cancellations and refunds
                  for our services available at sarv.live.
                </p>
                <p className="text-gray-400 mb-4">
                  Please read this refund policy carefully. By subscribing to
                  our service, you acknowledge that you have read and understood
                  these terms.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  2. Refund Eligibility
                </h2>
                <p className="text-gray-400 mb-4">
                  We offer refunds under the following conditions:
                </p>
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                  2.1 14-Day Refund Period
                </h3>
                <p className="text-gray-400 mb-4">
                  Customers are eligible for a full refund if they cancel their
                  subscription within 14 days of the initial purchase date. This
                  14-day period begins on the day of your subscription purchase.
                </p>
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                  2.2 Non-Eligible Refunds
                </h3>
                <p className="text-gray-400 mb-4">
                  Subscription cancellations requested after the 14-day period
                  are not eligible for refunds. Your subscription will remain
                  active until the end of the current billing cycle.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  3. How to Request a Refund
                </h2>
                <p className="text-gray-400 mb-4">
                  To request a refund, please follow these steps:
                </p>
                <ul className="list-disc pl-6 text-gray-400 mb-4">
                  <li>Log in to your Sarv account</li>
                  <li>Navigate to the Account Settings section</li>
                  <li>Select &quot;Manage Subscription&quot; from the menu</li>
                  <li>Click on &quot;Cancel Subscription&quot;</li>
                  <li>Follow the prompts to confirm cancellation</li>
                  <li>If eligible, select &quot;Request Refund&quot; option</li>
                </ul>
                <p className="text-gray-400 mb-4">
                  Alternatively, you can contact our customer support team
                  directly for assistance with your refund request.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  4. Refund Processing
                </h2>
                <p className="text-gray-400 mb-4">
                  Once we receive and approve your refund request:
                </p>
                <ul className="list-disc pl-6 text-gray-400 mb-4">
                  <li>Refunds will be processed within 5-7 business days</li>
                  <li>
                    The refund will be issued to the original payment method
                    used for the purchase
                  </li>
                  <li>
                    You will receive an email confirmation once the refund has
                    been processed
                  </li>
                </ul>
                <p className="text-gray-400 mb-4">
                  Please note that depending on your payment provider, it may
                  take additional time for the refunded amount to appear in your
                  account.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  5. Special Circumstances
                </h2>
                <p className="text-gray-400 mb-4">
                  We may consider refunds outside of the standard 14-day window
                  in exceptional circumstances:
                </p>
                <ul className="list-disc pl-6 text-gray-400 mb-4">
                  <li>
                    Technical issues that severely impact service usability
                  </li>
                  <li>Service unavailability for extended periods</li>
                  <li>
                    Other circumstances as evaluated on a case-by-case basis
                  </li>
                </ul>
                <p className="text-gray-400 mb-4">
                  Such refunds are provided at Sarv&apos;s sole discretion and
                  will be evaluated individually.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  6. Subscription Cancellation vs. Refund
                </h2>
                <p className="text-gray-400 mb-4">
                  It&apos;s important to understand the difference between
                  canceling your subscription and requesting a refund:
                </p>
                <ul className="list-disc pl-6 text-gray-400 mb-4">
                  <li>
                    <strong>Cancellation:</strong> You can cancel your
                    subscription at any time. Cancellation prevents future
                    billing cycles but does not automatically qualify you for a
                    refund of the current billing period.
                  </li>
                  <li>
                    <strong>Refund:</strong> A refund returns the payment for
                    your current subscription period and terminates access to
                    premium features immediately.
                  </li>
                </ul>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  7. Changes to This Refund Policy
                </h2>
                <p className="text-gray-400 mb-4">
                  We may update our refund policy from time to time. We will
                  notify you of any changes by posting the new refund policy on
                  this page and updating the &quot;Last Updated&quot; date.
                </p>
                <p className="text-gray-400 mb-4">
                  You are advised to review this refund policy periodically for
                  any changes. Changes to this refund policy are effective when
                  they are posted on this page.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  8. Contact Us
                </h2>
                <p className="text-gray-400 mb-4">
                  If you have any questions about this refund policy or would
                  like to request a refund, please contact us:
                </p>
                <ul className="list-disc pl-6 text-gray-400 mb-4">
                  <li>By email: support@sarv.live</li>
                  <li>
                    By visiting the contact page on our website:
                    sarv.live/contact
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
