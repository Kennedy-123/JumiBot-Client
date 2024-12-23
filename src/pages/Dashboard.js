// src/pages/Dashboard.js

import React from "react";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <h1 className="text-4xl font-bold text-orange-600 mb-6">Welcome to Your Dashboard</h1>
      <p className="text-xl text-gray-700 mb-8">
        Manage your tracked products, view price changes, and more!
      </p>
      {/* Additional content for the dashboard */}
      <div className="w-full max-w-4xl p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-orange-600 mb-4">Your Products</h2>
        <ul>
          {/* Example list of tracked products */}
          <li className="border-b py-4">Product 1 - $100</li>
          <li className="border-b py-4">Product 2 - $200</li>
          <li className="border-b py-4">Product 3 - $150</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
