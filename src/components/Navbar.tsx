import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center text-white">
        {/* Logo + Links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="font-extrabold text-xl tracking-wide hover:opacity-90 transition"
          >
            ParcelDelivery
          </Link>
          <Link
            to="/about"
            className="text-sm font-medium hover:text-yellow-300 transition"
          >
            About
          </Link>
          <Link
            to="/tracking"
            className="text-sm font-medium hover:text-yellow-300 transition"
          >
            Track
          </Link>
        </div>

        {/* Auth Buttons */}
        <div>
          {!user ? (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg shadow hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-yellow-400 text-gray-900 font-medium rounded-lg shadow hover:bg-yellow-300 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">
                {user.name}{" "}
                <span className="text-yellow-300">({user.role})</span>
              </span>

              <div className="flex gap-3">
                {user.role === "sender" && (
                  <Link
                    to="/dashboard/sender"
                    className="px-3 py-1.5 text-sm bg-white/20 rounded-lg hover:bg-white/30 transition"
                  >
                    Dashboard
                  </Link>
                )}
                {user.role === "receiver" && (
                  <Link
                    to="/dashboard/receiver"
                    className="px-3 py-1.5 text-sm bg-white/20 rounded-lg hover:bg-white/30 transition"
                  >
                    Dashboard
                  </Link>
                )}
                {user.role === "admin" && (
                  <Link
                    to="/dashboard/admin"
                    className="px-3 py-1.5 text-sm bg-white/20 rounded-lg hover:bg-white/30 transition"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 text-sm bg-red-500 rounded-lg hover:bg-red-600 transition"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
