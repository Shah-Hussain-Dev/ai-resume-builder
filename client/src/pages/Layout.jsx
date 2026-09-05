import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/dashboard/Navbar";
import { useSelector } from "react-redux";
import Loader from "../components/loader/Loader";
import Login from "./Login";

const Layout = () => {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090D16] text-slate-900 dark:text-white font-sans selection:bg-blue-600 selection:text-white transition-colors duration-300">
      {user ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default Layout;
