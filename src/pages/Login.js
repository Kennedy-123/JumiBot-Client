import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const loginUser = async (loginInput) => {
    const controller = new AbortController();
    const url =  process.env.REACT_APP_BASE_URL
  
    const response = await axios.post(
      `${url}/login-user`,
      loginInput,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      }
    );
  
    return response.data;
  };

const Login = () => {
    const navigate = useNavigate();
      const { mutate, isPending, isError, error, isSuccess, data } = useMutation({
        mutationFn: loginUser,
      });

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    console.log("Login Form Data:", values);
    mutate(values, {
        onSuccess: (data) => {
          navigate('/');
          console.log(data);
        },
        onError: (error) => {
          console.log(error.response.data.errors);
          console.error('Error during registration:', error);
        },
      });
  };

  return (
    <div className="min-h-screen bg-orange-50 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-4">
          Login
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700"
            >
              {isPending ? "Logging In..." : "Login"}
            </button>
          </Form>
        </Formik>

        {isError && <p className="text-red-500 mt-4">{error.response?.data?.errors}</p>}
        {isSuccess && <p className="text-green-500 mt-4">{data?.message}</p>}
      </div>
    </div>
  );
};

export default Login;
