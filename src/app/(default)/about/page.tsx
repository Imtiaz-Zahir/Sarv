import type React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Code, ExternalLink, Globe, Heart, Shield, Users } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <MissionSection />
      <StorySection />
      <TechnologySection />
      <ContactSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950"></div>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center text-center space-y-4 max-w-3xl mx-auto">
          <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-2">
            <ExternalLink className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            About Sarv
          </h1>
          <p className="text-xl text-gray-400 max-w-[700px]">
            We&apos;re on a mission to make web development easier by removing the
            barriers between local and global.
          </p>
        </div>
      </div>
    </section>
  );
}

function MissionSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-gray-900">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-sm text-white">
              Our Mission
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Empowering developers to build without boundaries
            </h2>
            <p className="text-gray-400 md:text-lg">
              At Sarv, we believe that development should be seamless,
              whether you&apos;re working locally or sharing globally. Our mission is
              to eliminate the technical barriers that slow down development and
              collaboration.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-2">
                  <Globe className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Accessibility</h3>
                <p className="text-gray-400">
                  Making advanced tools available to everyone, regardless of
                  technical expertise.
                </p>
              </CardContent>
            </Card>
            <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-2">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Security</h3>
                <p className="text-gray-400">
                  Ensuring that every connection is secure and private by
                  default.
                </p>
              </CardContent>
            </Card>
            <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-2">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Simplicity</h3>
                <p className="text-gray-400">
                  Creating tools that are powerful yet intuitive and easy to
                  use.
                </p>
              </CardContent>
            </Card>
            <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-2">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white">Community</h3>
                <p className="text-gray-400">
                  Building and supporting a global community of developers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

function StorySection() {
  return (
    <section className="w-full py-12 md:py-24 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950"></div>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="max-w-3xl mx-auto space-y-4 text-center">
          <div className="inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-sm text-white">
            Our Story
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            From frustration to innovation
          </h2>
          <p className="text-gray-400 md:text-lg">
            Sarv was born out of the frustration experienced by
            developers trying to share their local work with clients and
            teammates.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto space-y-8">
          <div className="relative pl-8 border-l border-gray-800">
            <div className="absolute left-0 top-0 w-4 h-4 -ml-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                2020: The Beginning
              </h3>
              <p className="text-gray-400">
                Our founders, a team of web developers, were constantly
                struggling with sharing their work-in-progress with clients.
                They built a simple tool for their own use that quickly gained
                attention from colleagues.
              </p>
            </div>
          </div>

          <div className="relative pl-8 border-l border-gray-800">
            <div className="absolute left-0 top-0 w-4 h-4 -ml-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                2021: Public Beta
              </h3>
              <p className="text-gray-400">
                After months of refinement, we launched our public beta,
                allowing developers worldwide to expose their local servers to
                the internet securely. The response was overwhelming.
              </p>
            </div>
          </div>

          <div className="relative pl-8 border-l border-gray-800">
            <div className="absolute left-0 top-0 w-4 h-4 -ml-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                2022: Growing Community
              </h3>
              <p className="text-gray-400">
                Our user base grew to over 50,000 developers, and we expanded
                our team to keep up with demand. We introduced new features like
                custom domains and access controls.
              </p>
            </div>
          </div>

          <div className="relative pl-8">
            <div className="absolute left-0 top-0 w-4 h-4 -ml-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">
                Today: Empowering Developers
              </h3>
              <p className="text-gray-400">
                Sarv now serves hundreds of thousands of developers
                worldwide, from freelancers to enterprise teams. We remain
                committed to our original mission: making web development easier
                by bridging the gap between local and global.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TechnologySection() {
  return (
    <section className="w-full py-12 md:py-24 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950"></div>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-sm text-white">
              Our Technology
            </div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Built for performance and security
            </h2>
            <p className="text-gray-400 md:text-lg">
              Our infrastructure is designed from the ground up to be fast,
              reliable, and secure. We use a distributed network of edge servers
              to ensure low latency connections worldwide.
            </p>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>End-to-end encryption for all traffic</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Global edge network with servers in 20+ regions</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>Automatic SSL certificate generation and renewal</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>WebSocket support for real-time applications</span>
              </li>
              <li className="flex items-start">
                <div className="mr-2 mt-1 h-5 w-5 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center">
                  <Check className="h-3 w-3 text-white" />
                </div>
                <span>99.9% uptime guarantee</span>
              </li>
            </ul>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 blur-xl"></div>
            <div className="relative rounded-xl border border-gray-800 bg-gray-900 p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">
                  Our Infrastructure
                </h3>
                <div className="aspect-video bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="mb-4 inline-flex rounded-full bg-gray-700 p-2">
                      <Users className="h-6 w-6 text-cyan-400" />
                    </div>
                    <p className="text-sm text-gray-400">
                      Infrastructure diagram showing our global edge network
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-white mb-1">20+</p>
                    <p className="text-xs text-gray-400">Global Regions</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-white mb-1">99.9%</p>
                    <p className="text-xs text-gray-400">Uptime</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-white mb-1">
                      &lt;100ms
                    </p>
                    <p className="text-xs text-gray-400">Average Latency</p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-white mb-1">1M+</p>
                    <p className="text-xs text-gray-400">Tunnels Created</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="w-full py-12 md:py-24 bg-gray-900">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <div className="inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-sm text-white">
            Get In Touch
          </div>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Have questions? We&apos;re here to help
          </h2>
          <p className="text-gray-400 md:text-lg">
            Our team is always available to answer your questions and help you
            get the most out of Sarv.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
            <Button
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0"
              asChild
            >
              <Link href="/contact" title="Contact Us">
                Contact Support
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
