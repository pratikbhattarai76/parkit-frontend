import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login({ email, password });
      const from = location.state?.from?.pathname || "/dashboard";
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Failed to login. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4 bg-gray-50/50">
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full max-w-md transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
          <p className="text-sm text-gray-500">Log in to access your Parkit account</p>
        </div>
        
        {error && (
          <div className="bg-red-50/80 backdrop-blur text-red-600 p-4 rounded-xl mb-6 text-sm text-center border border-red-100 animate-in fade-in slide-in-from-top-2">
            {error}
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
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300"
              placeholder="you@example.com"
              required
            />
          </div>
          
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50/50 text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 hover:border-gray-300"
              placeholder="••••••••"
              required
            />
          </div>
          
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
              Forgot your password?
            </Link>
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-indigo-600/20"
          >
            {isLoading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Logging in...
              </span>
            ) : "Log In"}
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
