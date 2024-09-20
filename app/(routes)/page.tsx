// app/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-black to-purple-500 px-4 sm:px-6 lg:px-8">
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
          className="px-6 py-3 text-lg sm:text-base bg-white text-blue-500 hover:bg-blue-100 transition duration-300 ease-in-out shadow-lg"
        >
          <Link href="/signup">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
