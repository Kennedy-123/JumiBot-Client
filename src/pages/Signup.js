import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import checkLoginStatus from "../utils/check-login";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase/firebase-config";
checkLoginStatus();

const url = process.env.REACT_APP_BASE_URL;

const registerUser = async (registerInput) => {
  const controller = new AbortController();

  const response = await axios.post(
    `${url}/register-user`,
    registerInput,
    {
      headers: {
        "Content-Type": "application/json",
      },
      signal: controller.signal,
    }
  );
  
  return response.data;
};


const SignUp = () => {
  const navigate = useNavigate();
  const { mutate, isPending, isError, error, isSuccess, data } = useMutation({
    mutationFn: registerUser,
  });
  
  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };
  
  
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
    password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  });
  
  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider)
  
      await axios.post(
      `${url}/register-user`,
      {
        'email': auth?.currentUser?.email,
        "isGoogleAuth": true
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      }
    );
    navigate('/')
    window.location.reload()
    } catch (error) {
      console.error(error)
    }
  };

  const handleSubmit = (values) => {
    mutate(values, {
      onSuccess: (data) => {
        navigate("/login");
      }
    });
  };


  return (
    <div className="min-h-screen bg-orange-50 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-4">
          Sign Up
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <ErrorMessage
                name="username"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
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
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="block text-gray-700">
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {isError && (
              <p className="text-red-500 mt-4">{error.response?.data?.errors}</p>
            )}
            {isSuccess && <p className="text-green-500 mt-4">{data?.message}</p>}

            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 mb-4 disabled:cursor-not-allowed disabled:bg-gray-600"
              disabled={isPending}
            >
              {isPending ? "Signing Up..." : "Sign Up"}
            </button>
            

            <p className="mt-4 text-center text-gray-500">
              Already have an account?
              <Link to="/login" className="text-orange-600 hover:text-orange-700">
                Login
              </Link>
            </p>
            
          </Form>
        </Formik>
  
        {/* OR Separator */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-500 font-semibold">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>
  
        <button
          onClick={handleGoogleSignUp}
          className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          <img
            src="/icons/google.svg"
            alt="Google logo"
            className="h-5 w-5 mr-2"
          />
          Sign up with Google
        </button>
      </div>
    </div>
  );
  
};

export default SignUp;