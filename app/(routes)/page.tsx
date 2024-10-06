import Link from "next/link";
import { Button } from "@/components/ui/button";

const Logo = () => (
  <svg
    width="120"
    height="120"
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

export default function Home() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-purple-500 px-4 sm:px-6 lg:px-8 overflow-hidden">
    
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 opacity-10 animate-pulse">
          <Logo />
        </div>
        <div className="absolute bottom-10 right-10 opacity-10 animate-pulse">
          <Logo />
        </div>
      </div>

   
      <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
        <div className="mb-8 animate-bounce">
          <Logo />
        </div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 sm:mb-8 drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)] text-center">
          Task Management Dashboard
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-white mb-10 sm:mb-12 max-w-2xl text-center drop-shadow-[0_3px_5px_rgba(0,0,0,0.4)]">
          Organize your tasks efficiently with our Kanban board and list view
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <Button
            asChild
            className="px-6 py-3 text-lg sm:text-base bg-white text-blue-500 hover:bg-blue-100 transition duration-300 ease-in-out shadow-lg"
          >
            <Link href="/login">Log In</Link>
          </Button>
          <Button
            asChild
            className="px-6 py-3 text-lg sm:text-base bg-purple-600 text-white hover:bg-purple-700 transition duration-300 ease-in-out shadow-lg"
          >
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </div>


      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {[
          { title: "Kanban Board", icon: "📊" },
          { title: "List View", icon: "📝" },
          { title: "Task Analytics", icon: "📈" },
        ].map((feature, index) => (
          <div
            key={index}
            className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-6 text-center transform hover:scale-105 transition duration-300 ease-in-out"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-200">
              Efficiently manage your tasks with our powerful features.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
