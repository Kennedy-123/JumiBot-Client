import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Function to verify the payment
const verifyPayment = async ({ queryKey }) => {
  const url = process.env.REACT_APP_BASE_URL;
  const reference = queryKey[1]; // The first element in queryKey is not needed, the second is the reference
  const response = await axios.get(`${url}/callback?reference=${reference}`, {withCredentials: true});
  return response.data;
};

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate()

  // Extract the 'reference' from the URL query parameters
  const params = new URLSearchParams(location.search);
  const reference = params.get("reference");

  // Use React Query to verify the payment
  const { data, isLoading, isError } = useQuery({
    queryKey: ['verifyPayment', reference], // Pass reference as part of the query key
    queryFn: verifyPayment,
    enabled: !!reference, // Only run the query if there's a reference
});

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-orange-50">
      {isLoading && (
        <div className="text-center text-lg text-gray-700">
          Verifying your payment...
        </div>
      )}
      {isError && (
        <div className="text-center text-lg text-red-600">
          Something went wrong. Payment verification failed.
        </div>
      )}
      {data && !isError && (
        <div className="max-w-md mx-auto text-center bg-white p-6 rounded-xl shadow-lg">
          <h1 className="text-3xl font-semibold text-green-600">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-800 mt-2">
            Thank you for your subscription!
          </p>
          <div className="mt-4 text-sm text-gray-600">
            <p>
              Payment reference: <strong>{data.reference}</strong>
            </p>
            <p>
              Amount: <strong>{data.amount.toLocaleString()} NGN</strong>
            </p>
            <p className="mt-4">Your subscription is now active.</p>
          </div>
          <Link
          onClick={() => {
            navigate('/')
            window.location.reload()
          }}
            className="mt-7 inline-block text-white bg-orange-500 hover:bg-orange-600 py-2 px-4 rounded-full"
          >
            Go Back to Home
          </Link>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccess;
