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
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-lg">
            ParcelDelivery
          </Link>
          <Link to="/about" className="text-sm">
            About
          </Link>
          <Link to="/tracking" className="text-sm">
            Track
          </Link>
        </div>
        <div>
          {!user ? (
            <div className="flex gap-2">
              <Link to="/login" className="btn">
                Login
              </Link>
              <Link to="/register" className="btn btn-secondary">
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <span className="text-sm">
                {user.name} ({user.role})
              </span>
              <div className="flex gap-2">
                {user.role === "sender" && (
                  <Link to="/dashboard/sender" className="text-sm">
                    Dashboard
                  </Link>
                )}
                {user.role === "receiver" && (
                  <Link to="/dashboard/receiver" className="text-sm">
                    Dashboard
                  </Link>
                )}
                {user.role === "admin" && (
                  <Link to="/dashboard/admin" className="text-sm">
                    Admin
                  </Link>
                )}
                <button onClick={handleLogout} className="text-sm text-red-500">
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
