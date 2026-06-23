import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./PAGES/Login";
import Dashboard from "./PAGES/Dashboard";
import Employees from "./PAGES/Employees";
import Employee from "./PAGES/Employee";
import Attendance from "./PAGES/Attendance";
import Salaries from "./PAGES/Salaries";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/view/employee/:id" element={<Employee />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/salary" element={<Salaries />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
