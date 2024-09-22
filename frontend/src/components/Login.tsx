import { useState } from "react";
import { toast } from "react-toastify";
import api from "../lib/api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../lib/constants";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    setloading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, password } = Object.fromEntries(formData);
    try {
      const res = await api.post("/api/token/", { username, password });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/");
      toast.success("Sign in successfully!");
    } catch (error) {
      toast.error(error);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="flex flex-col items-center justify-center text-cyan-500 bg-[rgba(17,25,40,0.75)] backdrop-blur-lg backdrop-saturate-[180%] min-h-[40vh] min-w-[80vw] md:min-w-[30vw] lg:min-w-[25vw] p-8 border-none rounded-lg shadow-lg gap-6 transition-transform transform hover:scale-105">
        <h2 className="text-2xl font-bold text-center text-white">Sign In</h2>
        <form
          action=""
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 w-full"
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            className="text-white rounded-lg cursor-pointer bg-sky-600 p-3 w-full transition-all duration-200 transform hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign In"}
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-400">
          Don't have an account?{" "}
          <Link to='/register'>sign-up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
