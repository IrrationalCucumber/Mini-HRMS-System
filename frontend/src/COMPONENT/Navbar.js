import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <h2>Mini-HRMS</h2>
                <ul className="nav-menu">
                    <li className="nav-item">
                       <Link to={"/dashboard"}>Dashboard</Link>
                    </li>
                    <li className="nav-item">
                       <Link to={"/employees"}>Employees</Link>
                    </li>
                    <li className="nav-item">
                        <Link to={"/attendance"} className="nav-link">
                            Attendance
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;