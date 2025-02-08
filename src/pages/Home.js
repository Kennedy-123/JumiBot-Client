import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import checkLoginStatus from "../utils/check-login";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import HowToUse from "../components/HowToUse";

const loginStatus = await checkLoginStatus();
const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!loginStatus) {
      navigate("/welcome");
    }
  }, [navigate]);

  const trackProduct = async (productUrl) => {
    const controller = new AbortController();
    const url = process.env.REACT_APP_BASE_URL;

    const response = await axios.post(`${url}/track`, productUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
      withCredentials: true,
    });

    return response.data;
  };

  const { mutate, isPending, isError, isSuccess, error, data } = useMutation({
    mutationFn: trackProduct,
  });

  const initialValues = {
    productUrl: "",
  };

  // Regex for validating Jumia product URLs
  const jumiaUrlRegex = /^https?:\/\/(www\.)?jumia\.com\.\w{2,3}(\/.*)?$/;

  const validationSchema = Yup.object({
    productUrl: Yup.string()
      .url("Enter a valid URL")
      .required("Product URL is required")
      .matches(jumiaUrlRegex, "Please enter a valid Jumia product URL"),
  });

  const handleSubmit = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        if (data.redirect) {
          navigate(data.redirect);
        } else {
          navigate("/TrackedProduct");
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-orange-50">
      <div className="flex flex-col items-center justify-center py-16">
        <h1 className="text-4xl font-bold text-orange-600 mb-8">
          Welcome to JumiBot
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h2 className="text-2xl font-semibold text-orange-500 text-center mb-4">
            Track Your Favorite Products
          </h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <div className="mb-4 relative">
                  <label
                    htmlFor="productUrl"
                    className="block text-gray-700 font-medium"
                  >
                    Enter Product URL
                  </label>
                  <div className="relative">
                    <Field
                      type="url"
                      id="productUrl"
                      name="productUrl"
                      placeholder="https://www.jumia.com.ng/apple-iphone-13-pro-max-6.7-256gb-rom-6gb-ram-ios-15-5g-252693062.html"
                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                    />
                    {values.productUrl && (
                      <button
                        type="button"
                        onClick={() => setFieldValue("productUrl", "")}
                        className="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        &times;
                      </button>
                    )}
                  </div>
                  <ErrorMessage
                    name="productUrl"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-600"
                  disabled={isPending}
                >
                  {isPending ? "Tracking..." : "Track Product"}
                </button>
              </Form>
            )}
          </Formik>

          {isError && (
            <p className="text-red-500 mt-4">{error?.response?.data?.error}</p>
          )}
          {isSuccess && <p className="text-green-500 mt-4">{data?.message}</p>}
        </div>
      </div>

      {/* HowToUse Section */}
      <HowToUse />
    </div>
  );
};

export default HomePage;
