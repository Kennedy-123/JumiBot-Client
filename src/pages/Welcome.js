import React, {useEffect} from "react";
import { useNavigate } from "react-router-dom";
import checkLoginStatus from "../utils/check-login";

const loginStatus = await checkLoginStatus()

const Welcome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if(loginStatus) {
      navigate('/')
    }
  }, [navigate])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-16 px-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white">
        <h1 className="text-5xl font-bold mb-6">
          Welcome to JumiBot
        </h1>
        <p className="text-xl mb-8 max-w-3xl">
          Track prices for your favorite Jumia products and get notified when
          there’s a price drop. Save money and shop smarter with JumiBot!
        </p>
        <div className="flex space-x-4">
          <a
            href="/signup"
            className="py-3 px-6 bg-orange-700 hover:bg-orange-800 text-white font-medium rounded-lg"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="py-3 px-6 bg-transparent border-2 border-white text-white font-medium rounded-lg hover:bg-white hover:text-orange-600"
          >
            Log In
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="text-center max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-orange-600 mb-8">
            Why JumiBot?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 bg-white border rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-orange-600 mb-4">
                Track Prices
              </h3>
              <p className="text-gray-700">
                Monitor the prices of products you love and receive instant
                alerts when there’s a price drop.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="p-6 bg-white border rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-orange-600 mb-4">
                Instant Alerts
              </h3>
              <p className="text-gray-700">
                Get email notifications the moment your tracked products go on
                sale. Never miss a deal!
              </p>
            </div>
            {/* Feature 3 */}
            <div className="p-6 bg-white border rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-orange-600 mb-4">
                Easy to Use
              </h3>
              <p className="text-gray-700">
                Our simple interface allows you to easily add products and track
                prices with minimal effort.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-gray-100 text-center">
        <h2 className="text-3xl font-semibold text-orange-600 mb-6">
          Start Saving Today
        </h2>
        <p className="text-lg text-gray-700 mb-8">
          Ready to track prices and save money on Jumia? Join now and start
          using JumiBot to get instant alerts!
        </p>
        <a
          href="/signup"
          className="py-3 px-6 bg-orange-600 text-white font-medium rounded-lg hover:bg-orange-700"
        >
          Sign Up Now
        </a>
      </section>
    </div>
  );
};

export default Welcome;
