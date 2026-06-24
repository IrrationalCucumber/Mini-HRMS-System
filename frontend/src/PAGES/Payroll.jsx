import { Button, Input, Sheet, Stack, Table } from "@mui/joy";
import Navbar from "../COMPONENT/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Add, Search } from "@mui/icons-material";
import TitleText from "../COMPONENT/Text";

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
        console.log("Payroll Data:", payrollRes.data);
        //get all salary details
        const salaryRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/salaries/all`,
        );
        console.log("Salary Data:", salaryRes.data);
        // Get all employees
        const employeeRes = await axios.get(
          `${process.env.REACT_APP_API_URL}/employee/all`,
        );
        console.log("Employees:", employeeRes.data);

        const payMap = {};
        const salaryMap = {};
        //store each data
        salaryRes.data.forEach((salary) => {
          salaryMap[salary.sm_empID] = salary;
        });
        payrollRes.data.forEach((payroll) => {
          payMap[payroll.payroll_empID] = payroll;
        });

        const mergedEmployees = employeeRes.data.map((emp) => ({
          ...emp,

          // salary
          smID: salaryMap[emp.employeeID]?.smID ?? null,
          basic_salary: salaryMap[emp.employeeID]?.basic_salary ?? null,
          allowance: salaryMap[emp.employeeID]?.allowance ?? null,
          deduction: salaryMap[emp.employeeID]?.deduction ?? null,
          net_salary: salaryMap[emp.employeeID]?.net_salary ?? null,

          // payroll
          payrollID: payMap[emp.employeeID]?.payrollID ?? null,
          payrolldate: payMap[emp.employeeID]?.payrolldate ?? null,
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
        <TitleText level="h1" variant="plain" content="Payroll Summary" />

        <Stack
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
                  <td>₱ {emp.basic_salary ? ` ${emp.basic_salary}` : "00"}</td>
                  <td>₱ {emp.allowance ? emp.allowance : "00"}</td>
                  <td>₱ {emp.deduction ? emp.deduction : "00"}</td>
                  <td>₱ {emp.net_salary ? `${emp.net_salary}` : "0.00"}</td>
                  <td>
                    {emp.payrolldate
                      ? new Date(emp.payrolldate).toISOString().split("T")[0]
                      : "N/A"}
                  </td>
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
