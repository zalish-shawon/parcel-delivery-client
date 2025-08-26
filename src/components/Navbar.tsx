import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logout } from "../store/slices/authSlice";
import { Menu, X } from "lucide-react"; 

const Navbar: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((s) => s.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center text-white">
        {/* Logo */}
        <Link
          to="/"
          className="font-extrabold text-xl tracking-wide hover:opacity-90 transition"
        >
          ParcelDelivery
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-6 items-center">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-blue-700 px-6 py-4 space-y-4 text-white">
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block">
            About
          </Link>
          <Link
            to="/tracking"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Track
          </Link>

          {!user ? (
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 bg-white text-blue-600 font-medium rounded-lg shadow hover:bg-gray-100 transition text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2 bg-yellow-400 text-gray-900 font-medium rounded-lg shadow hover:bg-yellow-300 transition text-center"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-sm font-medium">
                {user.name}{" "}
                <span className="text-yellow-300">({user.role})</span>
              </span>
              {user.role === "sender" && (
                <Link
                  to="/dashboard/sender"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded bg-white/20 hover:bg-white/30"
                >
                  Dashboard
                </Link>
              )}
              {user.role === "receiver" && (
                <Link
                  to="/dashboard/receiver"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded bg-white/20 hover:bg-white/30"
                >
                  Dashboard
                </Link>
              )}
              {user.role === "admin" && (
                <Link
                  to="/dashboard/admin"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 rounded bg-white/20 hover:bg-white/30"
                >
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="block px-3 py-2 rounded bg-red-500 hover:bg-red-600 text-left"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
