import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => (
  <div className="flex items-center justify-center min-h-[80vh] px-4">
    <div className="text-center max-w-xl">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-gray-800">
        📦 Parcel Delivery Service
      </h1>
      <p className="mb-8 text-gray-600 text-base sm:text-lg">
        Fast, reliable parcel delivery for businesses and individuals.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          to="/register"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-base"
        >
          Get Started
        </Link>
        <Link
          to="/tracking"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition text-base"
        >
          Track Parcel
        </Link>
      </div>
    </div>
  </div>
);

export default Home;
