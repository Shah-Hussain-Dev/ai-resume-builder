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
    <div className="min-h-screen bg-[#0B0F17] text-white font-sans selection:bg-emerald-500 selection:text-slate-950">
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
