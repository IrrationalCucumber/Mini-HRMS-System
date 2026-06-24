import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../COMPONENT/Navbar";
import { Button, Card, CardActions, CardContent } from "@mui/joy";
import { Link } from "react-router-dom";
import { ArrowRight } from "@mui/icons-material";
import TitleText from "../COMPONENT/Text";

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
        const resPayroll = await axios.get(`${apiUrl}/payroll/all`);
        if (resPayroll.data && Array.isArray(resPayroll.data)) {
          const totalNetSalary = resPayroll.data.reduce(
            (sum, payroll) => sum + (payroll.net_salary || 0),
            0,
          );
          setDisplayCounts((prev) => ({
            ...prev,
            totalMonthlyPayroll: totalNetSalary,
          }));
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, [apiUrl]);

  return (
    <>
      <Navbar />
      <div
        style={{
          padding: "2rem",
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <TitleText level={"h2"} mb={1} content="HR Management System" />
          <TitleText level={"h3"} color="neutral" mb={0} content="Dashboard" />
        </div>

        <div
          className="card__wrap"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2rem",
            maxWidth: "1200px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          <Card
            color="primary"
            orientation="horizontal"
            size="lg"
            variant="solid"
          >
            <CardContent sx={{ textAlign: "center", width: "100%" }}>
              <TitleText
                level="h3"
                content={`Total Employees: ${displayCounts.totalEmployees}`}
              />
              <CardActions
                sx={{ justifyContent: "center", width: "100%", pt: 1 }}
              >
                <Link to={"/employees"} style={{ textDecoration: "none" }}>
                  <Button
                    endDecorator={<ArrowRight />}
                    variant="soft"
                    size="sm"
                  >
                    See Employees
                  </Button>
                </Link>
              </CardActions>
            </CardContent>
          </Card>

          <Card
            color="primary"
            orientation="horizontal"
            size="lg"
            variant="outlined"
          >
            <CardContent sx={{ textAlign: "center", width: "100%" }}>
              <TitleText
                color="neutral"
                level="h3"
                content={`Active Employees: ${displayCounts.activeEmployees}`}
              />
            </CardContent>
          </Card>

          <Card
            color="primary"
            orientation="horizontal"
            size="lg"
            variant="outlined"
          >
            <CardContent sx={{ textAlign: "center", width: "100%" }}>
              <TitleText
                level="h3"
                color="neutral"
                content={` Employees on Leave: ${displayCounts.employeesOnLeave}`}
              />
            </CardContent>
          </Card>

          <Card
            color="primary"
            orientation="horizontal"
            size="lg"
            variant="solid"
          >
            <CardContent sx={{ textAlign: "center", width: "100%" }}>
              <TitleText
                variant="plain"
                level="h3"
                content={`Total Monthly Payroll: ₱ ${displayCounts.totalMonthlyPayroll}`}
              />
              <CardActions
                sx={{ justifyContent: "center", width: "100%", pt: 1 }}
              >
                <Link to={"/payroll"} style={{ textDecoration: "none" }}>
                  <Button
                    endDecorator={<ArrowRight />}
                    variant="soft"
                    size="sm"
                  >
                    See Payroll Summary
                  </Button>
                </Link>
              </CardActions>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
