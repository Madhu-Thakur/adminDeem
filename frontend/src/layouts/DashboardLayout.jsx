import { useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Navbar from "../components/dashboard/Navbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-[#0b0f14]">
      <Sidebar
        mobileOpen={mobileMenuOpen}
        onCloseMobile={closeMobileMenu}
      />

      <div className="flex-1 min-w-0">
        <Navbar
          onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        />

        <main className="p-4 sm:p-6 text-gray-900 dark:text-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;