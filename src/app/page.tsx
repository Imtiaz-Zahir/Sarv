import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();

  if (session) redirect("/links");

  return (
    <>
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-24">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Secure Website Hosting From Home
            <span className="block text-yellow-400 mt-2">
              With Free SSL Certificates
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Host unlimited websites from your computer with automatic SSL
            certificates. One simple command gives you enterprise-grade security
            and global connectivity.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center justify-center bg-yellow-400 text-black py-3 px-8 rounded-lg text-xl font-semibold hover:bg-yellow-300 transition duration-300"
            >
              Login to Get Started
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-5 w-5"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
              {/* <ArrowRight className="ml-2 h-5 w-5" /> */}
            </Link>
            {/* <a href="#features" className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white py-3 px-8 rounded-lg text-xl font-semibold hover:bg-white/20 transition duration-300">
              Learn More
            </a> */}
          </div>
        </div>
      </section>

      {/* Security Features Section */}
      <section className="py-20 bg-gray-50 px-4 lg:px-28 lg:py-4">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Enterprise-Grade Security
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-blue-600 mb-4"
              >
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              {/* <Lock className="h-12 w-12 text-blue-600 mb-4" /> */}
              <h3 className="text-xl font-semibold mb-3">
                Free SSL Certificates
              </h3>
              <p className="text-gray-600">
                Every subdomain automatically gets a free SSL certificate for
                secure HTTPS connections.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-blue-600 mb-4"
              >
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
              </svg>
              {/* <Shield className="h-12 w-12 text-blue-600 mb-4" /> */}
              <h3 className="text-xl font-semibold mb-3">
                Cloudflare Protection
              </h3>
              <p className="text-gray-600">
                Built-in DDoS protection and security features powered by
                Cloudflare&apos;s global network.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-12 w-12 text-blue-600 mb-4"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
                <path d="M2 12h20"></path>
              </svg>
              {/* <Globe className="h-12 w-12 text-blue-600 mb-4" /> */}
              <h3 className="text-xl font-semibold mb-3">
                Unlimited Subdomains
              </h3>
              <p className="text-gray-600">
                Create as many secure subdomains as you need, each with its own
                SSL certificate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-blue-600"
                >
                  <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                  <path d="m9 11 3 3L22 4"></path>
                </svg>
                {/* <CheckCircle className="h-12 w-12 text-blue-600" /> */}
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Create Account</h3>
              <p className="text-gray-600">
                Sign up and log in to get your personal hosting command.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-blue-600"
                >
                  <polyline points="4 17 10 11 4 5"></polyline>
                  <line x1="12" x2="20" y1="19" y2="19"></line>
                </svg>
                {/* <Terminal className="h-12 w-12 text-blue-600" /> */}
              </div>
              <h3 className="text-xl font-semibold mb-3">2. Run Command</h3>
              <p className="text-gray-600">
                Copy your unique command and run it in your terminal. Everything
                else is automatic.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-12 w-12 text-blue-600"
                >
                  <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
                </svg>
                {/* <Cloud className="h-12 w-12 text-blue-600" /> */}
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Go Live</h3>
              <p className="text-gray-600">
                Your websites are instantly live with SSL certificates and
                Cloudflare protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features List Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Everything You Need
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-green-500 flex-shrink-0 mt-1"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Automatic SSL Certificates
                </h3>
                <p className="text-gray-600">
                  Every subdomain gets HTTPS automatically with valid SSL
                  certificates.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-green-500 flex-shrink-0 mt-1"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <div>
                <h3 className="text-xl font-semibold mb-2">DDoS Protection</h3>
                <p className="text-gray-600">
                  Enterprise-level protection against attacks and threats.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-green-500 flex-shrink-0 mt-1"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <div>
                <h3 className="text-xl font-semibold mb-2">Global CDN</h3>
                <p className="text-gray-600">
                  Lightning-fast content delivery through Cloudflare&apos;s
                  network.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-6 w-6 text-green-500 flex-shrink-0 mt-1"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
              <div>
                <h3 className="text-xl font-semibold mb-2">
                  Simple Management
                </h3>
                <p className="text-gray-600">
                  Easy-to-use dashboard to manage all your domains and settings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Start Hosting?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get started with secure, unlimited hosting in minutes. Create your
            account to receive your personal hosting command.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register"
              className="inline-flex items-center justify-center bg-yellow-400 text-black py-3 px-8 rounded-lg text-xl font-semibold hover:bg-yellow-300 transition duration-300"
            >
              Create Account
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-2 h-5 w-5"
              >
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center bg-white/10 backdrop-blur-sm text-white py-3 px-8 rounded-lg text-xl font-semibold hover:bg-white/20 transition duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
