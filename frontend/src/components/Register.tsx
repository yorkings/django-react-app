import { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import api from "../lib/api";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const { username, first_name, last_name, email, password } = Object.fromEntries(formData);
    
    try {
      const res = await api.post("/api/user/register/", { username,first_name,last_name, email,password});
      toast.success("Successfully created an account");
      navigate("/login");
    } catch (error) {
      toast.error("Error creating account. Please check the fields.");
    } finally {
      setLoading(false);
    }
    console.log(import.meta.env.VITE_API_URL); // Should print your API URL

  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="flex flex-col items-center justify-center text-cyan-500 bg-[rgba(17,25,40,0.75)] backdrop-blur-xl backdrop-saturate-[180%] min-h-[40vh] min-w-[80vw] md:min-w-[30vw] lg:min-w-[25vw] p-8 border-none rounded-lg shadow-lg gap-6 transition-transform transform hover:translate-x-2 hover:translate-y-2">
        <h2 className="text-2xl font-bold text-center text-white">Register</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full px-4 py-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <input
            type="text"
            name="first_name"
            placeholder="First Name"
            className="w-full px-4 py-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last Name"
            className="w-full px-4 py-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full px-4 py-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
            required
          />
          <button
            className="text-white rounded-lg cursor-pointer bg-sky-600 p-3 w-full transition-all duration-200 transform hover:bg-sky-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
