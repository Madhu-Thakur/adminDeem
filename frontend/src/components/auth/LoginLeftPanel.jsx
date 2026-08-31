import { ShieldCheck } from "lucide-react";

const LoginLeftPanel = () => {
 return (
  <div className="hidden lg:flex lg:w-[48%] bg-[#ffffff] text-black relative overflow-hidden shadow-md">
    <div className="w-full flex flex-col items-center justify-center text-center">
      <img
        src={logo}
        alt="DEEM"
        className="w-47.5 h-auto"
      />

      <div className="mt-12">
        <h1 className="text-4xl font-bold">
          Welcome back!
        </h1>
        <p className="text-gray-300 text-lg mt-3">
          Login to your DEEM Portal
        </p>
      </div>
    </div>
  </div>
);
};

export default LoginLeftPanel;
