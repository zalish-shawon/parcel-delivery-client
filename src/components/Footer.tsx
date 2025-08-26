import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <h3 className="text-xl font-bold text-white mb-3">
            Parcel Delivery
          </h3>
          <p className="text-sm">
            Fast, secure and reliable delivery for individuals and businesses.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="hover:text-white transition"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="hover:text-white transition"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/tracking"
                className="hover:text-white transition"
              >
                Track Parcel
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="hover:text-white transition"
              >
                Register
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-3">Contact Us</h4>
          <p className="text-sm">📍 Dhaka, Bangladesh</p>
          <p className="text-sm">📞 +880 123 456 789</p>
          <p className="text-sm">✉️ support@parcel.com</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        © {new Date().getFullYear()} Parcel Delivery. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
