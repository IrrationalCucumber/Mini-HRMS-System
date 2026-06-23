import { Link } from "react-router-dom";
import "./style.css";
import { Typography } from "@mui/joy";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Typography level="h2" className="nav-container-link">
          <Link to={"/dashboard"}>Mini-HRMS</Link>
        </Typography>

        <ul className="nav-menu">
          <li className="nav-item">
            <Typography>
              <Link to={"/employees"}>Employees Management</Link>
            </Typography>
          </li>
          <li className="nav-item">
            <Typography>
              <Link to={"/attendance"} className="nav-link">
                Attendance
              </Link>
            </Typography>
          </li>
          <li className="nav-item">
            <Typography>
              <Link to={"/salary"} className="nav-link">
                Salary Management
              </Link>
            </Typography>
          </li>
          <li className="nav-item">
            <Typography>
              <Link to={"/payroll"}>Payroll</Link>
            </Typography>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
