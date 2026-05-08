import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import ResumeBuilder from "./pages/ResumeBuilder";
import Preview from "./pages/Preview";
import { useDispatch } from "react-redux";
import API from "./config/api";
import { login, setLoading } from "./app/features/authSlice";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const App = () => {
  const dispatch = useDispatch();
  const getUserData = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { data } = await API.get("api/users/data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (data?.data) {
          dispatch(login({ user: data.data, token }));
        }
        dispatch(setLoading(false));
      } catch (error) {
        console.error("Error fetching user data:", error);
        localStorage.removeItem("token");
        dispatch(setLoading(false));
      }
    } else {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    getUserData();
  }, [])

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="view/:resumeId" element={<Preview />} />
        <Route path="app" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
