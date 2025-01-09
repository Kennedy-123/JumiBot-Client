import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import TrackedProduct from './pages/TrackedProduct';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import PricingPage from './pages/pricing';
import Welcome from './pages/Welcome';
import Footer from './components/Footer';
import checkLoginStatus from "./utils/check-login";

const loginStatus = await checkLoginStatus()

function App() {
  return (
    <Router>
      {loginStatus && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/TrackedProduct" element={<TrackedProduct />} />
        <Route path="/pricing" element={<PricingPage/>} />
        <Route path="/Welcome" element={<Welcome/>} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
