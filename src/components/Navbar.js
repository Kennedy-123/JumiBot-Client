import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import checkLoginStatus from "../utils/check-login";
import logo from "../image/logo.png";

const loginStatus = await checkLoginStatus();

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const logout = async () => {
    const url = process.env.REACT_APP_BASE_URL;
    try {
      const res = await axios.get(`${url}/logout-user`, {
        withCredentials: true,
      });
      console.log(res.data);
      if (res.status === 200) {
        navigate("/welcome");
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  return (
    <nav className="bg-orange-600 shadow-lg">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          {/* Mobile Menu Button */}
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden z-20">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`block h-6 w-6 transition-transform transform ${
                  isMenuOpen ? "rotate-90" : "rotate-0"
                }`}
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
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Brand Name */}
          <div className="flex items-center justify-center sm:items-stretch sm:justify-start z-20">
            <Link
              to="/"
              className="text-white text-2xl hover:text-gray-400 font-semibold"
            >
              <img src={logo} alt="JumiBot" className="h-24 w-auto filter invert brightness-0 saturate-0" />
            </Link>
          </div>

          {/* Navbar Links */}
          <div className="hidden sm:flex sm:ml-auto space-x-4">
            <Link
              to="/"
              className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-lg font-medium transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/TrackedProduct"
              className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-lg font-medium transition duration-200"
            >
              TrackedProduct
            </Link>
            <Link
              to="/pricing"
              className="text-white hover:text-gray-400 px-3 py-2 rounded-md text-lg font-medium transition duration-200"
            >
              Pricing
            </Link>
            {loginStatus && (
              <button
                className="bg-gray-800 text-white hover:bg-slate-600 px-4 font-medium rounded-xl py-1"
                onClick={logout}
              >
                Logout
              </button>
            )}
            {!loginStatus && (
              <button
                className="bg-gray-800 text-white hover:bg-slate-600 px-4 font-medium rounded-xl py-1"
                onClick={() => navigate("/login")}
              >
                LogIn
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } sm:hidden bg-orange-600 w-full absolute top-16 transition duration-300 ease-in-out z-10`}
      >
        <div className="flex flex-col items-center p-4">
          <Link
            to="/"
            className="text-white block px-3 py-2 rounded-md text-lg font-medium transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/TrackedProduct"
            className="text-white block px-3 py-2 rounded-md text-lg font-medium transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            TrackedProduct
          </Link>
          <Link
            to="/pricing"
            className="text-white block px-3 py-2 rounded-md text-lg font-medium transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          {loginStatus && (
            <button
              className="bg-gray-800 text-white w-24 hover:bg-slate-600 px-2 font-medium rounded-xl py-1 mt-2"
              onClick={logout}
            >
              Logout
            </button>
          )}
          {!loginStatus && (
            <button
              className="bg-gray-800 text-white w-24 hover:bg-slate-600 px-2 font-medium rounded-xl py-1 mt-2"
              onClick={() => navigate("/login")}
            >
              LogIn
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
