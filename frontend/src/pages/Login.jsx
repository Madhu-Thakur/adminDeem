import { useState } from "react";
import logo from "../assets/images/logo-1.png";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";

const Login = () => {
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

    console.log("Login Data:", formData);
  };

  return (
    <div className="min-h-dvh bg-deem-blue flex items-center justify-center p-6">
      <div className="w-full max-w-162.5 h-[calc(100dvh-64px)] max-h-162.5 bg-white rounded-3xl shadow-xl overflow-hidden flex">

        <div className="flex-1 flex items-center justify-center px-8 sm:px-14 lg:px-20">
          <div className="w-full max-w-125">
            
            <div className=" pb-4 flex items-center justify-center">
              <img src={logo} alt="DEEM" className="w-47.5 h-auto" />
            </div>

            <h2 className="text-3xl font-bold text-[#10243f]">
              Login to your account
            </h2>

            <p className="text-gray-500 mt-4 text-base leading-7">
              Enter your email ID and password.
            </p>

            <form onSubmit={handleSubmit} className="mt-10">
              <div>
                <label className="block text-gray-700 font-medium mb-3">
                  Email ID
                </label>

                <div className="relative">
                  <Mail
                    size={21}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email ID"
                    className="w-full h-15 border border-gray-200 rounded-xl pl-14 pr-5 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                  />
                </div>
              </div>

              <div className="mt-7">
                <label className="block text-gray-700 font-medium mb-3">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={21}
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className="w-full h-15 border border-gray-200 rounded-xl pl-14 pr-14 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100 transition"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  className="text-[#263b91] font-medium hover:underline"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full h-15.5 mt-7 bg-deem-red hover:bg-[#d94335] text-white rounded-xl cursor-pointer font-semibold text-lg flex items-center justify-center gap-4 transition"
              >
                <span>Login</span>
                <ArrowRight size={22} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
