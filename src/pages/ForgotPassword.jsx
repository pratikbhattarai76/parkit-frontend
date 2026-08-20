import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function ForgotPassword() {
  const { resetPassword } = useAuth();
  
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      // In a real app, this sends a reset email
      await resetPassword({ email });
      setStatus("success");
      setMessage("Password reset instructions have been sent to your email.");
    } catch (err) {
      setStatus("error");
      setMessage(err.message || "Failed to request password reset. Please try again.");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50/50">
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full max-w-md transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h2>
          <p className="text-sm text-gray-500">Enter your email to receive reset instructions</p>
        </div>
        
        {status === "error" && (
          <div className="bg-red-50/80 backdrop-blur text-red-600 p-4 rounded-xl mb-6 text-sm text-center border border-red-100 animate-in fade-in slide-in-from-top-2">
            {message}
          </div>
        )}
        
        {status === "success" && (
          <div className="bg-green-50/80 backdrop-blur text-green-700 p-4 rounded-xl mb-6 text-sm text-center border border-green-100 animate-in fade-in slide-in-from-top-2">
            {message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700" htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
              placeholder="you@example.com"
              required
              disabled={status === "success"}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={status === "loading" || status === "success"}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20 disabled:transform-none"
          >
            {status === "loading" ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </span>
            ) : "Send Reset Link"}
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-500">
          Remember your password?{" "}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
