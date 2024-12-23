import React from 'react';

const PricingPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex flex-wrap justify-center gap-8 w-full max-w-6xl">
        {/* Starter Plan */}
        <div className="flex-1 min-w-[300px] sm:min-w-[350px] bg-white p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-orange-600">Starter Plan</h2>
          <p className="mt-4 text-xl sm:text-2xl text-gray-700">Perfect for individual users</p>
          <p className="mt-2 text-3xl sm:text-4xl font-semibold">$9.99/month</p>
          <ul className="mt-4 text-left text-gray-600">
            <li>Track up to 5 products</li>
            <li>Basic email alerts</li>
            <li>Access to product history</li>
          </ul>
          <button className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-lg text-lg">Choose Plan</button>
        </div>

        {/* Pro Plan with dark overlay and centered Coming Soon text */}
        <div className="relative flex-1 min-w-[300px] sm:min-w-[350px] bg-gray-800 p-6 rounded-lg shadow-lg text-center text-white flex items-center justify-center">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="z-10">
            <h2 className="text-2xl sm:text-3xl font-bold">Pro Plan</h2>
            <p className="mt-4 text-xl sm:text-2xl">Advanced features for power users</p>
            <p className="mt-2 text-3xl sm:text-4xl font-semibold">$29.99/month</p>
            <ul className="mt-4 text-left">
              <li>Track up to 20 products</li>
              <li>Priority email alerts</li>
              <li>Advanced price history analytics</li>
              <li>API access</li>
            </ul>
            <button className="mt-6 px-6 py-2 bg-orange-600 text-white rounded-lg text-lg">Choose Plan</button>
          </div>
          <div className="absolute text-4xl sm:text-5xl font-bold text-gray-200">
            Coming Soon
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
