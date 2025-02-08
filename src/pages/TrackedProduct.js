import React, { useState, useEffect } from 'react';
import { Loader } from "../components/Loader";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import getTrackedProducts from '../utils/get-tracked-product';
import untrackProduct from '../utils/untrack-product';
import checkLoginStatus from "../utils/check-login";
import { useNavigate } from 'react-router-dom';

const loginStatus = await checkLoginStatus();
const TrackedProduct = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginStatus) {
      navigate("/welcome");
    }
  }, [navigate]);
  const queryClient = useQueryClient();
  const [deletingTodoId, setDeletingTodoId] = useState(null); // Track which product is being deleted

  // Fetching tracked products
  const { data: trackedProducts, isLoading, error: trackProductError, isError } = useQuery({
    queryKey: ['product'], // Query key
    queryFn: getTrackedProducts, // Fetching function
  });

  // Mutation for untracking a product
  const { mutate, error: deleteError, isError: isDeleteError} = useMutation({
    mutationFn: untrackProduct,
    onMutate: async (productName) => {
      setDeletingTodoId(productName); // Track the product being deleted
      
      // Optimistically update the cache
      await queryClient.cancelQueries(['product']); // Cancel any ongoing refetch
      const previousProducts = queryClient.getQueryData(['product']); // Get the current cache

      queryClient.setQueryData(['product'], (oldProducts) =>
        oldProducts.filter((product) => product.product_name !== productName)
      );

      return { previousProducts }; // Return context in case rollback is needed
    },
    onError: (error, productName, context) => {
      // Rollback to the previous state if the mutation fails
      queryClient.setQueryData(['product'], context.previousProducts);
    },
    onSettled: () => {
      setDeletingTodoId(null); // Reset the deletingTodoId
    },
  });

  const handleDelete = (productName) => {
    mutate(productName);
  };

  return (
    <div className="min-h-screen text-white py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold">Tracked Products</h1>
        <p className="text-gray-600 mt-2">
          View and manage the products you're tracking.
        </p>
        {isDeleteError && <h1 className='text-red-500'>{deleteError.response?.data?.error}</h1>}
      </div>

      <div className="max-w-5xl mx-auto px-4 flex flex-col justify-center items-center">
        {isLoading ? (
          <Loader />
        ) : trackedProducts?.length === 0 ? (
          <h1 className="text-orange-500">No product is being tracked</h1>
        ) : isError ? (
          <h1 className="text-red-500">{trackProductError?.response?.data?.error}</h1>
        ) : (
          <ul className="space-y-4">
            {trackedProducts?.map((trackedProduct, i) => (
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
                    <a href={trackedProduct.product_url} className="text-lg font-semibold hover:text-orange-500">{trackedProduct.product_name}</a>
                    <p className="text-sm text-gray-400">
                      Current Price: <span
                        className="text-orange-500 font-bold">{`₦ ${trackedProduct.current_price.toLocaleString()}`}</span>
                    </p>
                  </div>
                </div>
                <button
                  className="mt-4 ml-7 sm:mt-0 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow-lg"
                  disabled={deletingTodoId === trackedProduct.product_name}
                  onClick={() => handleDelete(trackedProduct.product_name)}
                >
                  {deletingTodoId === trackedProduct.product_name ? <Loader /> : 'Untrack'}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TrackedProduct;
