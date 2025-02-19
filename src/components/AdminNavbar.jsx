"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Menu, X } from "lucide-react"; // Import Menu and X icons

export default function NavbarClient() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white text-gray-900 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo with text */}
          <Link href="/" className="flex items-center space-x-2">
            <MapPin className="h-6 w-6 text-green-600" />
            <span className="font-bold text-2xl text-black">Place2visit Admin</span>
          </Link>

        

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6 text-gray-900" />
            ) : (
              <Menu className="h-6 w-6 text-gray-900" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Items */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
            <Link
              href="/"
              className="block px-3 py-2 hover:bg-green-700 text-gray-900 rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>
        
          </div>
        </div>
      )}
    </nav>
  );
}
