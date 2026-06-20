import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./PAGES/Login";
import Dashboard from "./PAGES/Dashboard";
import Employees from "./PAGES/Employees";
import Employee from "./PAGES/Employee";
import Navbar from "./COMPONENT/Navbar";
import Attendance from "./PAGES/Attendance";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/view/employee/:id" element={<Employee />} />
          <Route path="/attendance" element={<Attendance />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
