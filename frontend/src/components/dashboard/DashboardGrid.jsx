import { useNavigate } from "react-router-dom";
import { modules } from "../../data/moduleData";
import FeaturedModuleCard from "./module-card/FeaturedModuleCard";
import SmallModuleCard from "./module-card/SmallModuleCard";

const DashboardGrid = () => {
  const navigate = useNavigate();

  const getModule = (title) =>
    modules.find((module) => module.title === title);

  const employees = getModule("Employees");
  const attendance = getModule("Attendance");

  const sideModules = [
    getModule("Customers"),
    getModule("Students"),
    getModule("Invoices"),
    getModule("Users"),
  ].filter(Boolean);

  const bottomModules = [
    getModule("Teams"),
    getModule("Accounts"),
    getModule("Tasks"),
    getModule("Interview"),
    getModule("New Joining"),
    getModule("Leave"),
     getModule("Announcement"),
     getModule("Notification"),
  ].filter(Boolean);

  
  const desktopClass = (title) => {
    const positions = {
      Customers: "lg:col-start-1 lg:row-start-1",
      Students: "lg:col-start-1 lg:row-start-2",
      Invoices: "lg:col-start-6 lg:row-start-1",
      Users: "lg:col-start-6 lg:row-start-2",
      Teams: "lg:col-start-1 lg:row-start-3",
      Accounts: "lg:col-start-2 lg:row-start-3",
      Tasks: "lg:col-start-3 lg:row-start-3",
      Interview: "lg:col-start-4 lg:row-start-3",
      "New Joining": "lg:col-start-5 lg:row-start-3",
      Leave: "lg:col-start-6 lg:row-start-3",
      Announcement: "lg:col-start-1 lg:row-start-4",
      Notification: "lg:col-start-2 lg:row-start-4",
    };

    return positions[title] || "";
  };

  return (
    <div className="mt-10 lg:mt-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:grid-rows-[100px_100px_145px_145px] gap-3 md:gap-5 lg:gap-8">
      {/* Featured cards (full width on mobile/tablet, cols 2-3 / 4-5 on desktop) */}
      <div className="col-span-2 md:col-span-3 lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-2">
        <FeaturedModuleCard
          module={employees}
          onClick={() => navigate(employees.path)}
          type="employees"
        />
      </div>

      <div className="col-span-2 md:col-span-3 lg:col-start-4 lg:col-span-2 lg:row-start-1 lg:row-span-2">
        <FeaturedModuleCard
          module={attendance}
          onClick={() => navigate(attendance.path)}
          type="attendance"
        />
      </div>

      {/* Regular module cards: 2 cols mobile, 3 cols tablet, explicit 6-col desktop */}
      {[...sideModules, ...bottomModules].map((module) => (
        <div
          key={module.title}
          className={desktopClass(module.title)}
        >
          <SmallModuleCard
            module={module}
            onClick={() => navigate(module.path)}
          />
        </div>
      ))}
    </div>
  );
};

export default DashboardGrid;