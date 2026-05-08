import React from "react";
import { Link } from "react-router-dom";
import { ASSETS } from "../../assets";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../app/features/authSlice";
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
    dispatch(logout());
  };
  return (
    <div className="shadow bg-white">
      <nav className=" z-50 w-full bg-white border-b border-gray-200">
        <div className="px-4 py-3 lg:px-6 lg:py-6">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img src={ASSETS.logo} alt="" />
            </Link>
            <div className="flex items-center gap-4">
              <img
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
              <div className="hidden md:flex items-center gap-1">
                <span className="text-sm font-medium text-gray-500">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="bg-white hover:bg-gray-50 text-sm font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 outline-none border border-gray-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
