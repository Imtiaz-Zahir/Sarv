import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function PrivacyPolicyPage() {
  return (
    <main className="flex-1">
      <PrivacyHeroSection />
      <PrivacyContentSection />
    </main>
  );
}

function PrivacyHeroSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950"></div>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Privacy Policy
          </h1>
          <p className="max-w-[600px] text-base sm:text-lg text-gray-400 md:text-xl">
            How Sarv collects, uses, and protects your information
          </p>
        </div>
      </div>
    </section>
  );
}

function PrivacyContentSection() {
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
                  Welcome to Sarv (&quot;we,&quot; &quot;our,&quot; or
                  &quot;us&quot;). At Sarv, we respect your privacy and are
                  committed to protecting your personal data. This privacy
                  policy explains how we collect, use, and safeguard your
                  information when you use our service at sarv.live.
                </p>
                <p className="text-gray-400 mb-4">
                  Please read this privacy policy carefully. By using our
                  service, you acknowledge that you have read and understood
                  this policy.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  2. Information We Collect
                </h2>
                <p className="text-gray-400 mb-4">
                  We collect several types of information for various purposes
                  to provide and improve our service to you:
                </p>
                <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                  2.1 Personal Data
                </h3>
                <p className="text-gray-400 mb-4">
                  While using our service, we may ask you to provide certain
                  personally identifiable information that can be used to
                  contact or identify you, including but not limited to:
                </p>
                <ul className="list-disc pl-6 text-gray-400 mb-4">
                  <li>Email address</li>
                  <li>Name</li>
                  <li>Usage data</li>
                </ul>

                <h3 className="text-lg font-semibold text-white mt-6 mb-3">
                  2.2 Usage Data
                </h3>
                <p className="text-gray-400 mb-4">
                  We may also collect information on how you access and use our
                  service, including:
                </p>
                <ul className="list-disc pl-6 text-gray-400 mb-4">
                  <li>
                    Your computer&apos;s Internet Protocol address (IP address)
                  </li>
                  <li>Browser type and version</li>
                  <li>The pages of our service that you visit</li>
                  <li>The time and date of your visit</li>
                  <li>The time spent on those pages</li>
                  <li>Other diagnostic data</li>
                </ul>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-gray-400 mb-4">
                  We use the collected data for various purposes:
                </p>
                <ul className="list-disc pl-6 text-gray-400 mb-4">
                  <li>To provide and maintain our service</li>
                  <li>To notify you about changes to our service</li>
                  <li>To provide customer support</li>
                  <li>
                    To provide analysis or valuable information so that we can
                    improve our service
                  </li>
                  <li>To monitor the usage of our service</li>
                  <li>To detect, prevent, and address technical issues</li>
                </ul>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  4. Security of Your Data
                </h2>
                <p className="text-gray-400 mb-4">
                  The security of your data is important to us, but remember
                  that no method of transmission over the Internet or method of
                  electronic storage is 100% secure. While we strive to use
                  commercially acceptable means to protect your personal data,
                  we cannot guarantee its absolute security.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  5. Your Data Protection Rights
                </h2>
                <p className="text-gray-400 mb-4">
                  Depending on your location, you may have certain rights
                  regarding your personal information:
                </p>
                <ul className="list-disc pl-6 text-gray-400 mb-4">
                  <li>
                    The right to access, update, or delete your information
                  </li>
                  <li>The right of rectification</li>
                  <li>The right to object</li>
                  <li>The right of restriction</li>
                  <li>The right to data portability</li>
                  <li>The right to withdraw consent</li>
                </ul>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  6. Cookies
                </h2>
                <p className="text-gray-400 mb-4">
                  We use cookies and similar tracking technologies to track
                  activity on our service and hold certain information. Cookies
                  are files with a small amount of data that may include an
                  anonymous unique identifier.
                </p>
                <p className="text-gray-400 mb-4">
                  You can instruct your browser to refuse all cookies or to
                  indicate when a cookie is being sent. However, if you do not
                  accept cookies, you may not be able to use some portions of
                  our service.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  7. Service Providers
                </h2>
                <p className="text-gray-400 mb-4">
                  We may employ third-party companies and individuals to
                  facilitate our service (&quot;Service Providers&quot;), to
                  provide the service on our behalf, to perform service-related
                  services, or to assist us in analyzing how our service is
                  used.
                </p>
                <p className="text-gray-400 mb-4">
                  These third parties have access to your personal data only to
                  perform these tasks on our behalf and are obligated not to
                  disclose or use it for any other purpose.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  8. Changes to This Privacy Policy
                </h2>
                <p className="text-gray-400 mb-4">
                  We may update our privacy policy from time to time. We will
                  notify you of any changes by posting the new privacy policy on
                  this page and updating the &quot;Last Updated&quot; date.
                </p>
                <p className="text-gray-400 mb-4">
                  You are advised to review this privacy policy periodically for
                  any changes. Changes to this privacy policy are effective when
                  they are posted on this page.
                </p>

                <h2 className="text-xl font-bold text-white mt-8 mb-4">
                  9. Contact Us
                </h2>
                <p className="text-gray-400 mb-4">
                  If you have any questions about this privacy policy, please
                  contact us:
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
