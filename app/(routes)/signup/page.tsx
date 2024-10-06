import { AuthForm } from "@/components/AuthForm";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const Logo = () => (
  <svg
    width="60"
    height="60"
    viewBox="0 0 120 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="120" height="120" rx="20" fill="#8B5CF6" />
    <path d="M30 60H90" stroke="white" strokeWidth="8" strokeLinecap="round" />
    <path
      d="M60 30L60 90"
      stroke="white"
      strokeWidth="8"
      strokeLinecap="round"
    />
    <circle cx="60" cy="60" r="20" stroke="white" strokeWidth="8" />
  </svg>
);

export default function SignupPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-purple-500 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 opacity-10 animate-pulse">
          <Logo />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10 animate-pulse">
          <Logo />
        </div>
      </div>

    
      <Card className="w-full max-w-md relative z-10 bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-xl">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-gray-800">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            Create an account to start managing your tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AuthForm type="signup" />
          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-600 hover:underline font-medium transition duration-150 ease-in-out"
              >
                Log in
              </Link>
            </p>
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700 transition duration-150 ease-in-out"
            >
              Back to Home
            </Link>
          </div>
        </CardContent>
      </Card>

 
      <div className="absolute bottom-4 text-center text-white text-sm">
        © 2024 Task Management Dashboard. All rights reserved.
      </div>
    </div>
  );
}
