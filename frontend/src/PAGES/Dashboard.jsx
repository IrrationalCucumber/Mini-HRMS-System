/* TODO 
  Create a simple dashboard showing:

Total Employees
Active Employees
Employees on Leave
Total Monthly Payroll

*/
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../COMPONENT/Navbar";

const Dashboard = () => {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [displayCounts, setDisplayCounts] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    employeesOnLeave: 0,
    totalMonthlyPayroll: 0,
  });
  //get employee counts from backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const resTotal = await axios.get(`${apiUrl}/employee/total`);
        const resActive = await axios.get(`${apiUrl}/employee/active`);
        const resOnleave = await axios.get(`${apiUrl}/employee/onleave`);
        setDisplayCounts({
          totalEmployees: resTotal.data.totalEmployees,
          activeEmployees: resActive.data.count,
          employeesOnLeave: resOnleave.data.count,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [apiUrl]);
  //fetch total mpayroll from backend
  useEffect(() => {
    const fetchTotalPayroll = async () => {
      try {
        const resPayroll = await axios.get(`${apiUrl}/payroll/all`);
        console.log(resPayroll);
      } catch (error) {
        console.error("Error fetching total payroll:", error);
      }
    };

    fetchTotalPayroll();
  }, [apiUrl]);

  return (
    <>
      <Navbar />
      <h2>Dashboard</h2>
      <p>Welcome to the Dashboard!</p>
      <div>
        <h3>Total Employees: {displayCounts.totalEmployees}</h3>
        <h3>Active Employees: {displayCounts.activeEmployees}</h3>
        <h3>Employees on Leave: {displayCounts.employeesOnLeave}</h3>
      </div>
    </>
  );
};

export default Dashboard;
