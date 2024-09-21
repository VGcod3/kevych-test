"use client";
import { Train, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#" className="flex items-center">
              <Train className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                RailBooker
              </span>
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </Button>
          </div>
          <nav className="hidden md:flex space-x-10">
            <a
              href="#features"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              How It Works
            </a>
            <a
              href="#popular-routes"
              className="text-base font-medium text-gray-500 hover:text-gray-900"
            >
              Popular Routes
            </a>
          </nav>
          <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
            <Button variant="ghost" className="mr-2" asChild>
              <Link href="/login">Log in</Link>
            </Button>
            <Button>Sign up</Button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-0 inset-x-0 transition transform origin-top-right md:hidden">
          <div className="rounded-b-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
            <div className="pt-4 pb-6 px-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Train className="h-8 w-8 text-indigo-600" />
                  <span className="ml-2 text-xl font-bold text-gray-800">
                    RailBooker
                  </span>
                </div>
                <div className="-mr-2">
                  <Button variant="ghost" onClick={() => setIsMenuOpen(false)}>
                    <X className="h-6 w-6" aria-hidden="true" />
                  </Button>
                </div>
              </div>
              <div className="mt-6">
                <nav className="grid gap-y-8">
                  <a
                    href="#features"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Features
                  </a>
                  <a
                    href="#how-it-works"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    How It Works
                  </a>
                  <a
                    href="#popular-routes"
                    className="text-base font-medium text-gray-900 hover:text-gray-700"
                  >
                    Popular Routes
                  </a>
                </nav>
              </div>
            </div>
            <div className="py-6 px-5 space-y-6">
              <div>
                <Button className="w-full">Sign up</Button>
                <p className="mt-6 text-center text-base font-medium text-gray-500">
                  Existing customer?{" "}
                  <a href="#" className="text-indigo-600 hover:text-indigo-500">
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
