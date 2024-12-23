import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="flex-1 flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Track Prices Easily with JumiBot</h1>
        <p className="text-lg mb-6">Never miss a price drop again. Automate price tracking effortlessly.</p>
        <div className="space-x-4">
          <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Get Started
          </Link>
          <Link to="/login" className="bg-gray-200 px-6 py-2 rounded-md hover:bg-gray-300">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
