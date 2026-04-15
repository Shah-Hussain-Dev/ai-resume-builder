import { Link } from "react-router-dom";
import { ASSETS } from "../../assets";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-slate-500 bg-white pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
        <div className="sm:col-span-2 lg:col-span-1">
          <div>
            <img src={ASSETS.logo} alt="logo" />
          </div>
          <p className="text-sm/7 mt-6">
            {/* Footer text */}
            AI Resume Builder is a free and open-source UI component library
            with over 340+ beautifully crafted, customizable components built
            with Tailwind CSS.
          </p>
        </div>
        <div className="flex flex-col lg:items-center lg:justify-center">
          <div className="flex flex-col text-sm space-y-2.5">
            <h2 className="font-semibold mb-5 text-gray-800">Company</h2>
            <Link className="hover:text-slate-600 transition" to="#"></Link>
            <Link className="hover:text-slate-600 transition" to="#">
              Careers
            </Link>
            <Link className="hover:text-slate-600 transition" to="#">
              Contact us
            </Link>
            <Link className="hover:text-slate-600 transition" to="#">
              Privacy policy
            </Link>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-gray-800 mb-5">
            Subscribe to our newsletter
          </h2>
          <div className="text-sm space-y-6 max-w-sm">
            <p>
              The latest news, articles, and resources, sent to your inbox
              weekly.
            </p>
            <div className="flex items-center">
              <input
                className="rounded-l-md bg-gray-100 outline-none w-full max-w-64 h-11 px-3"
                type="email"
                placeholder="Enter your email"
              />
              <button className="bg-linear-to-b from-indigo-600 to-indigo-800 cursor-pointer hover:from-indigo-700 hover:to-indigo-900 transition px-4 h-11 text-white rounded-r-md">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-t mt-6 border-slate-200">
        <p className="text-center">
          Copyright 2025 © <Link to="https://prebuiltui.com">PrebuiltUI</Link>{" "}
          All Right Reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
          <Link to="/">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}
