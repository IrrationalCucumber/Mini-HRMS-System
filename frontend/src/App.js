import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./PAGES/Login";
import Dashboard from "./PAGES/Dashboard";
import Employees from "./PAGES/Employees";
import Employee from "./PAGES/Employee";

function App() {
  return (
    <>
    <nav>NAVIGATION </nav>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/view/employee/:id" element={<Employee />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
