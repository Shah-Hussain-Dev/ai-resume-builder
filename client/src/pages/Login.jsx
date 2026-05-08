import React from "react";
import { Link } from "react-router-dom";
import API from "../config/api";
import { useDispatch } from "react-redux";
import { login } from "../app/features/authSlice";
import toast from "react-hot-toast";

const Login = () => {
  const [state, setState] = React.useState("login");
  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post(`api/users/${state}`, formData);
      if (data.success && data.data?.token) {
        localStorage.setItem("token", data.data.token);
        toast.success(data.message);
        dispatch(login({ user: data.data?.user, token: data.data.token }));
        window.location.href = "/app";
      }
    } catch (error) {
      console.error("Error:", error);
      const errorMsg = error.response?.data?.message || "Something went wrong";
      if (error.response?.status === 409) {
        toast.error("Email already registered. Please login instead.");
      } else if (error.response?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error(errorMsg);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50 text-gray-900">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-87.5 text-center bg-white border border-gray-200 rounded-2xl px-8 py-10 shadow-xl"
      >
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {state === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="text-gray-500 text-sm mt-2">Please sign in to continue</p>

        {state !== "login" && (
          <div className="flex items-center mt-6 w-full bg-gray-100 ring-2 ring-gray-200 focus-within:ring-green-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="text-gray-400"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <circle cx="12" cy="8" r="5" />{" "}
              <path d="M20 21a8 8 0 0 0-16 0" />{" "}
            </svg>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className="w-full bg-transparent text-gray-900 placeholder-gray-400 border-none outline-none"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}

        <div className="flex items-center w-full mt-4 bg-gray-100 ring-2 ring-gray-200 focus-within:ring-green-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-gray-400" // Updated color
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />{" "}
            <rect x="2" y="4" width="20" height="16" rx="2" />{" "}
          </svg>
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="w-full bg-transparent text-gray-900 placeholder-gray-400 border-none outline-none"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className=" flex items-center mt-4 w-full bg-gray-100 ring-2 ring-gray-200 focus-within:ring-green-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="text-gray-400"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />{" "}
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />{" "}
          </svg>
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full bg-transparent text-gray-900 placeholder-gray-400 border-none outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mt-4 text-left">
          <button className="text-sm text-green-600 hover:underline">
            Forget password?
          </button>
        </div>

        <button
          type="submit"
          className="mt-2 w-full h-11 rounded-full text-white bg-green-600 hover:bg-green-700 transition"
        >
          {state === "login" ? "Login" : "Sign up"}
        </button>

        <p
          onClick={() =>
            setState((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-500 text-sm mt-3  cursor-pointer"
        >
          {state === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="text-green-600 hover:underline ml-1">
            click here
          </span>
        </p>
        <Link to="/">Back to home</Link>
      </form>
      {/* Soft Backdrop*/}
      <div className="fixed inset-0 -z-1 pointer-events-none">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-green-500/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-green-500/20 to-transparent rounded-full blur-2xl" />
      </div>
    </div>
  );
};
export default Login;
