"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/AuthProvider";
import { Menu, X } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-20 p-2 bg-white rounded-md shadow-md"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <nav
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 fixed lg:static inset-y-0 left-0 w-64 bg-white p-4 shadow-md transition-transform duration-300 ease-in-out z-10`}
      >
        <br />
        <h1 className="text-2xl font-bold mb-6 mt-10 lg:mt-0">
          Task Dashboard
        </h1>
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className="block py-2 px-4 rounded hover:bg-gray-200"
              onClick={() => setIsSidebarOpen(false)}
            >
              Overview
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/list"
              className="block py-2 px-4 rounded hover:bg-gray-200"
              onClick={() => setIsSidebarOpen(false)}
            >
              List View
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/kanban"
              className="block py-2 px-4 rounded hover:bg-gray-200"
              onClick={() => setIsSidebarOpen(false)}
            >
              Kanban Board
            </Link>
          </li>
        </ul>
        <Button onClick={logout} className="mt-4 w-full">
          Logout
        </Button>
      </nav>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto ">{children}</main>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-5 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
}
