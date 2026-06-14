import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion"; // Consistent with your homepage
import { FaLock } from "react-icons/fa";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "https://afckiambaa-as5f.onrender.com/api/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      setMessage("Login successful. Redirecting...");
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 1500);
    } catch (err) {
      if (err.response?.data?.message) {
        setMessage(err.response.data.message);
      } else {
        setMessage("Something went wrong. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 flex items-center justify-center px-6 font-sans antialiased">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        {/* Header Style from Homepage */}
        <div className="text-center mb-12">
          <span className="text-[10px] font-bold text-red-700 uppercase tracking-[0.5em] block mb-4">
            Secure Portal
          </span>
          <h2 className="text-4xl font-black tracking-tighter text-zinc-900 uppercase">
            AFC KIAMBAA <br />
            <span className="italic font-serif text-red-800 normal-case">Admin Login</span>
          </h2>
        </div>

        <div className="bg-zinc-300 p-1 border-t-8 border-red-700 shadow-2xl">
          <form onSubmit={handleSubmit} className="bg-gray-200 p-8 md:p-12 space-y-8">
            
            {/* Email Input */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-zinc-900 mb-2">
                Admin Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="email@afckiambaa.org"
                className="w-full bg-transparent border-b-2 border-zinc-400 py-3 px-2 focus:border-red-700 outline-none transition-colors text-zinc-900 placeholder:text-zinc-100 font-medium"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-zinc-900 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full bg-transparent border-b-2 border-zinc-400 py-3 px-2 focus:border-red-700 outline-none transition-colors text-zinc-900 placeholder:text-zinc-100 font-medium"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-5 bg-zinc-900 text-white text-xs font-bold uppercase tracking-[0.3em] hover:bg-red-700 transition-all duration-500 disabled:bg-zinc-500 flex items-center justify-center gap-3 shadow-lg"
            >
              {loading ? (
                "Authenticating..."
              ) : (
                <>
                  <FaLock className="text-[10px]" /> Access Dashboard
                </>
              )}
            </button>

            {/* Feedback Message */}
            {message && (
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`text-center text-xs font-bold uppercase tracking-widest py-3 ${
                  message.includes("successful") ? "text-green-700" : "text-red-700"
                }`}
              >
                {message}
              </motion.p>
            )}
          </form>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-[10px] font-bold text-zinc-500 hover:text-red-700 uppercase tracking-widest transition-colors">
            ← Return to Public Site
          </a>
        </div>
      </motion.div>
    </div>
  );
}