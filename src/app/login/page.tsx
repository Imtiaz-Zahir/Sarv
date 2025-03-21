import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GoogleLoginButton from "@/components/google-login-button";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md border-gray-800 bg-gray-900/50 backdrop-blur">
        <CardHeader className="space-y-1 text-center">
          <Image
            src="/icon.png"
            width={36}
            height={36}
            alt="Sarv"
            className="mb-2 mx-auto"
          />
          <CardTitle className="text-3xl font-bold tracking-tight text-white">
            Welcome
          </CardTitle>
          <CardDescription className="text-gray-400">
            Sign in to your account to manage your tunnels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-gray-900 px-2 text-gray-400">
                Continue with
              </span>
            </div>
          </div>
          <GoogleLoginButton />
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <div className="text-center text-sm text-gray-400">
            By signing in, you agree to our{" "}
            <Link
              href="/terms"
              title="Terms of Service"
              className="underline underline-offset-4 hover:text-white"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              title="Privacy Policy"
              className="underline underline-offset-4 hover:text-white"
            >
              Privacy Policy
            </Link>
            .
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
