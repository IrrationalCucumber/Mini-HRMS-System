import { Button, Input, Sheet, Stack, Table, Typography } from "@mui/joy";
import Navbar from "../COMPONENT/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Add, Search } from "@mui/icons-material";

const Payroll = () => {
  // Store combined employee + salary data
  const [employees, setEmployees] = useState([]);

  // Fetch employees and salaries and peyroll
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get all payroll records
        const payrollRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/payroll/all`,
        );

        //get all salary details
        const salaryRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/salaries/all`,
        );

        // Get all employees
        const employeeRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/employee/all`,
        );

        const payMap = {};
        const salaryMap = {};
        //store each data
        salaryRes.data.forEach((salary) => {
          salaryMap[salary.sm_empID] = salary;
        });

        const mergedEmployees = employeeRes.data.map((emp) => ({
          ...emp,

          // salary fields
          smID: salaryMap[emp.employeeID]?.smID ?? null,
          basic_salary: salaryMap[emp.employeeID]?.basic_salary ?? null,
          allowance: salaryMap[emp.employeeID]?.allowance ?? null,
          deduction: salaryMap[emp.employeeID]?.deduction ?? null,
          net_salary: salaryMap[emp.employeeID]?.net_salary ?? null,

          // payroll fields
          payrollID: payMap[emp.employeeID]?.payrollID ?? null,
        }));

        setEmployees(mergedEmployees);
        console.log(mergedEmployees);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  //generate payroll to every employee
  const handleGeneratePayroll = async () => {
    try {
      const payrollDate = new Date().toISOString().split("T")[0];

      // Only employees with salary records
      const payrollEntries = employees
        .filter((emp) => emp.smID) // employee has salary
        .map((emp) => ({
          payroll_empID: emp.employeeID,
          allowance: emp.allowance,
          deductions: emp.deduction,
          net_salary: emp.net_salary,
          payrolldate: payrollDate,
        }));

      await axios.post(
        `${process.env.REACT_APP_API_URL}/payroll/generate`,
        payrollEntries,
      );

      alert("Payroll generated successfully!");
    } catch (error) {
      console.error("Error generating payroll:", error);
    }
  };
  //filter
  const [filter, setFilter] = useState("");
  const filterList = employees.filter((employee) => {
    const name = employee.full_name
      .toLowerCase()
      .includes(filter.toLocaleLowerCase());

    return name;
  });
  return (
    <>
      <Navbar />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <Typography level="h1" noWrap={false} variant="plain">
          Payroll Summary
        </Typography>
        <Stack
          Stack
          direction="row"
          spacing={2}
          mb={1}
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignItems: "left",
          }}
        >
          <Input
            startDecorator={<Search />}
            type="text"
            placeholder="Search employee"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
          <Button
            onClick={() => {
              handleGeneratePayroll();
            }}
            size="lg"
            startDecorator={<Add />}
          >
            Generate Payrolls
          </Button>
        </Stack>
        <Sheet color="primary" variant="solid">
          <Table
            borderAxis="y"
            stickyFooter={false}
            stickyHeader
            variant="soft"
            color="primary"
            size="lg"
          >
            <thead>
              <tr>
                <th style={{ width: "5%" }}>ID</th>
                <th style={{ width: "20%" }}>Full Name</th>
                <th style={{ width: "10%" }}>Basic Salary</th>
                <th style={{ width: "10%" }}>Allowance</th>
                <th style={{ width: "10%" }}>Deductions</th>
                <th style={{ width: "15%" }}>Net Salary</th>
                <th style={{ width: "15%" }}>Payroll Date</th>
                <th style={{ width: "5%" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filterList.map((emp) => (
                <tr key={emp.employeeID}>
                  <td>{emp.employeeID}</td>
                  <td>{emp.full_name}</td>

                  <td>
                    {emp.basic_salary ? `₱ ${emp.basic_salary}` : "Not Set"}
                  </td>
                  <td>{emp.allowance ? emp.allowance : "Not Set"}</td>
                  <td>{emp.deduction ? emp.deduction : "Not Set"}</td>
                  <td>{emp.Department}</td>
                  <td>{emp.net_salary ? `₱${emp.net_salary}` : "0.00"}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Sheet>
      </div>
    </>
  );
};

export default Payroll;
