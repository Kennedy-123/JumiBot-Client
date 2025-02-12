import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import checkLoginStatus from "./utils/check-login";

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const TrackedProduct = lazy(() => import("./pages/TrackedProduct"));
const Home = lazy(() => import("./pages/Home"));
const PricingPage = lazy(() => import("./pages/pricing"));
const Welcome = lazy(() => import("./pages/Welcome"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess"));
const Navbar = lazy(() => import("./components/Navbar"));
const Footer = lazy(() => import("./components/Footer"));

const loginStatus = await checkLoginStatus();

function App() {
  return (
    <Router>
      <Suspense>
        {loginStatus && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/TrackedProduct" element={<TrackedProduct />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Routes>
        <Footer />
      </Suspense>
    </Router>
  );
}

export default App;
