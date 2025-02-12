import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader } from "../components/Loader";
import checkSubscriptionStatus from "../utils/check-subscription-status";
import handleBasicPayment from "../utils/handle-basic-payment";
import checkLoginStatus from "../utils/check-login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const subscriptionStatus = await checkSubscriptionStatus();
const loginStatus = await checkLoginStatus();

const cancelSubscription = async () => {
  const controller = new AbortController();
  const url = process.env.REACT_APP_BASE_URL;
  const response = await axios.get(`${url}/cancel-subscription`, {
    signal: controller.signal,
    withCredentials: true,
  });

  window.location.reload();

  return response;
};

const PricingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginStatus) {
      navigate("/welcome");
    }
  }, [navigate]);
  const {
    mutate,
    isPending: subscriptionPending,
    isError: isSubscriptionError,
  } = useMutation({
    mutationFn: handleBasicPayment,
    onSuccess: (data) => {
      const payment_url = data?.payment_url;
      window.location.href = payment_url;
    },
  });

  const {
    data: cancelSubscriptionData,
    isError: isCancelSubscriptionError,
    isSuccess: isCancelSubscriptionSuccess,
    isLoading: isCancelSubscriptionLoading,
    refetch,
  } = useQuery({
    queryFn: cancelSubscription,
    enabled: false, // The query will not run automatically
  });

  const handlePayment = () => {
    mutate(); // Triggers the mutation
  };

  const handleSubscriptionCancellation = () => {
    refetch(); // Triggers the query
  };

  return (
    <div className="min-h-screen text-white px-6 py-12 md:px-16 lg:px-32">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-orange-400">
          Pricing Plans
        </h1>
        <p className="text-gray-300 mt-4 text-sm md:text-base lg:text-lg">
          Choose a plan that best fits your needs. Affordable and transparent
          pricing.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Free Plan */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg flex flex-col text-center">
          <h2 className="text-lg md:text-xl font-bold text-orange-400">Free</h2>
          <p className="text-3xl md:text-4xl font-bold mt-4">₦ 0</p>
          <ul className="mt-6 text-gray-300 space-y-3 text-sm md:text-base">
            <li> ✅ Monthly subscription</li>
            <li> ❌ Lifetime ownership</li>
            <li> ✅ Email notification</li>
            <li> ❌ Checkout functionality</li>
            <li> ✅ Product tracking (2 products)</li>
          </ul>
          <button
            disabled
            className="mt-6 px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-300 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300 flex place-content-center"
          >
            Your Free Plan
          </button>
        </div>

        {/* Basic Plan */}
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 shadow-lg flex flex-col text-center">
          <h2 className="text-lg md:text-xl font-bold text-orange-400">
            Basic
          </h2>
          <p className="text-3xl md:text-4xl font-bold mt-4">₦ 5,000</p>
          <ul className="mt-6 text-gray-300 space-y-3 text-sm md:text-base">
            <li> ✅ Monthly subscription</li>
            <li> ❌ Lifetime ownership</li>
            <li> ✅ Email notification</li>
            <li> ❌ Checkout functionality</li>
            <li> ✅ Product tracking (5 products)</li>
          </ul>
          {!subscriptionStatus ? (
            <button
              onClick={handlePayment}
              disabled={subscriptionPending}
              className="mt-6 px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-300 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300 flex place-content-center"
            >
              {subscriptionPending ? <Loader /> : "Get Basic"}
            </button>
          ) : (
            // cancel subscription button
            <button
              onClick={handleSubscriptionCancellation}
              disabled={isCancelSubscriptionLoading}
              className="mt-6 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-400 transition-all duration-300 disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-300 flex place-content-center"
            >
              {isCancelSubscriptionLoading ? <Loader /> : "Cancel Subscription"}
            </button>
          )}

          <p className="text-red-700">
            {isSubscriptionError || isCancelSubscriptionError
              ? "Try again later"
              : isCancelSubscriptionSuccess && cancelSubscriptionData?.message}
          </p>
        </div>

        {/* Pro Plan with Blur Effect */}
        <div className="relative bg-gray-800 p-6 rounded-lg shadow-md text-center">
          {/* Overlay for Blur Effect */}
          <div className="inset-0 blur-sm bg-gray-800 rounded-lg opacity-50">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4">Pro</h2>
              <p className="text-3xl font-bold text-orange-500 mb-4">
                ₦ 10,000
              </p>
              <ul className="text-gray-300 mb-6 space-y-2">
                <li> ✅ Monthly subscription</li>
                <li> ❌ Lifetime ownership</li>
                <li> ✅ Email notification</li>
                <li> ✅ Checkout functionality</li>
                <li> ✅ Product tracking (10 products)</li>
              </ul>
              <button className="mt-6 px-4 py-2 bg-orange-400 text-black rounded-lg hover:bg-orange-300 transition-all duration-300 w-11/12">
                Get started
              </button>
            </div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center rounded-lg">
            <span className="text-white text-xl font-semibold">
              Coming Soon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
