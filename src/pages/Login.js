import { Formik, Form, Field, ErrorMessage } from "formik";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import loginSchema from "../schema/loginSchema";
import loginUser from "../utils/login-user";
import { Link } from "react-router-dom";
import { auth, googleProvider } from "../firebase/firebase-config";
import { signInWithPopup } from "firebase/auth";
import axios from "axios";


const Login = () => {
  const url = process.env.REACT_APP_BASE_URL;

    const navigate = useNavigate();
      const { mutate, isPending, isError, error, isSuccess, data } = useMutation({
        mutationFn: loginUser,
      });

  const initialValues = {
    email: "", 
    password: "",
  };

  const handleSubmit = (values) => {
    mutate(values, {
        onSuccess: () => {
          navigate('/');
          window.location.reload()
        },
        onError: (error) => {
          console.log(error)
        }
      });
  };

  const handleGoogleLogin = async () => {
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

  return (
    <div className="min-h-screen bg-orange-50 flex justify-center items-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-orange-600 text-center mb-4">
          Login
        </h2>
  
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 mb-4"
        >
          <img
            src="/icons/google.svg"
            alt="Google logo"
            className="h-5 w-5 mr-2"
          />
          Continue with Google
        </button>
  
        <div className="flex items-center justify-center my-4">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="w-full border-gray-300" />
        </div>
  
        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
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
              className="w-full bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-gray-600"
              disabled={isPending}
            >
              {isPending ? "Logging In..." : "Login"}
            </button>
          </Form>
        </Formik>
  
        {isError && <p className="text-red-500 mt-4">{error.response?.data?.message}</p>}
        {isSuccess && <p className="text-green-500 mt-4">{data?.message}</p>}
  
        <p className="mt-4 text-center text-gray-500">
          Don't have an account?
          <Link to="/signup" className="text-orange-600 hover:text-orange-700">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
  
  
};

export default Login;
