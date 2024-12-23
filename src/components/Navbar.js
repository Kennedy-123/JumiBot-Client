import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="bg-orange-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden z-10">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Brand Name */}
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start z-20">
            <Link to="/" className="text-white text-2xl font-semibold">
              JumiBot
            </Link>
          </div>

          {/* Navbar Links */}
          <div className="hidden sm:flex sm:ml-auto space-x-6">
            <Link
              to="/"
              className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/dashboard"
              className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium transition duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/pricing"
              className="text-white hover:text-gray-200 px-3 py-2 rounded-md text-lg font-medium transition duration-200"
            >
              Pricing
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:hidden bg-orange-600 w-full absolute top-16 right-0 z-10`}
      >
        <div className="px-4 pt-4 pb-4 space-y-2">
          <Link
            to="/"
            className="text-white block px-3 py-2 rounded-md text-lg font-medium transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/dashboard"
            className="text-white block px-3 py-2 rounded-md text-lg font-medium transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/pricing"
            className="text-white block px-3 py-2 rounded-md text-lg font-medium transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
