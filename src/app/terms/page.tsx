import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function TermsConditionsPage() {
  return (
    <main className="flex-1">
      <TermsHeroSection />
      <TermsContentSection />
    </main>
  );
}

function TermsHeroSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950"></div>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Terms and Conditions
          </h1>
          <p className="max-w-[600px] text-base sm:text-lg text-gray-400 md:text-xl">
            The rules and guidelines for using Sarv&apos;s services
          </p>
        </div>
      </div>
    </section>
  );
}

function TermsContentSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-900">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="mx-auto max-w-3xl">
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
            <CardContent className="p-6 sm:p-8">
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300">
                  <strong>Last Updated:</strong> March 20, 2025
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  1. Introduction
                </h2>
                <p className="text-gray-400 mb-4">
                  Welcome to Sarv.live (&quot;we,&quot; &quot;our,&quot; or
                  &quot;us&quot;). These Terms and Conditions govern your use of
                  our website and services offered at sarv.live (the
                  &quot;Service&quot;).
                </p>
                <p className="text-gray-400 mb-4">
                  By accessing or using the Service, you agree to be bound by
                  these Terms. If you disagree with any part of the terms, you
                  may not access the Service.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  2. Use of the Service
                </h2>
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                  2.1 Eligibility
                </h3>
                <p className="text-gray-400 mb-4">
                  By using our Service, you represent and warrant that you are
                  at least 18 years of age or that you are using the Service
                  with the supervision of a parent or guardian.
                </p>

                <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                  2.2 Account Registration
                </h3>
                <p className="text-gray-400 mb-4">
                  When you create an account with us, you must provide
                  information that is accurate, complete, and current at all
                  times. Failure to do so constitutes a breach of the Terms,
                  which may result in immediate termination of your account on
                  our Service.
                </p>

                <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                  2.3 Account Security
                </h3>
                <p className="text-gray-400 mb-4">
                  You are responsible for safeguarding the password that you use
                  to access the Service and for any activities or actions under
                  your password. You agree not to disclose your password to any
                  third party. You must notify us immediately upon becoming
                  aware of any breach of security or unauthorized use of your
                  account.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  3. Tunnel Usage and Limitations
                </h2>
                <p className="text-gray-400 mb-4">
                  Our Service allows you to expose your local web server to the
                  internet. By using this Service, you agree to the following
                  conditions:
                </p>
                <ul className="list-disc pl-6 text-gray-400 mb-4">
                  <li>
                    You will not use the Service for any illegal activities
                  </li>
                  <li>
                    You will not use the Service to distribute malware or other
                    harmful content
                  </li>
                  <li>
                    You will not attempt to bypass any limitations or
                    restrictions placed on your account
                  </li>
                  <li>
                    You will not use the Service in a way that could damage,
                    disable, or impair our servers or networks
                  </li>
                  <li>
                    You will not use the Service to infringe upon the
                    intellectual property rights of others
                  </li>
                </ul>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  4. Intellectual Property
                </h2>
                <p className="text-gray-400 mb-4">
                  The Service and its original content, features, and
                  functionality are and will remain the exclusive property of
                  Sarv and its licensors. The Service is protected by copyright,
                  trademark, and other laws of both the United States and
                  foreign countries. Our trademarks and trade dress may not be
                  used in connection with any product or service without the
                  prior written consent of Sarv.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  5. User Content
                </h2>
                <p className="text-gray-400 mb-4">
                  When you create or make available any content through our
                  Service, you represent and warrant that:
                </p>
                <ul className="list-disc pl-6 text-gray-400 mb-4">
                  <li>
                    The content is yours (you own it) or you have the right to
                    use it and grant us the rights and license as provided in
                    these Terms
                  </li>
                  <li>
                    The content does not violate the privacy rights, publicity
                    rights, copyrights, contractual rights, or any other rights
                    of any person
                  </li>
                </ul>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  6. Termination
                </h2>
                <p className="text-gray-400 mb-4">
                  We may terminate or suspend your account immediately, without
                  prior notice or liability, for any reason whatsoever,
                  including without limitation if you breach the Terms.
                </p>
                <p className="text-gray-400 mb-4">
                  Upon termination, your right to use the Service will
                  immediately cease. If you wish to terminate your account, you
                  may simply discontinue using the Service.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  7. Limitation of Liability
                </h2>
                <p className="text-gray-400 mb-4">
                  In no event shall Sarv, nor its directors, employees,
                  partners, agents, suppliers, or affiliates, be liable for any
                  indirect, incidental, special, consequential or punitive
                  damages, including without limitation, loss of profits, data,
                  use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-6 text-gray-400 mb-4">
                  <li>
                    Your access to or use of or inability to access or use the
                    Service
                  </li>
                  <li>
                    Any conduct or content of any third party on the Service
                  </li>
                  <li>Any content obtained from the Service</li>
                  <li>
                    Unauthorized access, use, or alteration of your
                    transmissions or content
                  </li>
                </ul>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  8. Disclaimer
                </h2>
                <p className="text-gray-400 mb-4">
                  Your use of the Service is at your sole risk. The Service is
                  provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot;
                  basis. The Service is provided without warranties of any kind,
                  whether express or implied, including, but not limited to,
                  implied warranties of merchantability, fitness for a
                  particular purpose, non-infringement, or course of
                  performance.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  9. Governing Law
                </h2>
                <p className="text-gray-400 mb-4">
                  These Terms shall be governed and construed in accordance with
                  the laws of the United States, without regard to its conflict
                  of law provisions.
                </p>
                <p className="text-gray-400 mb-4">
                  Our failure to enforce any right or provision of these Terms
                  will not be considered a waiver of those rights. If any
                  provision of these Terms is held to be invalid or
                  unenforceable by a court, the remaining provisions of these
                  Terms will remain in effect.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  10. Changes to Terms
                </h2>
                <p className="text-gray-400 mb-4">
                  We reserve the right, at our sole discretion, to modify or
                  replace these Terms at any time. If a revision is material, we
                  will try to provide at least 30 days&apos; notice prior to any
                  new terms taking effect.
                </p>
                <p className="text-gray-400 mb-4">
                  By continuing to access or use our Service after those
                  revisions become effective, you agree to be bound by the
                  revised terms. If you do not agree to the new terms, please
                  stop using the Service.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  11. Contact Us
                </h2>
                <p className="text-gray-400 mb-4">
                  If you have any questions about these Terms, please contact
                  us:
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
