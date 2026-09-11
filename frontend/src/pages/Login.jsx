import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-1.png";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden px-4 py-8 sm:px-6">
   
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[#dceaf2]" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[#ffe6e2]" />
 
      <div className="relative z-10 flex w-full max-w-105 flex-col items-center">
 
        <div className="mb-5 sm:mb-6">
          <img
            src={logo}
            alt="DEEM"
            className="h-auto w-40 sm:w-44"
          />
        </div>
 
        <div className="mb-7 text-center sm:mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-[#10243f] sm:text-4xl">
            Welcome Back
          </h1>

          <p className="mt-2 text-sm text-[#667892] sm:text-base">
            Login to continue to DEEM Portal
          </p>
        </div>
 
        <div className="w-full rounded-2xl bg-white p-6 shadow-[0_12px_35px_rgba(20,70,103,0.10)] sm:rounded-3xl sm:p-8">
          <form onSubmit={handleSubmit}>
         
            <div>
              <label className="sr-only" htmlFor="email">
                Email ID
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  strokeWidth={1.8}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71839a]"
                />

                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email ID"
                  className="h-12 w-full rounded-lg border border-[#dce4eb] bg-white pl-11 pr-4 text-sm text-[#10243f] outline-none transition placeholder:text-[#8a99ab] focus:border-deem-red focus:ring-2 focus:ring-[#eb5141]/10 sm:h-13 sm:rounded-xl"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="sr-only" htmlFor="password">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={19}
                  strokeWidth={1.8}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71839a]"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className="h-12 w-full rounded-lg border border-[#dce4eb] bg-white pl-11 pr-12 text-sm text-[#10243f] outline-none transition placeholder:text-[#8a99ab] focus:border-deem-red focus:ring-2 focus:ring-[#eb5141]/10 sm:h-13 sm:rounded-xl"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#71839a] transition hover:text-deem-red"
                >
                  {showPassword ? (
                    <EyeOff size={19} strokeWidth={1.8} />
                  ) : (
                    <Eye size={19} strokeWidth={1.8} />
                  )}
                </button>
              </div>
            </div>

            <div className="mt-3 flex justify-end">
              <button
                type="button"
                className="text-xs font-medium text-[#263b91] transition hover:text-deem-red hover:underline sm:text-sm"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="mt-5 flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-deem-red text-sm font-semibold text-white transition hover:bg-[#d94335] sm:h-13 sm:rounded-xl sm:text-base"
            >
              <span>Login</span>
              <ArrowRight size={19} strokeWidth={2} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;