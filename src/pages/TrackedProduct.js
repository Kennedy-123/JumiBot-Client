import React from 'react';
import {Loader} from "../components/Loader";
import { useQuery } from '@tanstack/react-query';
import getTrackedProducts from '../utils/get-tracked-product';

const TrackedProduct = () => {
  const { data, isLoading} = useQuery({
    queryKey: ['product'], // Pass the query key as a property
    queryFn: getTrackedProducts, // Pass the query function as a property
  });
  
  const trackedProducts = data

  return (
      <div className="min-h-screen text-white py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">Tracked Products</h1>
          <p className="text-gray-300 mt-2">
            View and manage the products you're tracking.
          </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 flex flex-col justify-center items-center">
          {isLoading ? (
              <Loader/>
          ) : trackedProducts.length === 0 ? (
              <h1 className="text-orange-500">No product is being tracked</h1>
          ) : (
              <ul className="space-y-4">
                {trackedProducts.map((trackedProduct, i) => {
                  return (
                      <li
                          key={i}
                          className="flex flex-col sm:flex-row items-center justify-between bg-gray-800 p-6 rounded-lg shadow-md"
                      >
                        <div className="flex items-center space-x-4">
                          <img
                              src={trackedProduct.product_image_src}
                              alt={trackedProduct.product_name}
                              className="w-16 h-16 object-cover rounded-lg shadow-md"
                          />
                          <div>
                            <h2 className="text-lg font-semibold">{trackedProduct.name}</h2>
                            <p className="text-sm text-gray-400">
                              Current Price: <span
                                className="text-orange-500 font-bold">{`₦ ${trackedProduct.current_price.toLocaleString()}`}</span>
                            </p>
                          </div>
                        </div>
                        <button
                            className="mt-4 ml-7 sm:mt-0 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-lg">
                          Untrack
                        </button>
                        <a href={trackedProduct.product_url}>
                          <button
                              className="mt-4 ml-5 sm:mt-0 bg-blue-300 hover:bg-blue-400 text-white py-2 px-4 rounded-lg shadow-lg">
                            View
                          </button>
                        </a>
                      </li>
                  );
                })}
              </ul>
          )}
        </div>
      </div>
  );
};

export default TrackedProduct