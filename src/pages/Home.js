import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const HomePage = () => {
  const initialValues = {
    productUrl: "",
  };

  const validationSchema = Yup.object({
    productUrl: Yup.string()
      .url("Enter a valid URL")
      .required("Product URL is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Home Page Form Data:", values);
    resetForm(); // Clear the form after submission
  };

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-orange-600 mb-8">Welcome to JumiBot</h1>
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-orange-500 text-center mb-4">
          Track Your Favorite Products
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label
                htmlFor="productUrl"
                className="block text-gray-700 font-medium"
              >
                Enter Product URL
              </label>
              <Field
                type="url"
                id="productUrl"
                name="productUrl"
                placeholder="https://example.com/product"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <ErrorMessage
                name="productUrl"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700"
            >
              Track Product
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default HomePage;
