import Navbar from "../components/dashboard/Navbar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardGrid from "../components/dashboard/DashboardGrid";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-deem-bg dark:bg-[#0b0f14] transition-colors duration-300">
      <Navbar />

      <main className="px-6 sm:px-8 lg:px-12 py-8">
        <DashboardHeader />
        <DashboardGrid />
      </main>
    </div>
  );
};

export default Dashboard;