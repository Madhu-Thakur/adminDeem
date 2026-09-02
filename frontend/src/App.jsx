import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Payments from "./pages/Payments";
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import AddCustomer from "./pages/AddCustomer";
import AddPayment from "./pages/AddPayment";
import DashboardLayout from "./layouts/DashboardLayout";
import Invoices from "./pages/Invoices";
import AddInvoice from "./pages/AddInvoice";
import CustomerDetails from "./pages/CustomerDetails";
import EditCustomer from "./pages/EditCustomer";
import AddVoucher from "./pages/AddVoucher";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route element={<DashboardLayout />}>
          <Route path="/customers" element={<Customers />} />
          <Route path="/customers/add" element={<AddCustomer />} />
          <Route path="/customers/:id" element={<CustomerDetails />} />

          <Route path="/customers/edit/:id" element={<EditCustomer />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/payments/add" element={<AddPayment />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/invoices/add" element={<AddInvoice />} />
          <Route path="/employees" element={<div>Employees</div>} />
          <Route path="/students" element={<div>Students</div>} />
          <Route path="/users" element={<div>Users</div>} />
          <Route path="/teams" element={<div>Teams</div>} />
          <Route path="/accounts/voucher/sale" element={<AddVoucher />} />
          <Route path="/accounts/voucher/purchase" element={<AddVoucher />} />
          <Route path="/tasks" element={<div>Tasks</div>} />
          <Route path="/interview" element={<div>Interview</div>} />
          <Route path="/new-joining" element={<div>New Joining</div>} />
          <Route path="/attendance" element={<div>Attendance</div>} />
          <Route path="/leave" element={<div>Leave</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;