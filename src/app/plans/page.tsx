import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <main className="flex-1">
      <PricingHeroSection />
      <PricingPlanSection />
      <PricingFaqSection />
    </main>
  );
}

function PricingHeroSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950"></div>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 h-20">
            Simple, Transparent Pricing
          </h1>
          <p className="max-w-[600px] text-base sm:text-lg text-gray-400 md:text-xl">
            Everything you need to expose your local server globally at an
            affordable price
          </p>
        </div>
      </div>
    </section>
  );
}

function PricingPlanSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-900">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="mx-auto max-w-xl">
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur overflow-hidden relative py-0">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-50"></div>
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 blur-xl"></div>
            <CardHeader className="border-b border-gray-800 bg-gray-950/70 pb-6 pt-8 px-6 relative">
              <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-medium py-1 px-3 rounded-bl-lg">
                MOST POPULAR
              </div>
              <CardTitle className="text-2xl font-bold text-white text-center">
                Pro Plan
              </CardTitle>
              <div className="flex justify-center items-baseline mt-4">
                <span className="text-5xl font-bold tracking-tight text-white">
                  $25
                </span>
                <span className="text-gray-400 ml-1 text-lg">/month</span>
              </div>
              <p className="text-center text-gray-400 mt-2">
                All the features you need to expose your local server globally
              </p>
            </CardHeader>
            <CardContent className="p-6 relative z-10">
              <ul className="space-y-3">
                <li className="flex items-center">
                  <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-1 mr-3">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-300">Unlimited tunnels</span>
                </li>
                <li className="flex items-center">
                  <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-1 mr-3">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-300">Custom subdomains</span>
                </li>
                <li className="flex items-center">
                  <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-1 mr-3">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-300">Free SSL certificates</span>
                </li>
                <li className="flex items-center">
                  <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-1 mr-3">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-300">Multi-port support</span>
                </li>
                <li className="flex items-center">
                  <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-1 mr-3">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-300">Web dashboard</span>
                </li>
                <li className="flex items-center">
                  <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-1 mr-3">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-300">Priority support</span>
                </li>
                <li className="flex items-center">
                  <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-1 mr-3">
                    <Check className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-300">
                    14-day money-back guarantee
                  </span>
                </li>
              </ul>
            </CardContent>
            <CardFooter className="bg-gray-950/70 border-t border-gray-800 px-6 py-6 relative z-10">
              <Button
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0"
                size="lg"
                asChild
              >
                <Link href="/signup">Subscribe Now</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}

function PricingFaqSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950"></div>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-sm text-white">
              FAQ
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Pricing Questions
            </h2>
            <p className="max-w-[900px] text-gray-400 text-base sm:text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our pricing.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-3xl gap-6">
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">
                What&apos;s included in the Pro Plan?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                The Pro Plan includes unlimited tunnels, custom subdomains, free
                SSL certificates, multi-port support, access to our web
                dashboard, real-time statistics, and priority support.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">
                Do you offer a free trial?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                While we don&apos;t offer a free trial, we do provide a 14-day
                money-back guarantee. If you&apos;re not satisfied with our
                service within the first 14 days, you can request a full refund.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">
                How does the refund policy work?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                We offer a 14-day money-back guarantee. If you cancel your
                subscription within 14 days of your initial purchase,
                you&apos;ll receive a full refund. After this period, we do not
                provide refunds for cancellations.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">
                Can I upgrade or downgrade my plan later?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Currently, we offer just one Pro Plan at $25/month. If we
                introduce additional plans in the future, we&apos;ll provide
                simple options to upgrade or downgrade your subscription.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
