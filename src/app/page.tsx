import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Check,
  ChevronRight,
  Code,
  Globe,
  Laptop,
  Lock,
  Server,
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="flex-1">
      <HeroSection />
      <HowItWorksSection />
      <FeaturesSection />
      <UseCasesSection />
      <FaqSection />
      <CtaSection />
    </main>
  );
}

function HeroSection() {
  return (
    <section className="w-full py-12 md:py-16 lg:py-24 xl:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950"></div>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-6">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
                Expose your local web server to the world in seconds
              </h1>
              <p className="max-w-[600px] text-base sm:text-lg text-gray-400 md:text-xl">
                Get a free public URL with SSL for your localhost web server. No
                configuration, no cost, just instant secure access from
                anywhere.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white border-0 w-full sm:w-auto"
                size="lg"
                asChild
              >
                <Link href="/login" title="Sign In">
                  Get Started
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-700 text-gray-300 hover:text-white hover:bg-gray-800 w-full sm:w-auto"
                asChild
              >
                <Link href="#how-it-works">
                  How It Works
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              No credit card required. 100% free forever.
            </p>
          </div>
          <div className="relative mt-8 lg:mt-0">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-75 blur-xl"></div>
            <div className="relative mx-auto aspect-video overflow-hidden rounded-xl border border-gray-800 bg-gray-900 p-2">
              <div className="flex items-center gap-1.5 mb-3">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <div className="ml-2 flex-1 bg-gray-800 rounded h-6 flex items-center px-3">
                  <p className="text-xs text-gray-400">LocalExpose Dashboard</p>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 h-[250px] overflow-hidden">
                <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
                  <h3 className="text-sm font-medium text-white">My Tunnels</h3>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs h-7"
                  >
                    + New Tunnel
                  </Button>
                </div>
                <div className="space-y-3">
                  <div className="bg-gray-900 rounded p-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-white">
                        myapp.localexpose.com
                      </p>
                      <p className="text-xs text-gray-400">→ localhost:3000</p>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-xs text-gray-300">Active</span>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded p-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-white">
                        api.localexpose.com
                      </p>
                      <p className="text-xs text-gray-400">→ localhost:8080</p>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                      <span className="text-xs text-gray-300">Active</span>
                    </div>
                  </div>
                  <div className="bg-gray-900 rounded p-2 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-white">
                        demo.localexpose.com
                      </p>
                      <p className="text-xs text-gray-400">→ localhost:5000</p>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
                      <span className="text-xs text-gray-300">Offline</span>
                    </div>
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

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full py-16 md:py-24 bg-gray-900">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-sm text-white">
              How It Works
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Three simple steps to expose your local server
            </h2>
            <p className="max-w-[900px] text-gray-400 text-base sm:text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get your local web server online in less than a minute with our
              simple process.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-gray-800 bg-gray-950/50 p-6 shadow-lg backdrop-blur transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg">
              1
            </div>
            <h3 className="text-xl font-bold text-white text-center">
              Sign Up
            </h3>
            <p className="text-center text-gray-400">
              Create a free account and choose your custom subdomain (e.g.,
              myapp.localexpose.com) from our dashboard.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-gray-800 bg-gray-950/50 p-6 shadow-lg backdrop-blur transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg">
              2
            </div>
            <h3 className="text-xl font-bold text-white text-center">
              Download & Install
            </h3>
            <p className="text-center text-gray-400">
              Download our lightweight application that connects your computer
              to our service. Just a simple one-click install.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-gray-800 bg-gray-950/50 p-6 shadow-lg backdrop-blur transition-all">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg">
              3
            </div>
            <h3 className="text-xl font-bold text-white text-center">
              Manage & Share
            </h3>
            <p className="text-center text-gray-400">
              Use our web dashboard to manage which ports to expose and share
              your secure public URL with anyone, anywhere.
            </p>
          </div>
        </div>
        <div className="mt-8 flex justify-center px-4 sm:px-0">
          <div className="relative max-w-3xl w-full">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 opacity-20 blur-xl"></div>
            <div className="relative rounded-xl border border-gray-800 bg-gray-900 p-4 sm:p-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">
                  Easy Management Dashboard
                </h3>
                <p className="text-gray-400">
                  Our intuitive web dashboard lets you create and manage all
                  your tunnels in one place. Configure ports, monitor traffic,
                  and control access with just a few clicks.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-white mb-1">
                      Create Tunnels
                    </p>
                    <p className="text-xs text-gray-400">
                      Choose your subdomain and local port
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-white mb-1">
                      Monitor Status
                    </p>
                    <p className="text-xs text-gray-400">
                      See active connections and traffic
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-3 text-center">
                    <p className="text-sm font-medium text-white mb-1">
                      Manage Access
                    </p>
                    <p className="text-xs text-gray-400">
                      Control who can access your tunnels
                    </p>
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

function FeaturesSection() {
  return (
    <section
      id="features"
      className="w-full py-16 md:py-24 bg-gray-950 relative"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950"></div>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-sm text-white">
              Features
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Everything you need to share your local server
            </h2>
            <p className="max-w-[900px] text-gray-400 text-base sm:text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our service provides all the essential features to make your local
              development accessible worldwide.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-gray-800 bg-gray-950/50 p-6 shadow-lg backdrop-blur transition-all hover:border-cyan-500/50 hover:shadow-cyan-500/10">
            <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-3">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white text-center">
              Custom Subdomains
            </h3>
            <p className="text-center text-gray-400">
              Choose your own subdomain name for easy sharing and branding of
              your local projects.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-gray-800 bg-gray-950/50 p-6 shadow-lg backdrop-blur transition-all hover:border-cyan-500/50 hover:shadow-cyan-500/10">
            <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-3">
              <Lock className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white text-center">
              Free SSL Certificates
            </h3>
            <p className="text-center text-gray-400">
              Every tunnel comes with automatic HTTPS encryption using our SSL
              certificates at no extra cost.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-gray-800 bg-gray-950/50 p-6 shadow-lg backdrop-blur transition-all hover:border-cyan-500/50 hover:shadow-cyan-500/10">
            <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-3">
              <Server className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white text-center">
              Multi-Port Support
            </h3>
            <p className="text-center text-gray-400">
              Expose multiple ports from your local machine under the same
              subdomain with different paths.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-gray-800 bg-gray-950/50 p-6 shadow-lg backdrop-blur transition-all hover:border-cyan-500/50 hover:shadow-cyan-500/10">
            <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-3">
              <Laptop className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white text-center">
              Web Dashboard
            </h3>
            <p className="text-center text-gray-400">
              Manage all your tunnels from our intuitive web dashboard. Monitor
              traffic, control access, and more.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-gray-800 bg-gray-950/50 p-6 shadow-lg backdrop-blur transition-all hover:border-cyan-500/50 hover:shadow-cyan-500/10">
            <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-3">
              <Code className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white text-center">
              Real-time Statistics
            </h3>
            <p className="text-center text-gray-400">
              View real-time traffic statistics and connection logs for all your
              exposed services.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-4 rounded-lg border border-gray-800 bg-gray-950/50 p-6 shadow-lg backdrop-blur transition-all hover:border-cyan-500/50 hover:shadow-cyan-500/10">
            <div className="rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-3">
              <Check className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white text-center">
              100% Free
            </h3>
            <p className="text-center text-gray-400">
              All features are completely free with no hidden costs, credit card
              requirements, or usage limits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function UseCasesSection() {
  return (
    <section id="use-cases" className="w-full py-16 md:py-24 bg-gray-900">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-sm text-white">
              Use Cases
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Perfect for developers and teams
            </h2>
            <p className="max-w-[900px] text-gray-400 text-base sm:text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Discover how LocalExpose can help in various development
              scenarios.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl gap-6 py-12 grid-cols-1 md:grid-cols-2 lg:gap-8">
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Demo to Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Share your work-in-progress with clients without deploying. Give
                them a secure link to view your local development server in
                real-time.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Test Webhooks</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Develop and test webhook integrations locally by providing
                third-party services with a public URL that connects to your
                local server.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">Mobile App Testing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Test your mobile app against your local API by exposing your
                development server to your mobile devices over the internet.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">
                Collaborative Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Share your local development environment with team members for
                real-time collaboration and troubleshooting.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section id="faq" className="w-full py-16 md:py-24 bg-gray-950 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950"></div>
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 px-3 py-1 text-sm text-white">
              FAQ
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-gray-400 text-base sm:text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to common questions about our service.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-3xl gap-6 py-12">
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">
                Is it really 100% free?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Yes, our service is completely free with no hidden costs or
                premium tiers. We offer all features to all users at no charge.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">
                How secure is the connection?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                All connections are secured with SSL encryption. Your traffic
                passes through our servers but is encrypted end-to-end, ensuring
                your data remains secure.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">
                How do I set up my local server?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                After signing up, simply download our application, install it on
                your computer, and log in. Then use our web dashboard to create
                a tunnel by selecting your desired subdomain and the local port
                your server is running on.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">
                Can I use it for production websites?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                While our service is reliable, it&apos;s primarily designed for
                development, testing, and demonstration purposes. For production
                websites, we recommend using dedicated hosting services.
              </p>
            </CardContent>
          </Card>
          <Card className="border-gray-800 bg-gray-950/50 shadow-lg backdrop-blur">
            <CardHeader>
              <CardTitle className="text-white">
                How do you offer this for free?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                We&apos;re able to offer this service for free by keeping our
                infrastructure costs low and operating efficiently. We believe
                in providing valuable tools to developers without barriers.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="w-full py-16 md:py-24 bg-gray-900">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter md:text-4xl/tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
              Ready to expose your local server?
            </h2>
            <p className="max-w-[600px] text-gray-400 text-base sm:text-lg md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Join thousands of developers who are already using LocalExpose to
              share their work with the world.
            </p>
          </div>
          <div className="mx-auto w-full max-w-md space-y-2">
            <Link href="/login" title="Sign In">
              <Button
                variant="outline"
                className="w-3xs mx-auto hover:bg-gray-100 border-0 flex items-center justify-center gap-2 h-11 cursor-pointer text-lg"
              >
                Get Started
              </Button>
            </Link>
            <p className="text-xs text-gray-500 mt-2">
              No credit card required. Start exposing your local servers in
              minutes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
