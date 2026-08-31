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
    {
      module: getModule("Customers"),
      className: "col-start-1 row-start-1",
    },
    {
      module: getModule("Students"),
      className: "col-start-1 row-start-2",
    },
    {
      module: getModule("Invoices"),
      className: "col-start-6 row-start-1",
    },
    {
      module: getModule("Users"),
      className: "col-start-6 row-start-2",
    },
  ];

  
  const bottomModules = [
    {
      module: getModule("Teams"),
      className: "col-start-1",
    },
    {
      module: getModule("Accounts"),
      className: "col-start-2",
    },
    {
      module: getModule("Tasks"),
      className: "col-start-3",
    },
    {
      module: getModule("Interview"),
      className: "col-start-4",
    },
    {
      module: getModule("New Joining"),
      className: "col-start-5",
    },
    {
      module: getModule("Leave"),
      className: "col-start-6",
    },
  ];

  return (
    <div className="grid grid-cols-6 grid-rows-[100px_100px_145px] gap-8 mt-20">

      {sideModules.map(({ module, className }) => (
        <div
          key={module.title}
          className={className}
        >
          <SmallModuleCard
            module={module}
            onClick={() => navigate(module.path)}
          />
        </div>
      ))}

    
      <div className="col-start-2 col-span-2 row-start-1 row-span-2">
        <FeaturedModuleCard
          module={employees}
          onClick={() => navigate(employees.path)}
          type="employees"
        />
      </div>

      <div className="col-start-4 col-span-2 row-start-1 row-span-2">
        <FeaturedModuleCard
          module={attendance}
          onClick={() => navigate(attendance.path)}
          type="attendance"
        />
      </div>

  
      {bottomModules.map(({ module, className }) => (
        <div
          key={module.title}
          className={`${className} row-start-3`}
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