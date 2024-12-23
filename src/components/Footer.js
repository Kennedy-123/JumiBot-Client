import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-6">
      <div className="container mx-auto text-center">
        <p>
          &copy; {new Date().getFullYear()} AutoBot. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
